# Spécification — Base de connaissances ALTIORA v1 pour le RAG

> Statut : brouillon de conception Sprint 1 à valider avec Samuel (IA), Backend, DevOps et ALTIORA.
>
> Cette spécification ne crée aucun chatbot, endpoint, appel d’IA, migration ou table supplémentaire.

## 1. Objectif

Définir comment les sources ALTIORA validées seront préparées pour une future recherche RAG. Le chatbot devra s’appuyer sur cette base pour répondre à partir d’informations vérifiées, sans inventer de tarif, d’engagement ou de contenu non validé.

## 2. Périmètre initial

Les sources prévues pour la version 1 sont :

- expertises ALTIORA ;
- formations ;
- FAQ validée ;
- coordonnées et informations de contact ;
- pages institutionnelles ;
- mentions légales.

Les contenus suivants sont exclus jusqu’à validation explicite :

- tarifs non validés ;
- engagements contractuels ;
- brouillons ou contenus non validés ;
- données personnelles inutiles à la réponse du chatbot.

## 3. Rôles

| Domaine | Responsable | Responsabilité |
| --- | --- | --- |
| Contenu et stratégie RAG | Samuel / IA | Sélection des sources, rédaction, validation métier et stratégie de recherche |
| Conception backend | Kenny / Backend | Structure documentaire, métadonnées, découpage, compatibilité PostgreSQL + pgvector et future ingestion |
| Exploitation | Fenosoa / DevOps | Stockage des sources, variables d’environnement, sauvegardes et exploitation |
| Validation métier | ALTIORA | Validation des sources et informations publiables |

## 4. Correspondance avec le modèle de données existant

### `knowledge_documents`

Cette table représente un document source validable. Les champs déjà conçus sont `id`, `title`, `source_url`, `status`, `created_at` et `updated_at`.

### `knowledge_chunks`

Cette table représente un extrait recherchable d’un document. Les champs déjà conçus sont `id`, `document_id`, `content`, `embedding`, `chunk_index` et `created_at`. La colonne `embedding` utilise pgvector avec `vector(1024)`.

### Métadonnées proposées

Les métadonnées fonctionnelles à suivre sont : titre, URL ou emplacement source, type de contenu, statut, langue, date de mise à jour, auteur ou validateur.

Les champs `type`, `langue`, `auteur` et `validateur` ne sont pas encore des colonnes du modèle PostgreSQL actuel. Ils restent dans l’inventaire de sources ou feront l’objet d’une décision de migration ultérieure, après validation de l’équipe.

## 5. Cycle de vie proposé

```text
brouillon → validé → indexé → archivé
```

- **brouillon** : contenu recensé mais non utilisable par le chatbot ;
- **validé** : contenu métier approuvé par ALTIORA ;
- **indexé** : contenu découpé, vectorisé et disponible pour la recherche RAG future ;
- **archivé** : contenu retiré de la recherche active, mais conservé selon la politique de conservation à définir.

## 6. Stratégie de découpage — à valider avec Samuel

Le découpage devra être sémantique : par section cohérente, titre, question-réponse ou bloc de formation. Chaque chunk doit conserver son lien avec le document source via `document_id` et son ordre via `chunk_index`.

La taille des chunks et le chevauchement entre chunks restent à déterminer avec Samuel avant le Sprint 3. Ils ne sont pas fixés dans ce document afin d’éviter une décision non validée sur la qualité de recherche.

## 7. Embeddings et recherche future

- Fournisseur choisi : Voyage AI.
- Dimension imposée : `1024` valeurs par embedding.
- Stockage prévu : `knowledge_chunks.embedding` en `vector(1024)`.
- Le nom exact du modèle Voyage AI reste à confirmer avec Samuel avant l’implémentation.

## 8. Chaîne d’ingestion future

```text
source validée → normalisation → découpage → embedding → stockage pgvector → recherche RAG
```

Cette chaîne est un flux de conception. Son implémentation, les appels à Voyage AI et la recherche du chatbot ne font pas partie du Sprint 1.

## 9. Garde-fous RAG

- Le chatbot doit répondre uniquement à partir de sources au statut `validé` puis `indexé`.
- Il doit refuser poliment les questions hors périmètre ou sans source fiable.
- Il ne doit pas inventer de tarif, d’engagement, de disponibilité ou d’information contractuelle.
- Les contenus contenant des données personnelles inutiles ne doivent pas être indexés.

## 10. Critères de validation Sprint 1

- [ ] Le périmètre des sources v1 est validé par ALTIORA et Samuel.
- [ ] L’inventaire des sources est créé et ses statuts sont renseignés.
- [ ] La correspondance avec `knowledge_documents` et `knowledge_chunks` est comprise par Backend et IA.
- [ ] La stratégie de découpage est validée avec Samuel.
- [ ] Voyage AI et la dimension `1024` sont documentés sans nom de modèle non validé.
- [ ] DevOps a confirmé le principe de stockage et de sauvegarde des sources.
- [ ] Aucune source non validée ni donnée personnelle inutile n’est prévue pour l’indexation.

## 11. Décisions ouvertes avant Sprint 3

- nom exact du modèle Voyage AI ;
- taille et chevauchement des chunks ;
- format technique des sources à ingérer ;
- métadonnées à ajouter éventuellement au modèle PostgreSQL ;
- mécanisme de mise à jour, désindexation et archivage ;
- politique de conservation des sources archivées.
