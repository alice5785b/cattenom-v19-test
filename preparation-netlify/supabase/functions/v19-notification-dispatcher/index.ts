// V19 TEST — Edge Function, non déployée et désactivée par défaut.
// Invocation réservée à un ordonnanceur serveur avec DISPATCHER_SECRET.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const env=(name:string)=>Deno.env.get(name)||"";
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json"}});
const base=env("SUPABASE_URL")+"/rest/v1/v19_notification_outbox";
const headers=()=>({"apikey":env("SUPABASE_SERVICE_ROLE_KEY"),"Authorization":"Bearer "+env("SUPABASE_SERVICE_ROLE_KEY"),"Content-Type":"application/json"});
const message=(event:any)=>{
  const date=String(event.session_date||"");
  if(event.event_type==="promotion")return {title:"Une place s'est libérée",body:"Vous êtes maintenant inscrit(e) à la séance du "+date+"."};
  if(event.event_type==="cancelled")return {title:"Séance annulée",body:"La séance du "+date+" a été annulée."};
  if(event.event_type==="moved")return {title:"Séance déplacée",body:"La séance du "+date+" est déplacée au "+String(event.new_date||"")+"."};
  return null;
};
serve(async(req)=>{
  if(req.method!=="POST")return json({error:"method_not_allowed"},405);
  if(!env("DISPATCHER_SECRET")||req.headers.get("x-dispatcher-secret")!==env("DISPATCHER_SECRET"))return json({error:"unauthorized"},401);
  if(env("NOTIFICATIONS_ENABLED")!=="true")return json({status:"disabled",sent:0});
  if(!env("ONESIGNAL_APP_ID")||!env("ONESIGNAL_REST_API_KEY")||!env("SUPABASE_SERVICE_ROLE_KEY")||!env("SUPABASE_URL"))return json({error:"missing_configuration"},503);
  const pending=await fetch(base+"?select=*&sent_at=is.null&claimed_at=is.null&attempts=lt.3&order=created_at.asc&limit=10",{headers:headers()});
  if(!pending.ok)return json({error:"read_failed"},502);
  let sent=0,failed=0;
  for(const event of await pending.json()){
    // Claim atomique conditionnel : un seul exécuteur obtient la ligne.
    const claim=await fetch(base+"?id=eq."+event.id+"&claimed_at=is.null&sent_at=is.null",{
      method:"PATCH",headers:{...headers(),"Prefer":"return=representation"},
      body:JSON.stringify({claimed_at:new Date().toISOString(),attempts:Number(event.attempts||0)+1})
    });
    if(!claim.ok) {failed++;continue;}
    const rows=await claim.json();if(rows.length!==1)continue;
    const msg=message(event);
    const recipients=Array.isArray(event.recipients)?event.recipients.filter((x:unknown)=>typeof x==="string"&&x.length>0):[];
    if(!msg||recipients.length===0){
      await fetch(base+"?id=eq."+event.id,{method:"PATCH",headers:headers(),body:JSON.stringify({sent_at:new Date().toISOString(),last_error:msg?"Aucun destinataire": "Événement non pris en charge"})});
      continue;
    }
    // Pas de retry automatique après un envoi incertain : éviter les doublons.
    try{
      const response=await fetch("https://api.onesignal.com/notifications",{
        method:"POST",headers:{"Authorization":"Key "+env("ONESIGNAL_REST_API_KEY"),"Content-Type":"application/json"},
        body:JSON.stringify({app_id:env("ONESIGNAL_APP_ID"),include_subscription_ids:recipients,headings:{fr:msg.title},contents:{fr:msg.body}})
      });
      if(!response.ok)throw Error("OneSignal HTTP "+response.status);
      await fetch(base+"?id=eq."+event.id,{method:"PATCH",headers:headers(),body:JSON.stringify({sent_at:new Date().toISOString(),last_error:null})});
      sent++;
    }catch(error){
      // Claimed reste renseigné : reprise uniquement après vérification manuelle.
      await fetch(base+"?id=eq."+event.id,{method:"PATCH",headers:headers(),body:JSON.stringify({last_error:String(error)})});
      failed++;
    }
  }
  return json({status:"processed",sent,failed});
});
