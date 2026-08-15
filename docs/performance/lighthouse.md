# Audit Performance — Lighthouse

> **Sprint 2** — Optimisation Lighthouse ≥ 90 sur les 4 axes  
> Dernière mise à jour : 15 août 2026

---

## Objectif

Maintenir un score Lighthouse ≥ 90 sur les 4 axes suivants :

| Axe | Seuil | Statut baseline (build prod) |
|-----|-------|------------------------------|
| Performance | ≥ 90 | **100** ✅ |
| Accessibilité | ≥ 90 | **100** ✅ |
| Best Practices | ≥ 90 | **100** ✅ |
| SEO | ≥ 90 | **100** ✅ |

---

## Exécution locale (développement)

### Prérequis
- Node.js installé sur l'hôte
- Google Chrome installé
- Le stack Docker Compose de dev tourne (`docker compose up -d`)

### Commande

```bash
# Depuis la racine du projet, HORS conteneur
npx lighthouse http://localhost:3000 \
  --output html \
  --output-path ./lighthouse-report.html \
  --chrome-flags='--headless --no-sandbox --disable-gpu' \
  --preset=desktop

# Ouvrir le rapport
start lighthouse-report.html

```

---

### Exécution locale (build de production)

Le score baseline officiel (100/100/100/100) a été mesuré sur un **build de production**, pas en mode dev (le mode dev de Next.js est volontairement plus lent, non optimisé).

```bash
# Depuis frontend/
npm run build
npm start
```

Dans un autre terminal :
```bash
npx lighthouse http://localhost:3000 \
  --output html \
  --output-path ./lighthouse-report-prod.html \
  --chrome-flags='--headless --no-sandbox --disable-gpu' \
  --preset=desktop
```

---

## Exécution automatique en CI (GitLab)

Le job `lighthouse` (stage `test`) s'exécute automatiquement **sur chaque Merge Request** (règle `$CI_PIPELINE_SOURCE == "merge_request_event"`), pour éviter de le lancer sur chaque commit et économiser des minutes CI.

Étapes automatisées :
1. Build de production du frontend (`npm run build`)
2. Démarrage du serveur (`npm start`)
3. Audit Lighthouse (JSON + HTML)
4. Vérification du seuil via `scripts/check-lighthouse-score.js` (seuil : **90/100** sur les 4 axes)

Le job **échoue** si un score descend sous 90 — bloquant pour le merge (cohérent avec la règle "Pipelines doivent réussir").

Les rapports (`lighthouse-report.json` / `.html`) sont conservés **1 semaine** en tant qu'artéfacts GitLab, téléchargeables depuis la page du job.

---

## Que faire en cas d'échec

1. Télécharger `lighthouse-report.html` depuis les artéfacts du job en échec.
2. Ouvrir le fichier dans un navigateur pour voir le détail des points perdus.
3. Corriger (image non optimisée, CSS bloquant, balise alt manquante, etc.).
4. Repousser sur la même branche — le job se relance automatiquement.

---

## Historique des baselines

| Date | Performance | Accessibilité | Best Practices | SEO | Commit |
|---|---|---|---|---|---|
| 12/08/2026 | 62 | 100 | ❌ (échec) | 100 | Baseline en mode dev — non représentative (Turbopack/HMR/source maps) |
| 13/08/2026 | 100 | 100 | 100 | 100 | Après corrections, mesuré sur build de production |

---

## Corrections apportées (Sprint 2)

Diagnostic initial : score Performance 62 en mode développement, jugé **non représentatif** (le mode dev Next.js inclut Turbopack, Hot Module Replacement et source maps qui pénalisent artificiellement le score). Décision : ignorer le JS inutilisé et le TBT du mode dev, re-tester uniquement sur build de production.

Métriques critiques ciblées :
- **LCP** (Largest Contentful Paint) : 2.9s → cible < 2.5s
- **TBT** (Total Blocking Time) : 510ms → cible < 200ms

Actions réalisées par l'équipe Frontend :

1. **Polices** (`src/app/layout.tsx`) : usage de `next/font` avec `display: 'swap'` pour éviter le blocage de rendu par le chargement des polices.
2. **Images** : remplacement des balises `<img>` par `<Image>` de Next.js (`priority` sur l'image hero/LCP), conversion prévue en WebP dès réception des visuels définitifs.
3. **Metadata** (`src/app/layout.tsx`) : ajout du titre, de la description, des directives `robots`, et de l'URL canonique — corrige les points SEO/Best Practices.
4. **Re-test sur build de production** (`next build` + `next start`), pas en mode dev — condition indispensable pour un score représentatif.

Résultat final : **100/100/100/100**, validé le 13/08/2026, sur la branche `fix/lighthouse-quick-wins` (MR vers `develop`).

> ⚠️ **Point de vigilance** : le score 100/100/100/100 a été mesuré avec des images placeholder. Un nouvel audit sera nécessaire une fois les visuels définitifs intégrés (conversion WebP + dimensions réelles), pour confirmer que le score reste ≥ 90.
