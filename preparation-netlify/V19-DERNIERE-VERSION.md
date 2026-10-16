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

## Dernières modifications Supabase V19 — 16 octobre 2026
- Nettoyage du journal `public.booking_cancellations` : suppression ciblée de **5 annulations de test** : 3 concernant `test01@example.com` / `baroni_alice@hotmail.com`, et 2 concernant `baroni.alice@gmail.com` pour les séances des **15 et 19 octobre**.
- Contrôles de confirmation exécutés par l'utilisateur : **0 annulation restante** pour les adresses fictives `testXX@example.com` et `baroni_alice@hotmail.com`, et **0** pour `baroni.alice@gmail.com` sur les deux séances ciblées.
- Aucun compte utilisateur ni réservation actuelle ciblé par ces suppressions ; V18 non modifiée. La table de sauvegarde `backup_annulations_test_20261014` reste conservée.
- Ces modifications sont **des données Supabase V19**, non des changements du code source : le paquet Netlify n'a pas à être modifié pour les refléter.
- Le **18 octobre**, comparer uniquement les réservations des **19 et 22 octobre** entre V18 et V19 ; corriger dans Supabase V19 les écarts confirmés, puis produire le dernier paquet depuis GitHub avant toute bascule Netlify autorisée.
