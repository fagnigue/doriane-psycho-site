# Site vitrine Doriane Zoko — Design

Date : 2026-10-11. Statut : à valider par l'utilisatrice avant implémentation.

## Objectif

Site vitrine d'une page pour Doriane Zoko, psychologue clinicienne (consultations individuelles en visio via Qare). Le visiteur doit se sentir rassuré et avoir envie de prendre rendez-vous. Ressenti : calme, confiance, simplicité, proximité. Pas de ressenti « slides », SaaS ou médical froid.

## Décisions actées

- Stack : Next.js 16.4 (App Router, `cacheComponents: true`), React 19, Tailwind v4, pnpm.
- UI : **HeroUI v3** (`@heroui/react` + `@heroui/styles`, 3.2.6). Pas de Provider requis. Composants utilisés : Button, Card, Chip, Accordion, Tabs, Link (noms exacts vérifiés à l'installation, voir plan, Task 1).
- Police : Geist (déjà chargée via `next/font/google`), repli Inter puis system-ui. Pas de serif.
- RPPS affiché : **10111858667**.
- URL Qare : `https://www.qare.fr/praticien/69fca90c4c4ffa002f7a3001?all=true&selectedSpeciality=psychologist&standardizedMotives=`.
- Les 3 témoignages sont réels, sans attribution nominative, textes repris de `Refonte site psychologue/src/App.tsx`.
- `#D4FFF9` est interdit partout (vérifié par grep en fin de plan).
- Page unique avec ancres. Maximum 6 blocs, footer inclus dans le dernier.
- Pas de dark mode, pas d'icônes en dépendance (SVG inline), pas de page légale (liens affichés, non cliquables, destination non fournie).

## Charte graphique (source de vérité : `app/globals.css`)

| Token | Valeur | Rôle |
|---|---|---|
| `--brand-teal` | `#52837C` | Signature : accents, icônes, bordures actives, grands aplats |
| `--brand-teal-deep` | `#3E6761` | Dérivé du teal : fond des boutons/cartes portant du texte courant, texte de liens |
| `--brand-aqua` | `#97CFC7` | Halos, formes décoratives, hover très subtil |
| `--brand-brown` | `#835745` | Petits accents chauds, mots-clés, texte secondaire |
| `--brand-rose` | `#CFA897` | Pastilles, touches chaudes, formes décoratives |
| `--brand-ivory` | `#F7F5F1` | Fond du site |
| `--brand-white` | `#FFFFFF` | Surfaces, cartes |
| `--ink` | `#26332F` | Texte principal (dérivé sombre de la marque) |

**Contraste** : `#52837C` sur blanc = 4,3:1 (< 4,5). Règle : aucun texte inférieur à 24 px posé directement sur `#52837C`. Les boutons et surfaces portant du texte courant utilisent `--brand-teal-deep` (6,3:1 sur blanc). Le teal pur reste visible partout ailleurs. Cette dérogation est la seule entorse à « teal signature » ; elle peut être revue si l'utilisatrice préfère le teal pur sur les boutons.

Les variables HeroUI (`--background`, `--foreground`, `--accent`, `--surface`, `--border`, `--radius`, `--focus`, `--link`…) sont mappées sur ces tokens dans `:root`, de sorte que tous les composants HeroUI héritent de la charte sans surcharge locale. Les tokens sont aussi exposés à Tailwind via `@theme inline` (`bg-teal`, `text-brown`, `bg-ivory`…).

## Langage visuel

- Fond ivoire continu. Aucun bandeau pleine largeur à fond alterné. Les changements d'ambiance viennent de la composition.
- Surfaces : `rounded-3xl`, blanc à 60-70 %, bordure fine, ombre très légère, flou léger limité au header et aux chips flottantes.
- Boutons `rounded-full`, flèche qui glisse de 4 px, léger soulèvement au hover.
- Titres : H1 clamp 36→56 px, H2 clamp 28→40 px, H3 20-24 px, corps 16-17 px.
- « Fun » mesuré : cartes qui se soulèvent et s'inclinent de 1-2°, icônes qui rebondissent, chips flottantes du portrait qui oscillent, halos `#97CFC7`/`#CFA897` qui dérivent lentement, apparition au scroll (fade + translateY) en CSS pur.
- Durées 200-400 ms. Tout est neutralisé sous `prefers-reduced-motion: reduce`.

## Structure (6 blocs)

1. **Hero** (`#accueil`) : eyebrow, H1 « Un espace pour souffler. », sous-texte, CTA « Prendre rendez-vous → » et « Découvrir mon approche → », ligne « Consultations individuelles · 45 min · en visioconférence », RPPS. À droite : portrait dans une grande forme arrondie, chips flottantes « En visioconférence » et « 45 min ».
2. **Vous reconnaissez-vous ?** (`#situations`) : « Vous êtes peut-être au bon endroit si… », 4 cartes asymétriques (stress ou anxiété ; famille, couple ou travail ; confiance en soi ; émotions). Mobile : défilement horizontal avec accroche.
3. **Mon approche** (`#qui-suis-je`) : une grande surface contenant portrait, texte de présentation, lien « Ma façon de vous accompagner → » et les 4 principes (Écouter, Comprendre, Collaborer, Trouver vos propres réponses) en onglets HeroUI Tabs.
4. **Comment ça fonctionne** (`#cadre-tarif`) : grille bento. 4 étapes de première séance ; 3 mini-cartes (45 min, En visio, Confidentiel) ; carte tarif teal-deep « 60 € · Environ 45 minutes · individuel et en ligne » + mention mutuelles ; prérequis visio ; un seul CTA.
5. **FAQ et réassurance** (`#faq`) : Accordion HeroUI (6 questions) ; carte de réassurance (confidentialité, Qare, RPPS) ; les 3 témoignages (« Ce que cet espace peut permettre. »), une citation principale + deux secondaires.
6. **CTA final + footer** : grande carte teal-deep arrondie (titre, texte, CTA, phrase de liberté), puis footer compact (nom, RPPS, Qare, navigation, liens légaux non cliquables).

Header sticky translucide : nom + « Psychologue clinicienne », nav (Accueil, Qui suis-je ?, Cadre et tarif, FAQ), CTA. Mobile : bouton menu (`aria-expanded`) ouvrant un panneau compact avec le CTA.

Occurrences du CTA principal : header, hero, bloc 4, bloc 6 (4 maximum).

## Contenu

Les textes proviennent du brief et du projet `Refonte site psychologue` (situations, principes, étapes, FAQ, témoignages) et sont centralisés dans `lib/content.ts`. Rien n'est inventé : pas de nouveau service, diplôme, tarif ou promesse. Le portrait n'existe pas : un emplacement `public/doriane.jpg` est prévu via `next/image`, avec un placeholder propre tant que le fichier est absent.

## Architecture

```
app/layout.tsx, page.tsx, globals.css
lib/content.ts
components/ui/        CtaLink, PortraitFrame, Decor, icons
components/layout/    Header (client), Footer
components/sections/  Hero, Concerns, About, HowItWorks, FaqSection, FinalCta
```

Server Components par défaut. Client uniquement : Header (menu), composants HeroUI interactifs (Accordion, Tabs). Apparition au scroll en CSS pur (`animation-timeline: view()` sous `@supports`), sans JavaScript.

## SEO et accessibilité

Titre « Doriane Zoko — Psychologue clinicienne », description orientée consultation en ligne, Open Graph, `lang="fr"`, un seul H1, H2 cohérents. Focus visible, navigation clavier, `aria-label` sur le menu, alt sur les images, accordéon et onglets accessibles (react-aria), contrastes selon la règle ci-dessus.

## Hors périmètre

Pages légales, formulaire, analytics, intégration Qare embarquée, photo générée, dark mode.

## Risques

- `cacheComponents: true` et Next 16 : lire les docs locales avant de coder ; la page doit rester entièrement statique.
- Peer deps HeroUI (`react-aria`, `react-aria-components`, `@react-aria/ssr`, `@react-aria/utils`, `@internationalized/date`) : vérifier l'installation par pnpm.
- Le setup Tailwind du dépôt (`@tailwindcss/turbopack` dans `next.config.ts`) est inhabituel : un build de référence est lancé avant toute modification.
- API Button-lien de HeroUI non documentée : tranchée par un spike (plan, Task 1).
