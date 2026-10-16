# V19 — Reprise du fichier GitHub de 00 h 46

## Version de référence
- Commit du **16 octobre 2026 à 00 h 46 (heure de France)** : `8d4f7b816c0ff15705e04b1b066cc528c2745925` (15 octobre 22:46 UTC).
- Branche de préparation `v19-preparation-production` créée à partir de ce commit.
- **Conserver à l'identique les fichiers applicatifs et le raccordement OneSignal déjà réalisé** ; ne pas repartir d'une version antérieure ni réécrire l'application.
- Le paquet de publication existe déjà via `preparation-netlify/build-v19-netlify.mjs` et le workflow `.github/workflows/package-v19-netlify.yml`.

## Modifications V19 intervenues depuis cette version
Les opérations confirmées concernent **la base Supabase V19**, et non des changements de code :
- Migration/confirmation des comptes et réservations de Gaël SIMON, Florence DEBAILLIEUL et Marc FESERT.
- Suppression des 22 comptes fictifs, du compte Al B, de leurs réservations concernées et de la séance supplémentaire du 31 octobre.
- Audit SQL final : **9 contrôles à 0 anomalie**.
- Conserver le participant sélectionné après inscription, annulation et actualisation : exigence V19 à préserver ; ne pas remplacer la page de simulation TEST.
Ces changements de données sont déjà réalisés dans Supabase V19 `uqyvfkjgitufaxmswjzv` ; **ne pas les rejouer dans GitHub**.

## Notifications
- **Raccordement OneSignal déjà effectué dans la version de référence : ne pas le refaire.**
- Les notifications ne seront testées en conditions réelles **qu'après le déploiement définitif**.
- Ne pas relancer les essais OneSignal sur GitHub Pages TEST.

## Destination et autorisation
- Adresse définitive : https://renfomusculairecattenom.netlify.app/
- GitHub sert à conserver les fichiers avant déploiement.
- **Aucun déploiement ni modification de V18 Production sans autorisation explicite.**
- Conserver intégralement les données V19 et ne jamais publier de secrets serveur dans le dépôt public.
