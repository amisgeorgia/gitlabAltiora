# Checklist de test — QR PVC ALTIORA

> Les validations de conception appartiennent au Sprint 1. Les essais d’impression et de redirection appartiennent au Sprint 3.

## Validation de conception — Sprint 1

- [ ] La spécification documente les cibles site, page interne, réseau social et vCard.
- [ ] Le format de l’URL courte `/q/{code}` est documenté.
- [ ] La proposition de format du code court est validée avant implémentation.
- [ ] Les paramètres `utm_source`, `utm_medium` et `utm_campaign` sont documentés.
- [ ] La règle de conservation ou d’ajout des UTM lors de la redirection est validée.
- [ ] Les données minimales de scan sont définies : QR, date, user-agent et referrer.
- [ ] Aucune adresse IP brute n’est prévue sans décision explicite d’ALTIORA.
- [ ] Les règles de conservation, suppression ou anonymisation des scans restent à valider avec ALTIORA.
- [ ] Les endpoints futurs de création, redirection et export sont documentés sans être implémentés.
- [ ] Frontend/design a validé le gabarit visuel.
- [ ] Backend a validé les contraintes du QR dynamique.
- [ ] DevOps a validé le domaine et le stockage prévus.

## Fichiers et gabarit — Sprint 3

- [ ] Le SVG s’ouvre correctement et conserve les éléments vectoriels.
- [ ] Le PNG est exporté à au moins 300 dpi à la taille d’impression.
- [ ] Le PDF contient le fond perdu, le format et le profil CMJN si l’imprimeur le demande.
- [ ] Le format fini est 85,6 × 54 mm.
- [ ] Le fond perdu mesure 3 mm de chaque côté.
- [ ] Les éléments importants restent dans la zone sûre validée.

## Lisibilité du QR — Sprint 3

- [ ] Correction d’erreur H utilisée.
- [ ] Zone silencieuse d’au moins 4 modules autour du QR.
- [ ] Modules bleu marine ou noirs sur fond clair, sans motif ni dégradé derrière.
- [ ] Contraste d’au moins 40 %.
- [ ] Le logo central occupe au maximum 20 % de la surface du QR.
- [ ] QR lisible à une distance de lecture normale de carte.

## Redirection et UTM — Sprint 3

- [ ] Le QR ouvre l’URL courte `/q/{code}` attendue.
- [ ] La cible de redirection est correcte.
- [ ] Les paramètres UTM attendus sont présents après redirection.
- [ ] Le scan est compté par le futur service, sans collecte excessive de données.

## Épreuve PVC sur appareils — Sprint 3

| Appareil distinct | Système | Lecture QR | Redirection | UTM | Remarques |
| --- | --- | --- | --- | --- | --- |
| 1 | iOS / Android | [ ] | [ ] | [ ] | |
| 2 | iOS / Android | [ ] | [ ] | [ ] | |
| 3 | iOS / Android | [ ] | [ ] | [ ] | |
| 4 | iOS / Android | [ ] | [ ] | [ ] | |
| 5 | iOS / Android | [ ] | [ ] | [ ] | |

- [ ] L’épreuve PVC est lisible à 100 % sur cinq appareils distincts iOS/Android.

## Validation finale — Sprint 3

- [ ] ALTIORA a validé contenu, logo et couleurs.
- [ ] L’imprimeur a validé le fichier prêt à produire.
