# V19 TEST — checklist de consolidation et configuration Supabase

## Déjà livré dans l'interface
- Déploiement GitHub Pages sur la branche `v19-test-github-pages`
- Garde-fou contre le projet Supabase Production
- Affichage des séances, réservations et administration via RPC existantes
- Capacité affichée : 20 inscrits, 10 en liste d'attente
- Mémorisation du participant sélectionné
- Première connexion par e-mail et mot de passe, sous réserve de configuration Supabase Auth

## Configuration externe indispensable (non effectuée par ce dépôt)
Dans le projet Supabase TEST `uqyvfkjgitufaxmswjzv` :
1. Authentication > Providers > Email : vérifier que l'inscription par e-mail est autorisée et que la confirmation d'e-mail est activée.
2. Authentication > URL Configuration : définir le Site URL et les Redirect URLs pour `https://alice5785b.github.io/cattenom-v19-test/`.
3. Limiter effectivement l'accès applicatif aux adresses actives autorisées via `my_profile` et les politiques RLS/RPC. L'écran de première connexion ne doit pas être considéré comme une protection de la base de données.
4. Vérifier côté SQL les RPC `book_session`, `cancel_booking`, `admin_book_user`, `admin_remove_user` : transactions atomiques, verrouillage concurrent, plafond 20+10 et promotion de liste d'attente.
5. Vérifier les RPC de déplacement/annulation/restauration des séances : préserver les réservations et leur ordre uniquement si telle est la règle métier validée.
6. Vérifier les droits `EXECUTE` des RPC administrateur et les politiques RLS ; l'interface ne suffit pas à sécuriser les droits.

## Contraintes
- V18 Production inchangée
- Ne pas remplacer la page de simulation
- Notifications OneSignal reportées à la bascule V19
- Aucun changement SQL appliqué automatiquement : le schéma réel et les définitions des RPC ne sont pas disponibles dans ce dépôt

## Livraison
Le workflow `.github/workflows/deploy-v19-test-pages.yml` publie automatiquement les commits de cette branche, après validation des protections GitHub Pages.
