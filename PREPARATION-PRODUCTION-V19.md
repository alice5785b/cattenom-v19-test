# V19 — Préparation de la publication définitive

**Statut : fichiers en préparation sur GitHub. Aucun déploiement autorisé.**

## Destination publique à conserver
https://renfomusculairecattenom.netlify.app/

GitHub sert de dépôt des fichiers avant publication. GitHub Pages reste réservé à la prévisualisation V19 TEST.

## Référence du code
Cette branche `v19-preparation-production` est issue de `v19-test-github-pages` et conserve les fichiers applicatifs V19 existants. La branche de test ne doit pas être modifiée pour la bascule.

## Données
- Supabase V19 : `uqyvfkjgitufaxmswjzv`.
- Audit SQL final : 9 contrôles à 0 anomalie, confirmé par l'utilisateur.
- Conserver les comptes, les réservations et les données V19 ; ne pas purger.
- V18 Production : ne pas modifier.

## Assemblage avant publication
- Fichiers applicatifs présents : `index.html`, `config.js`, `logo.png`, `manifest.webmanifest`, `netlify.toml`.
- Fichiers de préparation OneSignal dans `preparation-netlify/` : ne pas les considérer automatiquement prêts pour la production.
- Le code V19 comporte un garde-fou Supabase TEST : ne pas le supprimer sans examiner sa logique et la destination de déploiement.
- La configuration OneSignal doit être raccordée à l'origine Netlify définitive sans activer les notifications de TEST.
- Ne jamais publier de clé secrète Supabase service_role ou REST OneSignal dans GitHub.

## Conditions de publication
Aucune publication, aucun changement du site Netlify existant et aucune activation des notifications sans accord explicite de l'utilisateur. Ne pas confondre « préparer les fichiers sur GitHub » et « déployer ».
