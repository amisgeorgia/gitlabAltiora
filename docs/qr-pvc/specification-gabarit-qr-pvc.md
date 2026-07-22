# Spécification technique — gabarit QR PVC

> Statut : brouillon de conception à valider avec Frontend, DevOps, ALTIORA et l’imprimeur.
>
> Cette spécification ne définit ni les tables PostgreSQL, ni les endpoints API, ni le générateur QR.

## 1. Objet

Définir le gabarit technique d’une carte PVC ALTIORA contenant un QR dynamique. Le gabarit servira à préparer les exports imprimables et à vérifier que le QR reste lisible après impression.

## 2. Dimensions du support

| Élément | Dimension |
| --- | --- |
| Format fini (découpe) | 85,6 × 54 mm |
| Fond perdu | 3 mm sur chaque côté |
| Format du fichier avec fond perdu | 91,6 × 60 mm |
| Zone sûre proposée | 3 mm à l’intérieur du format fini |

La zone sûre proposée doit être confirmée par l’imprimeur. Aucun texte, logo ou élément important ne doit sortir de cette zone.

## 3. Règles du QR code

- Le QR doit utiliser la correction d’erreur **H**.
- La zone silencieuse doit mesurer au minimum **4 modules** tout autour du QR.
- Le QR doit présenter un contraste fort : modules foncés sur fond clair, sans texture ni dégradé derrière.
- Le logo ALTIORA éventuel est réservé au centre du QR. Sa taille finale doit être validée par des essais de lecture ; il ne doit pas supprimer les repères de positionnement du QR.
- Le QR et son logo ne doivent pas être placés contre une ligne de découpe ou hors zone sûre.

## 4. Composition proposée

- QR : positionné dans la zone sûre, avec un espace libre complet autour de lui.
- Logo : emplacement réservé dans le QR, sans utilisation d’un logo inventé dans le gabarit technique.
- Informations complémentaires : uniquement dans la zone sûre et avec une taille de texte lisible après impression.
- Charte : la version graphique finale doit respecter la charte navy/or d’ALTIORA, sans sacrifier le contraste du QR.

## 5. Exports attendus

| Format | Usage | Exigence |
| --- | --- | --- |
| SVG | source vectorielle | éditable et sans pixelisation |
| PNG | aperçu ou usage numérique | au moins 300 dpi à la taille d’impression |
| PDF | remise à l’imprimeur | fond perdu et repères validés par l’imprimeur |

Le fichier `gabarit-technique-qr-pvc.svg` est un schéma de travail. Il ne remplace pas le fichier final validé par l’imprimeur.

## 6. Principe du QR dynamique

Le QR final doit encoder une URL courte de la forme :

```text
https://altiora-prest.com/q/{code}
```

Le service futur devra assurer la redirection, la conservation ou l’ajout des paramètres UTM, et le comptage minimal des scans. Ces fonctions ne sont pas implémentées dans ce livrable.

## 7. Dépendances avant implémentation

Avant de créer les tables `qr_codes`, `qr_scans`, les endpoints ou le générateur QR, l’équipe doit valider :

1. le modèle PostgreSQL ;
2. les règles de conservation des données de scan ;
3. le domaine public et le stockage des exports avec DevOps ;
4. le gabarit visuel avec Frontend et ALTIORA / imprimeur.

## 8. Risques et validations nécessaires

- Un logo central trop grand peut empêcher la lecture du QR.
- Un contraste insuffisant, une impression floue ou un fond décoratif peuvent rendre le QR illisible.
- La zone sûre et les profils colorimétriques dépendent des contraintes finales de l’imprimeur.
- Les cinq lectures iOS/Android constituent une validation obligatoire avant production en série.

## 9. Responsabilités

| Domaine | Responsable |
| --- | --- |
| Spécification QR dynamique, URL courte, UTM et scans | Backend — Kenny |
| Gabarit visuel et intégration charte | Frontend / design — Dera et équipe |
| Stockage, domaine public, déploiement et logs | DevOps — Fenosoa |
| Validation physique et contraintes d’impression | ALTIORA / imprimeur |
