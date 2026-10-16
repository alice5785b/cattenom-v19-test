# V19 définitive — dernière version (sans déploiement)

La version définitive est construite automatiquement à chaque modification du dossier `preparation-netlify/` par le workflow [Préparer paquet V19 Netlify](../../actions/workflows/package-v19-netlify.yml).

Télécharger le dernier artefact **paquet-v19-netlify-sans-deploiement** dans la dernière exécution réussie. L'artefact contient : `index.html`, `config.js`, `onesignal-v19-bridge.js`, `onesignalsdkworker.js`, `netlify.toml`, `logo.png`.

La simulation est exclue. Les notifications OneSignal ne sont pas déconnectées lors d'une simple déconnexion de l'application. Les notifications réelles seront testées après la bascule.

**Ne pas déployer sans autorisation explicite.** V18 Production reste intacte. La base Supabase V19 existante, ses comptes et inscriptions doivent être conservés.

## État actualisé de la migration au 16 octobre 2026
- Base V19 `uqyvfkjgitufaxmswjzv` : migration des comptes et réservations manquants réalisée, dont Gaël SIMON, Florence DEBAILLIEUL et Marc FESERT.
- Nettoyage des 22 comptes fictifs, du compte Al B, des réservations associées et de la séance supplémentaire du 31 octobre réalisé.
- Neuf contrôles SQL de cohérence V19 : zéro anomalie, validés par l'utilisateur. Cela ne démontre pas à lui seul une égalité exhaustive ligne par ligne avec V18 au moment de la bascule.
- Conserver la sélection du participant après inscription, annulation et actualisation.
- Le raccordement OneSignal a déjà été effectué ; ne pas le refaire. Tester les notifications réelles seulement après la publication.
- Aucun nouveau test demandé ; ne pas toucher à V18 avant accord de déploiement.
