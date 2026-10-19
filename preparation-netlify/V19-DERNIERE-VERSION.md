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
- Décision actualisée le 16 octobre 2026 : l’utilisateur renonce à la comparaison préalable des réservations V18/V19. Il vérifiera manuellement les réservations après le déploiement autorisé. Ne pas bloquer la préparation ou la bascule sur cette comparaison. Conserver toutes les réservations V19 existantes ; ne pas prétendre à une égalité exhaustive V18/V19.

## Synchronisation des inscriptions — 18 octobre 2026
- Les inscriptions des séances du **lundi 19 octobre 2026** et du **jeudi 22 octobre 2026** ont été rapprochées des listes de V18 Production transmises par l'utilisateur.
- Résultat communiqué et confirmé par l'utilisateur après exécution dans Supabase V19 : **13 inscrits le 19 octobre** et **11 inscrits le 22 octobre**, soit **24 inscriptions** au total ; contrôle nominatif déclaré conforme aux listes V18.
- Corrections ciblées : retirer Geoffrey GREBERT des deux séances, retirer Adeline BARBA du 19 octobre, ajouter Delphine LEROY au 19 octobre.
- Cette synchronisation concerne **les données Supabase V19 uniquement**. Aucun changement du code applicatif, aucun déploiement Netlify et aucune modification de V18 Production.
- Les effectifs et listes ci-dessus sont un **état ponctuel au 18 octobre**, non une garantie de correspondance permanente si de nouvelles réservations ou annulations interviennent.

## Actualisation des inscriptions — 19 octobre 2026
- Selon les captures de V18 et V19 fournies par l'utilisateur, V18 affichait **14 inscrits le lundi 19 octobre** et **13 inscrits le jeudi 22 octobre**, contre 13 et 11 dans V19 avant correction.
- Ajouts ciblés demandés dans Supabase V19 : **Nicolas GOEURIOT** le 19 et le 22 octobre, **Frédéric BERNHARD** le 22 octobre.
- L'utilisateur a confirmé le **19 octobre 2026** que le SQL d'ajout avait été exécuté sans problème. Effectifs attendus après correction : **14** et **13**.
- Les listes nominatives V19 après cette opération restent à revérifier si une confirmation exhaustive est nécessaire ; les chiffres ci-dessus ne sont pas une lecture directe de la base par GitHub.
- **Aucun changement du code de V19, aucun déploiement Netlify, aucune modification de V18 Production.**
