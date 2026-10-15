# V19 définitive — dernière version (sans déploiement)

La version définitive est construite automatiquement à chaque modification du dossier `preparation-netlify/` par le workflow [Préparer paquet V19 Netlify](../../actions/workflows/package-v19-netlify.yml).

Télécharger le dernier artefact **paquet-v19-netlify-sans-deploiement** dans la dernière exécution réussie. L'artefact contient : `index.html`, `config.js`, `onesignal-v19-bridge.js`, `onesignalsdkworker.js`, `netlify.toml`, `logo.png`.

La simulation est exclue. Les notifications OneSignal ne sont pas déconnectées lors d'une simple déconnexion de l'application. Les notifications réelles seront testées après la bascule.

**Ne pas déployer sans autorisation explicite.** V18 Production reste intacte. La base Supabase V19 existante, ses comptes et inscriptions doivent être conservés.
