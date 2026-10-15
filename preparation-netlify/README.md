# Fichiers de préparation Netlify / OneSignal V19

Ces fichiers ne sont **pas déployés** par le workflow GitHub Pages TEST : il publie seulement `index.html`, `config.js` et `logo.png`.

## Destination
https://renfomusculairecattenom.netlify.app/

## OneSignal
App ID indiqué : `2232e30e-1fed-4d48-8b26-824b718838a9`.

Avant tout déploiement :
1. Récupérer et comparer le contenu réel de `/OneSignalSDKWorker.js` sur V18, ainsi que la portée du worker.
2. Vérifier la version SDK OneSignal, l'App ID réellement utilisé par V18 et les règles d'abonnement.
3. Vérifier la compatibilité de l'origine et du chemin worker ; ne pas enregistrer de worker sur GitHub Pages TEST.
4. Préparer l'émetteur côté serveur pour les événements SQL, avec authentification et déduplication ; aucune clé REST dans le frontend.
5. Vérifier la configuration de redirection Supabase Auth sur le domaine Netlify.
6. Déployer d'abord sur une URL de prévisualisation isolée, puis demander l'accord explicite pour remplacer V18.

**Important :** le worker fourni est un modèle v16, pas une copie vérifiée du worker V18. Il ne doit pas être publié en production sans comparaison préalable.

Aucune bascule n'est déclenchée par ces fichiers.
