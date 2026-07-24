# site-web

Site vitrine institutionnel, chatbot IA (RAG) et générateur de QR codes pour ALTIORA PREST — projet réalisé dans le cadre du partenariat ALTIORA × E PREST.


## Workflow Git


- `main` et `develop` sont des branches protégées : aucun push direct n'est autorisé.
- Pour chaque tâche (voir le board Trello), créer une branche dédiée depuis `develop` à jour :
```bash
  git checkout develop
  git pull origin develop
  git checkout -b feature/nom-de-la-tache
```
- Convention de nommage des branches : `feature/<role>-<description-courte>`
  (ex. `feature/backend-init-fastapi`, `feature/frontend-tests`)
- Une fois la tâche terminée, ouvrir une Merge Request vers `develop` (jamais vers `main`).
- `main` ne reçoit du code que via une Merge Request `develop → main`, en fin de sprint (géré par le DevOps).
- La branche source est supprimée automatiquement après fusion.

## Environnement de développement local

```bash
docker compose up --build
```
- Frontend : http://localhost:3000
- Backend (API) : http://localhost:8000
- Backend (santé) : http://localhost:8000/health
- PostgreSQL : localhost:5432

Copier `.env.example` en `.env` et compléter les valeurs avant de lancer le projet.

### Convention de gestion des variables d'environnement

- Le `.env` à la racine du repo est la **source unique de vérité** pour Docker Compose (toutes les variables, y compris `NEXT_PUBLIC_API_URL`).
- Le `.env.local` dans `frontend/` sert uniquement si quelqu'un lance `npm run dev` en dehors de Docker (dev sans conteneur) — dans ce cas, copier manuellement les variables nécessaires depuis le `.env` racine.
- Le `.env.example` à la racine reste le seul gabarit officiel à maintenir à jour.