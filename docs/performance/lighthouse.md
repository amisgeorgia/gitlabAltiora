# Audit Performance — Lighthouse

> **Sprint 2** — Optimisation Lighthouse ≥ 90 sur les 4 axes  
> Dernière mise à jour : 9 septembre 2026

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

Le job `lighthouse` (stage `test`) s'exécute automatiquement :
- sur les Merge Requests (`merge_request_event`) ;
- sur la branche `develop` ;
- sur la branche `main`.

L'audit est réalisé sur un **build de production** du frontend afin d'éviter les mesures non représentatives du mode développement Next.js.

### Stratégie de mesure

Afin de limiter l'impact de la variabilité des runners CI sur le score Performance, Lighthouse est exécuté **3 fois**.

Étapes automatisées :

1. Installation de **Lighthouse 13.4.1** afin de garantir une version reproductible dans la CI.
2. Build de production du frontend (`npm run build`).
3. Démarrage du serveur (`npm start`).
4. Exécution de **3 audits Lighthouse JSON** en mode desktop.
5. Sélection du rapport ayant le **score Performance médian** via `scripts/select-lighthouse-median.js`.
6. Création de `lighthouse-report.json` à partir du rapport médian.
7. Génération du rapport HTML de diagnostic.
8. Vérification du seuil via `scripts/check-lighthouse-score.js`.

Le seuil reste fixé à **90/100 sur les 4 axes** :
- Performance ;
- Accessibilité ;
- Best Practices ;
- SEO.

Le job **échoue** si l'un des quatre scores du rapport sélectionné descend sous 90. Le seuil de qualité n'est donc pas abaissé : la stratégie à trois mesures vise uniquement à rendre la mesure Performance plus robuste face aux variations ponctuelles d'exécution en CI.

### Artéfacts conservés

Les fichiers suivants sont conservés pendant **1 semaine** :

- `lighthouse-run-1.json`
- `lighthouse-run-2.json`
- `lighthouse-run-3.json`
- `lighthouse-report.json`
- `lighthouse-report.html`

Les trois rapports bruts permettent de comparer les mesures en cas d'échec et de distinguer plus facilement une régression reproductible d'une variation ponctuelle du runner CI.

> **Note :** le rapport HTML est généré par un audit séparé à des fins de diagnostic. Le résultat qui détermine le succès ou l'échec du job est `lighthouse-report.json`, sélectionné parmi les trois audits JSON.

---

## Que faire en cas d'échec

1. Consulter les scores affichés dans les logs du job Lighthouse.
2. Télécharger les trois rapports bruts (`lighthouse-run-1.json`, `lighthouse-run-2.json`, `lighthouse-run-3.json`) afin de comparer les trois mesures.
3. Consulter `lighthouse-report.json`, qui correspond au rapport médian utilisé pour valider le seuil des 4 axes.
4. Ouvrir `lighthouse-report.html` pour analyser visuellement les recommandations Lighthouse. Ce rapport est généré séparément et sert uniquement au diagnostic.
5. Si les trois mesures montrent une baisse similaire, rechercher une régression réelle dans l'application (TBT, LCP, JavaScript, images, accessibilité, etc.).
6. Si une mesure est anormalement basse mais que les autres restent nettement supérieures, tenir compte d'une possible variabilité du runner CI avant de modifier le code applicatif.
7. Après correction si nécessaire, repousser sur la même branche afin de relancer le pipeline.

---

## Historique des baselines

| Date | Performance | Accessibilité | Best Practices | SEO | Commit |
|---|---|---|---|---|---|
| 12/08/2026 | 62 | 100 | ❌ (échec) | 100 | Baseline en mode dev — non représentative (Turbopack/HMR/source maps) |
| 13/08/2026 | 100 | 100 | 100 | 100 | Après corrections, mesuré sur build de production |
| 08/09/2026 | 75–76 | 92 | 100 | 100 | Baisse CI observée sur `develop`, principalement liée au TBT |
| 09/09/2026 | 96 | 96 | 100 | 100 | Test local de diagnostic avec ScrollReveal temporairement désactivé |
| 09/09/2026 | 99 | 96 | 100 | 100 | Build local après correction : ScrollReveal conservé avec initialisation différée |
| 09/09/2026 | 83 puis 96 | 92 | 100 | 100 | Même SHA de la MR !38 sur runners CI différents : variabilité confirmée |
| 09/09/2026 | 84 | 92 | 100 | 100 | Pipeline `develop` après fusion de la MR !38 ; motivation de la stabilisation des mesures CI |

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
