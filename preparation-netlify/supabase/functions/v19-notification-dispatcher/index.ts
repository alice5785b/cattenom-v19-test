// Préparation V19 — émetteur OneSignal sécurisé, NON DÉPLOYÉ.
// Supabase Edge Function (Deno). À raccorder à une file d'événements
// après validation du schéma SQL et des destinataires.
// Aucun envoi n'est possible sans NOTIFICATIONS_ENABLED=true.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const appId = Deno.env.get("ONESIGNAL_APP_ID");
const apiKey = Deno.env.get("ONESIGNAL_REST_API_KEY");
const enabled = Deno.env.get("NOTIFICATIONS_ENABLED") === "true";

serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!enabled) return Response.json({ status: "disabled", sent: false });
  // Ne jamais accepter une liste arbitraire de destinataires du navigateur.
  // La future implémentation devra :
  // 1. vérifier une authentification serveur et l'identité de l'événement ;
  // 2. lire le destinataire depuis les tables V19 sous contrôle serveur ;
  // 3. réserver atomiquement l'événement pour empêcher les doublons ;
  // 4. émettre puis consigner le résultat et gérer les reprises.
  if (!appId || !apiKey) return Response.json({ error: "Configuration incomplete" }, { status: 503 });
  return Response.json({ status: "not_implemented", sent: false }, { status: 501 });
});
