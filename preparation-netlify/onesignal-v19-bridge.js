// Adaptation du comportement OneSignal relevé dans le ZIP V18 Netlify.
// À intégrer dans V19 uniquement pour le domaine Netlify final, après validation.
// Nécessite la balise SDK v16 :
// <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
// et le worker racine /onesignalsdkworker.js identique à celui de V18.
// IMPORTANT : pas d'initialisation sur le domaine GitHub Pages TEST.
(function () {
  'use strict';
  const PRODUCTION_ORIGIN = 'https://renfomusculairecattenom.netlify.app';
  const APP_ID = '2232e30e-1fed-4d48-8b26-824b718838a9';
  let initialized = false;
  window.V19PushBridge = {
    async connect(userId, saveSubscription) {
      if (location.origin !== PRODUCTION_ORIGIN) return;
      if (!userId || typeof saveSubscription !== 'function') return;
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal) {
        if (!initialized) {
          await OneSignal.init({
            appId: APP_ID,
            notifyButton: { enable: false },
            autoResubscribe: true
          });
          initialized = true;
        }
        await OneSignal.login(String(userId));
        const save = async () => {
          const id = OneSignal.User.PushSubscription.id;
          const opted = OneSignal.User.PushSubscription.optedIn;
          if (opted && id) await saveSubscription(id);
        };
        OneSignal.User.PushSubscription.addEventListener('change', save);
        OneSignal.Notifications.addEventListener('permissionChange', save);
        await save();
      });
    },
    disconnect() {
      if (location.origin !== PRODUCTION_ORIGIN) return;
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal) {
        await OneSignal.logout();
      });
    }
  };
})();

// Raccordement Supabase à utiliser par la version Netlify définitive.
// Exemple d'appel après boot(), quand me.id est connu :
// await V19PushBridge.connect(me.id, async subscriptionId => {
//   const {error} = await sb.rpc('v19_set_onesignal_subscription_id',
//      {p_subscription_id: subscriptionId});
//   if (error) throw error;
// });
// Ne pas activer cette connexion sur GitHub Pages TEST.
