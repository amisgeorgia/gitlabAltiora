# Spécification technique — gabarit QR PVC

> Statut : brouillon de conception validé fonctionnellement par Frontend/design et DevOps, à compléter par la validation ALTIORA / imprimeur avant production.
>
> Ce document définit le gabarit et le contrat fonctionnel du QR dynamique. Il n’implémente ni migration PostgreSQL, ni endpoint API, ni générateur QR.

## 1. Objet

Définir le gabarit technique d’une carte PVC ALTIORA contenant un QR dynamique. Le gabarit sert à préparer les exports imprimables et à vérifier que le QR reste lisible après impression.

## 2. Dimensions du support

| Élément | Dimension |
| --- | --- |
| Format fini (découpe) | 85,6 × 54 mm |
| Fond perdu | 3 mm sur chaque côté |
| Format du fichier avec fond perdu | 91,6 × 60 mm |
| Zone sûre proposée | 3 mm à l’intérieur du format fini |

La zone sûre doit être confirmée par l’imprimeur. Aucun texte, logo ou élément important ne doit sortir de cette zone.

## 3. Règles du QR code

- Le QR doit utiliser la correction d’erreur **H**.
- La zone silencieuse doit mesurer au minimum **4 modules** tout autour du QR.
- Les modules doivent être bleu marine ALTIORA ou noirs sur un fond clair, sans texture ni dégradé derrière.
- Le contraste entre les modules et le fond doit être d’au moins **40 %** ; la combinaison inverse est interdite.
- Le logo ALTIORA éventuel est réservé au centre du QR et ne doit pas occuper plus de **20 %** de la surface du QR.
- Le logo ne doit pas supprimer les repères de positionnement du QR et sa taille finale doit être confirmée par une épreuve de lecture.
- Le QR et son logo ne doivent pas être placés contre une ligne de découpe ou hors zone sûre.

## 4. Composition proposée

- QR : positionné dans la zone sûre, avec un espace libre complet autour de lui.
- Logo : emplacement réservé dans le QR, sans utilisation d’un logo inventé dans le gabarit technique.
- Informations complémentaires : uniquement dans la zone sûre et avec une taille de texte lisible après impression.
- Charte : la version graphique finale doit respecter la charte navy/or d’ALTIORA sans sacrifier le contraste du QR.

## 5. Exports attendus

| Format | Usage | Exigence |
| --- | --- | --- |
| SVG | source vectorielle | éditable et sans pixelisation |
| PNG | aperçu ou usage numérique | au moins 300 dpi à la taille d’impression |
| PDF | remise à l’imprimeur | fond perdu, repères et profil CMJN si l’imprimeur l’exige |

Le fichier `gabarit-technique-qr-pvc.svg` est un schéma de travail. Il ne remplace pas le fichier final validé par l’imprimeur.

## 6. Principe du QR dynamique

Le QR final doit encoder une URL courte de la forme :

```text
https://altiora-prest.com/q/{code}
```

Le service futur devra assurer la redirection, la conservation ou l’ajout des paramètres UTM, et le comptage minimal des scans. Ces fonctions ne sont pas implémentées dans ce livrable.

## 7. Spécification conceptuelle du QR dynamique — à valider avant Sprint 3

### Cibles QR acceptées

Les QR pourront cibler le site ALTIORA, une page interne, un réseau social ALTIORA ou une vCard.

### Format du code court

Proposition à valider avant implémentation :

- code unique de 8 à 12 caractères ;
- alphabet alphanumérique sans caractères ambigus ;
- code non modifiable après création ;
- aucun identifiant personnel dans le code.

### Campagnes et paramètres UTM

Les paramètres `utm_source`, `utm_medium` et `utm_campaign` permettent d’identifier le support. La règle exacte de conservation ou d’ajout des UTM lors de la redirection doit être validée avant le Sprint 3.

### Données minimales de scan

Les données minimales prévues sont `qr_code_id`, `scanned_at`, `user_agent` et `referrer`. Aucune adresse IP brute ne doit être stockée sans décision explicite d’ALTIORA et de l’équipe.

### Conservation des données

La durée de conservation des scans reste à définir avec ALTIORA. La solution devra appliquer la minimisation des données et permettre une suppression ou une anonymisation ultérieure.

### Endpoints futurs proposés

- `POST /admin/qrcodes` : créer un QR ;
- `GET /q/{code}` : compter le scan puis rediriger ;
- endpoint d’export SVG, PNG ou PDF pour un QR créé.

Ces endpoints sont des propositions de conception : ils ne sont pas créés dans ce Sprint 1.

## 8. Dépendances avant implémentation

- Les tables `qr_codes` et `qr_scans` sont déjà conçues dans le modèle PostgreSQL.
- Les règles de conservation des données de scan doivent être validées avec ALTIORA.
- Le domaine public et le stockage des exports doivent être confirmés avec DevOps.
- Le gabarit visuel doit être confirmé avec Frontend/design et ALTIORA / imprimeur.
- L’implémentation du QR dynamique appartient au Sprint 3.

## 9. Validation par sprint

### Sprint 1 — conception

La spécification, le gabarit SVG et la checklist sont revus par Frontend/design et DevOps. Ils établissent les règles nécessaires au développement ultérieur, sans QR réel ni test physique.

### Sprint 3 — implémentation et recette

La génération réelle, les exports définitifs, l’épreuve PVC et la lecture à 100 % sur cinq appareils distincts iOS/Android sont validées au Sprint 3 avant production en série.

## 10. Risques et validations nécessaires

- Un logo central trop grand peut empêcher la lecture du QR.
- Un contraste insuffisant, une impression floue ou un fond décoratif peuvent rendre le QR illisible.
- La zone sûre et le profil colorimétrique CMJN dépendent des contraintes finales de l’imprimeur.
- Les cinq lectures iOS/Android constituent une validation obligatoire avant production en série.

## 11. Responsabilités

| Domaine | Responsable |
| --- | --- |
| Spécification QR dynamique, URL courte, UTM et scans | Backend — Kenny |
| Gabarit visuel et intégration charte | Frontend / design — Dera et équipe |
| Stockage, domaine public, déploiement et logs | DevOps — Fenosoa |
| Validation physique et contraintes d’impression | ALTIORA / imprimeur |
