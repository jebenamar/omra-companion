# Omra Companion — رفيق العمرة

Compagnon spirituel et pratique de la Omra : PWA installable, **entièrement hors ligne**, en **arabe (RTL), français, anglais et espagnol**.

## Démarrage

```bash
pnpm install
pnpm dev                # développement (service worker désactivé)
pnpm build              # export statique dans out/ + manifeste de pré-cache + sw.js horodaté
pnpm start              # sert out/ sur http://localhost:3000 (mode production, hors ligne actif)
```

| Commande | Rôle |
|---|---|
| `pnpm test` | Vitest : logique, composants (React Testing Library) et **validation des contenus** |
| `pnpm validate:content` | Uniquement la validation des contenus (4 langues, clés, références, textes arabes) |
| `pnpm validate:urls` | Vérifie en ligne les URLs des sources et les ID YouTube (oEmbed) |
| `pnpm test:e2e` | Playwright sur le build de production (`PW_CHANNEL=msedge` pour utiliser Edge installé) |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript strict |
| `pnpm icons` | Régénère les icônes PNG à partir de la géométrie de `public/icons/icon.svg` |

## Architecture

- **Next.js 16 (App Router) en export statique** (`output: "export"`) : chaque page de chaque langue est pré-rendue (159 pages). Aucun serveur ni backend n'est nécessaire ; n'importe quel hébergement statique convient.
- **i18n** : `next-intl`, routes `/ar` `/fr` `/en` `/es`. `/` choisit la langue (choix mémorisé, sinon langue du navigateur) par un script inline qui fonctionne hors ligne. Le changement de langue conserve la page courante (`swapLocaleInPath`) ; la progression est stockée indépendamment de la langue.
- **RTL** : `dir="rtl"` sur `<html>` pour l'arabe, propriétés CSS logiques (`ps-*`, `ms-*`, `start-*`), icônes directionnelles inversées via `.rtl-flip`.
- **Données utilisateur** : IndexedDB via Dexie (`src/lib/db.ts`) — progression, étape courante, favoris, compteurs, checklist, lieux visités. Toute évolution de schéma passe par un nouveau `db.version(n)`.
- **Préférences d'affichage** (thème, contraste, taille de l'arabe, phonétique) : `localStorage`, appliquées avant le premier rendu.
- **Polices** : Geist, Noto Sans Arabic, Amiri — téléchargées au build et auto-hébergées (aucun CDN à l'exécution).

### Hors ligne (PWA)

- `scripts/generate-precache.mjs` liste après le build tous les fichiers de `out/` : un **cœur** (JS, CSS, polices, icônes ≈ 1,8 Mo) et **un pack par langue** (≈ 6 Mo chacun), et injecte un hash de contenu dans `sw.js`.
- `public/sw.js` : cache par build, *cache-first* pour les fichiers pré-cachés (y compris les payloads RSC de la navigation client). À l'installation d'une nouvelle version, il re-télécharge le cœur **et les langues déjà téléchargées** ; en cas d'échec, l'ancienne version reste active. L'activation supprime les anciens caches mais **ne touche jamais IndexedDB**.
- La langue active est téléchargée automatiquement à la première visite ; la page *Plus → Contenus hors ligne* permet de choisir les langues, affiche taille, état et date, et demande un stockage persistant.
- Les mises à jour sont proposées par une bannière (« Mettre à jour ») ; rien n'est rechargé sans action de l'utilisateur.
- Vidéos YouTube et carte (tuiles OpenStreetMap) nécessitent Internet et sont signalées comme telles. **Aucune navigation GPS hors ligne n'est proposée** : l'itinéraire ouvre l'application de navigation du téléphone.

### Contenus

```
src/content/
  types.ts       modèles typés (LocalizedText, UmrahStep, Dua, Place, Video, Source…)
  sources.ts     référentiel central des sources (Coran, hadiths, sources officielles)
  steps.ts       les 9 étapes : que faire, comment, erreurs, divergences, sources, résumé « focus »
  duas.ts        21 invocations : arabe vocalisé, phonétique, traductions, explication, moment, sources
  places.ts      18 lieux (La Mecque, Médine), catégorisés rite / mosquée / historique / Hajj
  checklist.ts   checklist avant départ (7 catégories)
  videos.ts      vidéos vérifiées (vide pour l'instant, voir ci-dessous)
src/messages/{ar,fr,en,es}.json   textes d'interface uniquement
```

## Fiabilité religieuse — état réel

- **Textes arabes des invocations** : comparés mot à mot (voyelles ignorées) avec les pages sunnah.com citées, le 29/10/2026 — 15 textes issus de hadiths identiques à la source ; les textes coraniques suivent quran.com. Une référence non concordante (Muslim 1301 pour « Allahumma-rham al-muhalliqin ») a été retirée ; Bukhari 1727 reste la source.
- **Références** : 35 hadiths ouverts et contrôlés sur sunnah.com (narrateur, contenu, gradation affichée). Corrections faites : Tirmidhi 2140 rapporté par Anas ; gradations de Tirmidhi 324 et Ibn Majah 3062 alignées sur la page source ; Muslim 1251 → variante `1251a` ; Muslim 1211 retiré (passage non trouvé dans la variante citée).
- **Traductions FR/EN/ES** : traductions du sens rédigées pour l'application, **non officielles**, affichées avec un badge « à faire valider ». Elles doivent être relues par une personne qualifiée ou remplacées par des traductions publiées (avec leur licence).
- **Divergences** : signalées sans être tranchées (prière de l'Ihram, pureté pour le Tawaf, statut du Sa'i, quantité minimale du raccourcissement).
- **Aucune invocation par tour** de Tawaf ou de Sa'i ; les visites historiques sont explicitement présentées comme ne faisant pas partie des rites.

### Reste à faire avant publication

1. **Relecture par un savant/traducteur qualifié** des explications et traductions (FR, EN, ES) ; puis passer `translationStatus` à `"sourced"` si une traduction publiée est utilisée.
2. **Vidéos** : aucune n'est intégrée — l'application l'indique sur chaque étape. Ajouter dans `videos.ts` uniquement des vidéos de chaînes officielles dont l'ID a été vérifié (`pnpm validate:urls`) et le contenu visionné.
3. **Photos des lieux** : emplacements prévus (`Place.photo` avec crédit et licence), aucune photo intégrée faute de licence vérifiée.
4. **Coordonnées** : approximatives (centre du site, ~100 m), indiquées comme telles.
5. Sources à documenter précisément : Jannat al-Mu'alla (inhumation de Khadija) et site du Khandaq, marqués « en attente de vérification ».
6. `alharamain.gov.sa` n'a pas pu être ouvert depuis l'environnement de développement : non marqué comme vérifié.
7. Audio : aucun enregistrement n'est fourni (champ `audioUrl` prévu).
