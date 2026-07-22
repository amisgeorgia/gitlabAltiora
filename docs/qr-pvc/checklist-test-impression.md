# Checklist de test — QR PVC ALTIORA

> À exécuter sur un échantillon imprimé avant toute production en série.

## Fichiers et gabarit

- [ ] Le SVG s’ouvre correctement et conserve les éléments vectoriels.
- [ ] Le PNG est exporté à au moins 300 dpi à la taille d’impression.
- [ ] Le PDF contient le fond perdu et le format validés par l’imprimeur.
- [ ] Le format fini est 85,6 × 54 mm.
- [ ] Le fond perdu mesure 3 mm de chaque côté.
- [ ] Les éléments importants restent dans la zone sûre validée.

## Lisibilité du QR

- [ ] Correction d’erreur H utilisée.
- [ ] Zone silencieuse d’au moins 4 modules autour du QR.
- [ ] Modules foncés sur fond clair, sans motif ni dégradé derrière.
- [ ] Logo central présent uniquement après test de lecture concluant.
- [ ] QR lisible à une distance de lecture normale de carte.

## Redirection et UTM

- [ ] Le QR ouvre l’URL courte `/q/{code}` attendue.
- [ ] La cible de redirection est correcte.
- [ ] Les paramètres UTM attendus sont présents après redirection.
- [ ] Le scan est compté par le futur service, sans collecte excessive de données.

## Test sur appareils

| Appareil | Système | Lecture QR | Redirection | UTM | Remarques |
| --- | --- | --- | --- | --- | --- |
| 1 | iOS / Android | [ ] | [ ] | [ ] | |
| 2 | iOS / Android | [ ] | [ ] | [ ] | |
| 3 | iOS / Android | [ ] | [ ] | [ ] | |
| 4 | iOS / Android | [ ] | [ ] | [ ] | |
| 5 | iOS / Android | [ ] | [ ] | [ ] | |

## Validation finale

- [ ] Frontend/design a validé le gabarit visuel.
- [ ] Backend a validé les contraintes du QR dynamique.
- [ ] DevOps a validé le domaine et le stockage prévus.
- [ ] ALTIORA a validé contenu, logo et couleurs.
- [ ] L’imprimeur a validé le fichier prêt à produire.
