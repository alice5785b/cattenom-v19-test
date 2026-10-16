# Procédure de comparaison V18 → V19 — ARCHIVÉE

**Décision utilisateur du 16 octobre 2026 : comparaison préalable annulée.** L’utilisateur contrôlera manuellement les réservations après le déploiement de V19 sur Netlify. Ce document est conservé uniquement comme historique ; **aucune étape de comparaison préalable ne doit bloquer la préparation ni le déploiement autorisé**. Ne pas supprimer ni réinitialiser les réservations V19. Aucune égalité exhaustive V18/V19 n’est certifiée.

---

# Procédure de comparaison et de contrôle V18 → V19

**Statut actualisé au 16 octobre 2026 : migration/nettoyage V19 effectués, 9 contrôles SQL à 0 anomalie ; aucun déploiement.**

## Objectif
Juste avant la bascule, contrôler **toutes les séances ouvertes** (lundi et jeudi) : inscriptions confirmées et listes d'attente. Vérifier les **personnes**, pas seulement les compteurs. Ne pas tester la modification des séances.

## Prérequis
- Accès administrateur en lecture à V18 et V19 et aux réservations détaillées, y compris les listes d'attente.
- Conserver V18 intacte et une copie de retour arrière ; ne pas purger les comptes ni les réservations V19 existants.
- Éviter les nouvelles inscriptions/annulations pendant la fenêtre de comparaison (ou relever et réconcilier toutes les modifications intervenues entre deux extractions).
- Convenir d'un instant de référence commun pour les deux extractions.
- Si les deux systèmes ne partagent pas les mêmes identifiants utilisateurs, établir une correspondance fiable des personnes ; ne pas se fier uniquement au nom.

## Tableau de comparaison (une ligne par séance ouverte)
| Date séance | V18 inscrits | V19 inscrits | Écart inscrits (V19−V18) | V18 attente | V19 attente | Écart attente (V19−V18) | Personnes manquantes / supplémentaires | Statut |
|---|---:|---:|---:|---:|---:|---:|---|---|
| AAAA-MM-JJ | | | | | | | | À vérifier |

## Contrôle opérationnel
1. **Inventorier les séances ouvertes** dans V18 et V19 ; identifier les dates absentes d'un côté. Ne pas créer, supprimer ou modifier de séance dans ce contrôle : signaler les écarts de calendrier séparément.
2. **Extraire les réservations** de chaque séance : date, identifiant fiable de la personne, statut (inscrit/attente), et ordre de liste d'attente si disponible. Ne pas modifier les données.
3. **Comparer les comptes** confirmés et en attente, puis les ensembles de personnes et leur statut. Un total identique peut cacher des personnes différentes.
4. **Documenter les écarts** : personne absente dans V19, réservation supplémentaire dans V19, statut différent, doublon, ordre d'attente différent. Ne pas supposer que V18 prévaut sur chaque cas sans vérifier les mouvements récents.
5. **Corriger uniquement les écarts confirmés**, avec sauvegarde préalable et action réversible, sans supprimer de réservation V19 valide ni écraser les inscriptions intervenues pendant le contrôle. Si l'origine de l'écart est incertaine, arrêter la bascule.
6. **Relancer l'extraction et la comparaison** après correction, pour toutes les séances ouvertes.
7. **Valider** : mêmes personnes, mêmes statuts, mêmes effectifs, aucun doublon, limites de 20 inscrits et 10 en attente respectées, ordre d'attente cohérent. Si un écart subsiste, ne pas basculer.

## Critères GO / NO-GO
**GO** seulement si tous les écarts ont été résolus et contrôlés, les inscriptions intervenues durant le rapprochement ont été prises en compte, et le retour arrière est disponible. **NO-GO** si différences non expliquées, données inaccessibles, doublons, limite dépassée ou impossibilité de garantir l'intégrité des réservations.

## Fenêtre de 5 minutes
Possible seulement si les exports et la correspondance des personnes sont prêts, que les écarts sont faibles et que les écritures sont maîtrisées. **Les cinq minutes ne sont pas garanties.** En cas d'écart complexe, prolonger la vérification plutôt que forcer la bascule.

## Hors périmètre
Pas de modification de séances ; pas d'activation OneSignal ; pas de bascule Netlify dans cette procédure. Les tests de notifications sont prévus **après** la bascule, sur autorisation explicite.

## État
**Travaux réalisés :** comptes et réservations manquants migrés dans V19, dont Gaël SIMON, Florence DEBAILLIEUL et Marc FESERT ; 22 comptes fictifs, compte Al B, réservations associées et séance supplémentaire du 31 octobre supprimés ; **9 contrôles SQL V19 à 0 anomalie**, confirmés par l'utilisateur.

**Portée des contrôles :** cohérence de V19 validée. Aucune preuve enregistrée ici d'une comparaison exhaustive ligne par ligne avec l'état actuel de V18 ; ne pas affirmer une identité totale des deux bases sur cette seule base.

**Décision utilisateur :** ne pas répéter les vérifications déjà faites. Raccordement OneSignal déjà effectué ; tests réels de notifications uniquement après déploiement. V18 reste intacte avant accord explicite.
