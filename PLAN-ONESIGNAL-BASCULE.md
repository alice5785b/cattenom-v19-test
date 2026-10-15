# Raccordement OneSignal V19 — préparation sans bascule

- Destination définitive : https://renfomusculairecattenom.netlify.app/
- OneSignal App ID communiqué : 2232e30e-1fed-4d48-8b26-824b718838a9 (à confronter à la configuration V18 avant activation).
- Conserver la même application OneSignal et son périmètre de service worker si la configuration V18 le confirme.
- Ne pas enregistrer un service worker OneSignal sur le domaine GitHub Pages de TEST : l'origine diffère de Netlify.
- Ne pas mettre de clé REST API dans index.html, config.js ou un dépôt public.
- Raccorder les événements SQL à un émetteur côté serveur, avec idempotence et journalisation, après inspection des tables/trigger existants.
- Vérifier les chemins, la portée et la version du service worker en place sur V18 avant d'en publier un autre.
- Préparer un déploiement de prévisualisation Netlify séparé, puis basculer le site existant uniquement avec accord explicite.
- Maintenir V18 Production et les notifications actuelles intactes jusque-là.
