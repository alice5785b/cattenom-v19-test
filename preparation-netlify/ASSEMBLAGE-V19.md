# Assemblage V19 pour Netlify — ne pas déployer avant validation

## Fichiers à placer à la racine du paquet Netlify
- `index.html` (version V19, avec le contrôle Supabase TEST à adapter au projet cible seulement après validation)
- `config.js` (configuration Supabase cible, jamais de clé service_role)
- `logo.png`
- `onesignalsdkworker.js` (worker OneSignal v16, vérifier contre V18)
- `onesignal-v19-bridge.js` (adaptateur)
- `netlify.toml` (en-têtes du worker)

## Intégration dans index.html du paquet Netlify
Insérer dans le `<head>` :
```html
<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
<script src="onesignal-v19-bridge.js" defer></script>
```
Le code `connectV19Push()` est déjà présent dans `index.html` et ne s'exécute que sur l'origine Netlify définitive.

## Blocages avant mise en ligne
1. Vérifier que le projet Supabase choisi pour V19 définitive contient les tables et fonctions V19. Le `index.html` actuel bloque volontairement toute URL différente de Supabase TEST.
2. Vérifier les URLs de redirection Auth Supabase et le domaine OneSignal.
3. Vérifier les triggers et les destinataires de `v19_notification_outbox` avant d'autoriser les envois.
4. Tester la connexion, les réservations, les annulations, les droits admin et la réinitialisation du mot de passe.
5. Obtenir l'accord explicite pour remplacer le site Netlify V18.

**Aucune clé REST OneSignal ni DISPATCHER_SECRET ne doit être placée dans les fichiers du site.**
**Ne pas activer `NOTIFICATIONS_ENABLED` ou `v19_dispatch_config.enabled` avant les tests de bout en bout.**
