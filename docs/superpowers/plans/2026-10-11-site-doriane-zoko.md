# Site vitrine Doriane Zoko — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la page unique du site vitrine de Doriane Zoko (6 blocs) avec HeroUI v3, une charte définie dans `app/globals.css` et des micro-animations douces.

**Architecture:** Next.js 16 App Router, Server Components par défaut, contenu centralisé dans `lib/content.ts`, sections découpées dans `components/sections`, primitives dans `components/ui`. HeroUI fournit Button/Card/Chip/Accordion/Tabs ; ses variables CSS sont mappées sur les tokens de marque dans `globals.css`. Les animations d'apparition sont en CSS pur.

**Tech Stack:** Next.js 16.4.0, React 19.3, Tailwind v4, `@heroui/react` + `@heroui/styles` 3.2.6, Geist (`next/font/google`), pnpm.

## Global Constraints

- Spec : `docs/superpowers/specs/2026-10-11-site-doriane-zoko-design.md`. Toute tâche la respecte.
- `AGENTS.md` : cette version de Next.js a des changements majeurs ; lire `node_modules/next/dist/docs/` avant d'écrire du code Next, respecter les dépréciations.
- La couleur `#D4FFF9` (toute casse, toute notation) ne doit apparaître nulle part dans le dépôt hors `docs/`.
- Palette : `#52837C`, `#97CFC7`, `#835745`, `#CFA897`, `#F7F5F1`, `#FFFFFF` (+ dérivés `#3E6761` et `#26332F` définis dans la spec).
- RPPS : `10111858667`. Tarif : `60 €`. Durée : `45 min`. URL Qare : `https://www.qare.fr/praticien/69fca90c4c4ffa002f7a3001?all=true&selectedSpeciality=psychologist&standardizedMotives=`.
- Police : Geist, repli Inter puis system-ui. Aucune serif. H1 48-56 px (mobile 36-42), H2 32-40 (mobile 28-32), H3 20-24, corps 16-17, petit 13-14, eyebrow 11-13.
- Max 6 blocs, 4 occurrences maximum du CTA principal (header, hero, bloc 4, bloc 6).
- Rayons : surfaces `rounded-3xl`, boutons/chips `rounded-full`. Transitions 200-400 ms. `prefers-reduced-motion` neutralise toute animation.
- Aucun contenu inventé : textes uniquement ceux de `lib/content.ts`. Liens légaux non cliquables.
- Pas d'autre dépendance que HeroUI et ses peers. Icônes en SVG inline.
- Pas de tests unitaires (site statique) : la vérification est `pnpm build`, `pnpm lint`, greps ciblés et contrôle visuel 390/768/1440 px.

## File Structure

| Fichier | Responsabilité |
|---|---|
| `app/globals.css` | Imports Tailwind + HeroUI, tokens de marque, mapping variables HeroUI, `@theme inline`, animations, utilitaires `reveal`/`surface` |
| `app/layout.tsx` | Police Geist, `lang="fr"`, metadata + Open Graph, `Header`/`Footer` |
| `app/page.tsx` | Assemblage des 6 blocs |
| `lib/content.ts` | Tous les textes et constantes |
| `components/ui/icons.tsx` | SVG inline (flèche, menu, croix, 4 icônes de situations, caméra, horloge, cadenas) |
| `components/ui/cta-link.tsx` | Lien Qare stylé en bouton HeroUI |
| `components/ui/portrait-frame.tsx` | Portrait ou placeholder dans forme arrondie |
| `components/ui/decor.tsx` | Halos flous décoratifs |
| `components/layout/header.tsx` | Header sticky + menu mobile (client) |
| `components/layout/footer.tsx` | Footer compact (inclus dans le bloc 6) |
| `components/sections/*.tsx` | Hero, Concerns, About, HowItWorks, FaqSection, FinalCta |

---

### Task 1: Baseline, installation HeroUI et spike d'API

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`
- Read-only: `node_modules/@heroui/*`, `node_modules/next/dist/docs/01-app/01-getting-started/{11-css,13-fonts,14-metadata-and-og-images}.md`

**Interfaces:**
- Produces : la décision `LINK_BUTTON` (classes BEM ou `buttonVariants`) utilisée par Task 4 ; la confirmation des noms de classes HeroUI.

- [ ] **Step 1: Build de référence avant toute modification**

Run: `pnpm install && pnpm build`
Expected: build OK. Si Tailwind ne se charge pas (le dépôt utilise `@tailwindcss/turbopack`), noter l'erreur et corriger la config Tailwind avant de continuer (lire `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`).

- [ ] **Step 2: Lire les docs Next locales utiles**

Run: `sed -n 1,200p node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` puis `08-caching.md` (section `cacheComponents`).
Expected: confirmer la forme de `export const metadata` et que `page.tsx` entièrement statique est compatible avec `cacheComponents: true`.

- [ ] **Step 3: Installer HeroUI**

Run: `pnpm add @heroui/react @heroui/styles`
Run: `pnpm ls react-aria react-aria-components @react-aria/ssr @react-aria/utils @internationalized/date`
Expected: les 5 peers résolus. S'il en manque : `pnpm add <peer manquant>`.

- [ ] **Step 4: Spike — lien stylé en bouton**

Run: `grep -rl "buttonVariants" node_modules/@heroui/styles/dist 2>/dev/null | head -3`
Run: `grep -o "\.button--[a-z-]*" -r node_modules/@heroui/styles/dist --include=*.css | sort -u | head -20`
Décision : si `buttonVariants` est exporté, `CtaLink` (Task 4) l'utilise ; sinon `CtaLink` applique les classes BEM `button button--primary button--lg` relevées. Noter la décision en commentaire de tête de `components/ui/cta-link.tsx` (une ligne).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add HeroUI v3"
```

---

### Task 2: Charte graphique et layout

**Files:**
- Modify: `app/globals.css` (réécriture complète), `app/layout.tsx`

**Interfaces:**
- Produces : classes Tailwind `bg-teal`, `bg-teal-deep`, `bg-aqua`, `bg-brown`, `bg-rose`, `bg-ivory`, `text-ink`, `text-brown`, `text-teal-deep` ; utilitaires `.surface`, `.reveal`, `.float-slow`, `.drift` ; `font-sans` = Geist.

- [ ] **Step 1: Réécrire `app/globals.css`**

```css
@import "tailwindcss";
@import "@heroui/styles";

:root {
  --brand-teal: #52837c;
  --brand-teal-deep: #3e6761;
  --brand-aqua: #97cfc7;
  --brand-brown: #835745;
  --brand-rose: #cfa897;
  --brand-ivory: #f7f5f1;
  --brand-white: #ffffff;
  --ink: #26332f;

  /* Mapping des variables HeroUI sur la charte */
  --background: var(--brand-ivory);
  --foreground: var(--ink);
  --surface: var(--brand-white);
  --surface-foreground: var(--ink);
  --overlay: var(--brand-white);
  --overlay-foreground: var(--ink);
  --accent: var(--brand-teal-deep);
  --accent-foreground: var(--brand-white);
  --muted: #5d6e69;
  --border: rgb(82 131 124 / 0.18);
  --separator: rgb(82 131 124 / 0.16);
  --focus: var(--brand-teal);
  --link: var(--brand-teal-deep);
  --radius: 1.25rem;
}

@theme inline {
  --font-sans: var(--font-geist-sans), "Inter", system-ui, sans-serif;
  --color-teal: var(--brand-teal);
  --color-teal-deep: var(--brand-teal-deep);
  --color-aqua: var(--brand-aqua);
  --color-brown: var(--brand-brown);
  --color-rose: var(--brand-rose);
  --color-ivory: var(--brand-ivory);
  --color-ink: var(--ink);
  --animate-float: float 7s ease-in-out infinite;
  --animate-drift: drift 22s ease-in-out infinite;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5.5rem;
}

body {
  background: var(--brand-ivory);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--brand-aqua);
  color: var(--ink);
}

:focus-visible {
  outline: 3px solid var(--brand-teal);
  outline-offset: 3px;
}

@utility surface {
  background: rgb(255 255 255 / 0.66);
  border: 1px solid rgb(82 131 124 / 0.14);
  border-radius: 1.75rem;
  box-shadow: 0 1px 2px rgb(38 51 47 / 0.04), 0 8px 24px rgb(38 51 47 / 0.05);
}

@utility eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-brown);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(24px, -18px, 0) scale(1.06); }
}

@keyframes reveal-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal-in 1ms linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 35%;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Réécrire `app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doriane Zoko — Psychologue clinicienne",
  description:
    "Consultations psychologiques individuelles en visioconférence avec Doriane Zoko, psychologue clinicienne : approche intégrative à dominante TCC et dimension interculturelle.",
  openGraph: {
    title: "Doriane Zoko — Psychologue clinicienne",
    description:
      "Des séances individuelles en visio, flexibles et sans jugement, pour un soutien ponctuel ou un accompagnement dans la durée.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = { themeColor: "#f7f5f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <Header />
        {children}
      </body>
    </html>
  );
}
```

Vérifier que l'alias `@/` existe dans `tsconfig.json` (`"paths": {"@/*": ["./*"]}`) ; sinon l'ajouter.

- [ ] **Step 3: Vérifier**

Run: `pnpm build`
Expected: échec attendu tant que `Header` n'existe pas (Task 5). Valider seulement que l'erreur porte sur l'import manquant, pas sur le CSS (`@heroui/styles` résolu).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx tsconfig.json
git commit -m "feat: brand tokens, HeroUI theme mapping and layout"
```

---

### Task 3: Contenu centralisé

**Files:**
- Create: `lib/content.ts`

**Interfaces:**
- Produces (utilisés par toutes les sections) : `QARE_URL`, `RPPS`, `PORTRAIT_SRC`, `nav`, `concerns`, `principles`, `steps`, `faqs`, `testimonials`, `legalLinks`.

- [ ] **Step 1: Créer `lib/content.ts`**

```ts
export const QARE_URL =
  "https://www.qare.fr/praticien/69fca90c4c4ffa002f7a3001?all=true&selectedSpeciality=psychologist&standardizedMotives=";
export const RPPS = "10111858667";
export const PORTRAIT_SRC: string | null = null;

export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "Qui suis-je ?", href: "#qui-suis-je" },
  { label: "Cadre et tarif", href: "#cadre-tarif" },
  { label: "FAQ", href: "#faq" },
] as const;

export const concerns = [
  { icon: "wave", title: "Stress ou anxiété", text: "Vous vous sentez souvent sous pression, envahi·e par vos pensées ou en difficulté pour retrouver votre calme." },
  { icon: "people", title: "Famille, couple ou travail", text: "Une relation, un changement ou une situation professionnelle prend beaucoup de place dans votre quotidien." },
  { icon: "spark", title: "Confiance en soi", text: "Vous doutez de vous, vous vous comparez beaucoup ou avez du mal à prendre votre place." },
  { icon: "heart", title: "Émotions", text: "Vous traversez une période où vos émotions semblent difficiles à comprendre, à accueillir ou à exprimer." },
] as const;

export const principles = [
  { id: "ecouter", label: "Écouter", text: "Créer un espace où vous pouvez déposer ce qui vous préoccupe, à votre rythme et sans jugement." },
  { id: "comprendre", label: "Comprendre", text: "Mettre du sens sur ce que vous vivez, en tenant compte de votre histoire et de votre environnement." },
  { id: "collaborer", label: "Collaborer", text: "Avancer ensemble, avec une démarche adaptée à vos besoins, vos ressources et vos objectifs." },
  { id: "reponses", label: "Trouver vos propres réponses", text: "Vous accompagner pour retrouver vos repères et construire des solutions qui vous ressemblent." },
] as const;

export const steps = [
  { title: "Parler à votre rythme", text: "Vous pouvez commencer par ce qui vous semble le plus important aujourd’hui." },
  { title: "Ne pas devoir savoir quoi dire", text: "Il n’est pas nécessaire d’avoir préparé votre séance ni de savoir par où commencer." },
  { title: "Faire le point ensemble", text: "Nous prenons le temps de comprendre ce qui vous amène et ce dont vous avez besoin." },
  { title: "Rester libre", text: "Vous êtes libre de poursuivre, d’espacer les séances ou de ne pas donner suite." },
] as const;

export const consultationFacts = [
  { icon: "clock", title: "45 min", text: "Durée approximative" },
  { icon: "camera", title: "En visio", text: "Téléphone, ordinateur ou tablette" },
  { icon: "lock", title: "Confidentiel", text: "Un cadre professionnel et sécurisé" },
] as const;

export const faqs = [
  { q: "Comment se déroule une séance en ligne ?", a: "Les séances se déroulent en visioconférence, via la plateforme sécurisée Qare. Vous vous connectez depuis l’endroit où vous vous sentez le plus à l’aise, avec un téléphone, une tablette ou un ordinateur." },
  { q: "Dois-je savoir exactement de quoi parler ?", a: "Non. Vous n’avez rien à préparer et il n’est pas nécessaire de savoir précisément par où commencer. Nous pouvons prendre le temps de faire le point ensemble." },
  { q: "Combien de temps dure une consultation ?", a: "Une consultation individuelle dure environ 45 minutes." },
  { q: "À quel rythme peut-on se voir ?", a: "Le rythme se construit ensemble selon votre situation, vos besoins et ce qui vous convient. Il peut évoluer au fil de l’accompagnement." },
  { q: "Les séances sont-elles confidentielles ?", a: "Oui. Les échanges s’inscrivent dans un cadre confidentiel et professionnel. La visioconférence se déroule via la plateforme sécurisée Qare." },
  { q: "Les consultations peuvent-elles être remboursées ?", a: "Certaines mutuelles proposent un remboursement des séances de psychologie. Vous pouvez vous rapprocher de votre mutuelle pour connaître les modalités de votre contrat." },
] as const;

export const testimonials = [
  "« J’ai trouvé un espace où je pouvais parler librement, sans avoir besoin de tout expliquer parfaitement. »",
  "« Les séances m’ont aidé·e à prendre du recul et à mieux comprendre ce que je traversais. »",
  "« Je me suis senti·e écouté·e avec beaucoup de douceur et de justesse. »",
] as const;

export const legalLinks = ["Mentions légales", "Politique de confidentialité", "Cookies"] as const;
```

- [ ] **Step 2: Vérifier les types**

Run: `pnpm exec tsc --noEmit`
Expected: aucune erreur dans `lib/content.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: centralize site content"
```

---

### Task 4: Primitives UI

**Files:**
- Create: `components/ui/icons.tsx`, `components/ui/cta-link.tsx`, `components/ui/portrait-frame.tsx`, `components/ui/decor.tsx`

**Interfaces:**
- Consumes: `QARE_URL`, `PORTRAIT_SRC` (Task 3).
- Produces:
  - `ArrowIcon`, `MenuIcon({open: boolean})`, `ConcernIcon({name: "wave"|"people"|"spark"|"heart"})`, `FactIcon({name: "clock"|"camera"|"lock"})` — tous acceptent `className?: string`, `aria-hidden`.
  - `CtaLink({children, href?: string, variant?: "primary"|"secondary"|"light", className?: string})` — `href` par défaut `QARE_URL` ; externe si `href` commence par `http`.
  - `PortraitFrame({className?: string})`.
  - `Decor({className?: string, tone: "aqua"|"rose"})`.

- [ ] **Step 1: `components/ui/icons.tsx`**

```tsx
type P = { className?: string };
const base = { "aria-hidden": true, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ArrowIcon({ className = "size-4" }: P) {
  return (
    <svg {...base} className={`${className} transition-transform duration-300 group-hover/cta:translate-x-1`}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ open, className = "size-6" }: P & { open: boolean }) {
  return (
    <svg {...base} className={className}>
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

const concernPaths = {
  wave: "M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3.3 3.1-5 7-5s7 1.7 7 5M17 11a2.5 2.5 0 1 0 0-5M18 15c2.4.4 4 1.7 4 4",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
} as const;

export function ConcernIcon({ name, className = "size-6" }: P & { name: keyof typeof concernPaths }) {
  return (
    <svg {...base} className={className}>
      <path d={concernPaths[name]} />
    </svg>
  );
}

const factPaths = {
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  camera: "M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8ZM15 10l6-3v10l-6-3",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5v-9Z",
} as const;

export function FactIcon({ name, className = "size-5" }: P & { name: keyof typeof factPaths }) {
  return (
    <svg {...base} className={className}>
      <path d={factPaths[name]} />
    </svg>
  );
}
```

- [ ] **Step 2: `components/ui/cta-link.tsx`**

Utiliser la décision du spike (Task 1, Step 4). Version classes BEM (à remplacer par `buttonVariants` si le spike l'a confirmé) :

```tsx
import { QARE_URL } from "@/lib/content";
import { ArrowIcon } from "./icons";

const variants = {
  primary: "button button--primary",
  secondary: "button button--secondary",
  light: "button bg-white text-teal-deep hover:bg-ivory",
} as const;

export function CtaLink({
  children,
  href = QARE_URL,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group/cta ${variants[variant]} inline-flex h-12 items-center gap-2 rounded-full px-6 text-base font-semibold transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <ArrowIcon />
      {external && <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>}
    </a>
  );
}
```

- [ ] **Step 3: `components/ui/decor.tsx`**

```tsx
export function Decor({ tone, className = "" }: { tone: "aqua" | "rose"; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 animate-drift rounded-full blur-3xl ${
        tone === "aqua" ? "bg-aqua/35" : "bg-rose/30"
      } ${className}`}
    />
  );
}
```

- [ ] **Step 4: `components/ui/portrait-frame.tsx`**

```tsx
import Image from "next/image";
import { PORTRAIT_SRC } from "@/lib/content";

export function PortraitFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-aqua/30 shadow-[0_20px_50px_rgb(38_51_47/0.10)] ${className}`}>
      {PORTRAIT_SRC ? (
        <Image
          src={PORTRAIT_SRC}
          alt="Portrait de Doriane Zoko, psychologue clinicienne"
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          priority
        />
      ) : (
        <div className="flex h-full min-h-72 flex-col items-center justify-center gap-2 bg-gradient-to-br from-aqua/40 to-rose/30 p-8 text-center">
          <span className="eyebrow">Portrait</span>
          <p className="text-lg font-medium text-ink">Photo de Doriane à ajouter</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Vérifier les types puis commit**

Run: `pnpm exec tsc --noEmit`
Expected: OK (les composants ne sont pas encore importés).

```bash
git add components/ui
git commit -m "feat: UI primitives (icons, CTA link, portrait, decor)"
```

---

### Task 5: Header et Footer

**Files:**
- Create: `components/layout/header.tsx`, `components/layout/footer.tsx`

**Interfaces:**
- Consumes: `nav`, `RPPS`, `legalLinks`, `QARE_URL` (Task 3) ; `CtaLink`, `MenuIcon` (Task 4).
- Produces: `Header()` (client), `Footer()` (serveur, rendu par `FinalCta` en Task 11).

- [ ] **Step 1: `components/layout/header.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { nav } from "@/lib/content";
import { CtaLink } from "@/components/ui/cta-link";
import { MenuIcon } from "@/components/ui/icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-teal/15 bg-ivory/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#accueil" onClick={close} className="flex flex-col leading-tight">
          <span className="text-base font-semibold text-ink">Doriane Zoko</span>
          <span className="text-xs text-brown">Psychologue clinicienne</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-ink/80 transition-colors duration-200 hover:bg-teal/10 hover:text-teal-deep">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink className="hidden h-10 px-5 text-sm sm:inline-flex">Prendre rendez-vous</CtaLink>
          <Button
            isIconOnly
            variant="secondary"
            className="rounded-full lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onPress={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </Button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        hidden={!open}
        className="mx-5 mb-4 rounded-3xl border border-teal/15 bg-white/90 p-4 shadow-lg backdrop-blur-md lg:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={close} className="block rounded-2xl px-4 py-3 text-base text-ink hover:bg-teal/10">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaLink className="mt-3 w-full justify-center" >Prendre rendez-vous</CtaLink>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: `components/layout/footer.tsx`**

```tsx
import { QARE_URL, RPPS, legalLinks, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-10 pt-10 text-sm text-ink/75 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-base font-semibold text-ink">Doriane Zoko</p>
          <p>Psychologue clinicienne</p>
          <p className="mt-2 text-xs">N° RPPS {RPPS} · Consultations via Qare</p>
        </div>
        <nav aria-label="Pied de page" className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-teal-deep">{item.label}</a>
          ))}
          <a href={QARE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-teal-deep">Rendez-vous via Qare</a>
        </nav>
      </div>
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-teal/15 pt-5 text-xs text-ink/60">
        {legalLinks.map((label) => <li key={label}>{label}</li>)}
      </ul>
    </footer>
  );
}
```

- [ ] **Step 3: Vérifier**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: OK. Si `Button` n'accepte pas `aria-expanded`/`aria-controls`, passer par `render={(props) => <button {...props} aria-expanded={open} aria-controls="menu-mobile" />}`.

- [ ] **Step 4: Commit**

```bash
git add components/layout
git commit -m "feat: sticky header with mobile menu and compact footer"
```

---

### Task 6: Bloc 1 — Hero

**Files:**
- Create: `components/sections/hero.tsx`

**Interfaces:**
- Consumes: `CtaLink`, `PortraitFrame`, `Decor`, `RPPS`.
- Produces: `Hero()`.

- [ ] **Step 1: Créer `components/sections/hero.tsx`**

```tsx
import { Chip } from "@heroui/react";
import { RPPS } from "@/lib/content";
import { CtaLink } from "@/components/ui/cta-link";
import { Decor } from "@/components/ui/decor";
import { PortraitFrame } from "@/components/ui/portrait-frame";

export function Hero() {
  return (
    <section id="accueil" className="relative isolate mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
      <Decor tone="aqua" className="-right-24 top-0 size-80 sm:size-[26rem]" />
      <Decor tone="rose" className="-left-20 bottom-0 size-64" />

      <div className="lg:col-span-7">
        <p className="eyebrow">Psychologue clinicienne en ligne · TCC &amp; approche interculturelle</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
          Un espace pour souffler.
        </h1>
        <p className="mt-5 max-w-xl text-[1.0625rem] text-ink/80 sm:text-lg">
          Des séances individuelles en visio, flexibles et sans jugement, pour un soutien ponctuel ou un accompagnement dans la durée.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <CtaLink>Prendre rendez-vous</CtaLink>
          <CtaLink href="#qui-suis-je" variant="secondary">Découvrir mon approche</CtaLink>
        </div>
        <p className="mt-8 text-sm text-ink/75">Consultations individuelles · 45 min · en visioconférence</p>
        <p className="mt-1 text-xs text-ink/60">N° RPPS {RPPS} · via la plateforme sécurisée Qare</p>
      </div>

      <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
        <PortraitFrame className="aspect-[4/5] w-full" />
        <Chip className="absolute -left-2 top-8 animate-float bg-white/85 shadow-md backdrop-blur sm:-left-6" variant="secondary">
          <span aria-hidden="true" className="mr-1 inline-block size-2 rounded-full bg-teal" />
          En visioconférence
        </Chip>
        <Chip className="absolute -right-2 bottom-10 animate-float bg-white/85 shadow-md backdrop-blur [animation-delay:-3s] sm:-right-5" variant="secondary">
          45 min
        </Chip>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Brancher temporairement dans `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Vérifier visuellement**

Run: `pnpm dev` puis ouvrir `http://localhost:3000` à 390, 768 et 1440 px (outil navigateur).
Expected: un seul H1, pas de débordement horizontal, chips visibles et flottantes, CTA lisibles.

- [ ] **Step 4: Commit**

```bash
git add components/sections/hero.tsx app/page.tsx
git commit -m "feat: hero section"
```

---

### Task 7: Bloc 2 — Situations

**Files:**
- Create: `components/sections/concerns.tsx`
- Modify: `app/page.tsx` (ajouter `<Concerns />` après `<Hero />`)

**Interfaces:**
- Consumes: `concerns` (Task 3), `ConcernIcon` (Task 4), HeroUI `Card`.
- Produces: `Concerns()`.

- [ ] **Step 1: Créer `components/sections/concerns.tsx`**

```tsx
import { Card } from "@heroui/react";
import { concerns } from "@/lib/content";
import { ConcernIcon } from "@/components/ui/icons";

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-12",
  "md:col-span-5",
  "md:col-span-7 md:mt-12",
];

export function Concerns() {
  return (
    <section id="situations" aria-labelledby="situations-titre" className="reveal mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Prendre le temps</p>
        <h2 id="situations-titre" className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
          Vous êtes peut-être au bon endroit si…
        </h2>
        <p className="mt-4 text-ink/80">
          Il n’est pas toujours facile de mettre des mots sur ce que l’on traverse. Il suffit parfois de sentir qu’il est temps de ne plus rester seul·e avec tout cela.
        </p>
      </div>

      <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {concerns.map((c, i) => (
          <li key={c.title} className={`min-w-[82%] snap-center sm:min-w-[60%] md:min-w-0 ${layout[i]}`}>
            <Card className="surface group h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:-rotate-1 hover:border-teal/40">
              <Card.Header>
                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-aqua/35 text-teal-deep transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <ConcernIcon name={c.icon} />
                </span>
                <Card.Title className="text-xl font-semibold">{c.title}</Card.Title>
                <Card.Description className="mt-2 text-base text-ink/75">{c.text}</Card.Description>
              </Card.Header>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Ajouter à `app/page.tsx`, vérifier visuellement 390/1440**

Expected: décalage vertical asymétrique en desktop, défilement horizontal accroché en mobile sans débordement de page.

- [ ] **Step 3: Commit**

```bash
git add components/sections/concerns.tsx app/page.tsx
git commit -m "feat: concerns section with asymmetric cards"
```

---

### Task 8: Bloc 3 — Mon approche

**Files:**
- Create: `components/sections/about.tsx`
- Modify: `app/page.tsx` (ajouter `<About />`)

**Interfaces:**
- Consumes: `principles`, `PortraitFrame`, `Decor`, HeroUI `Tabs`.
- Produces: `About()`.

- [ ] **Step 1: Créer `components/sections/about.tsx`**

```tsx
import { Tabs } from "@heroui/react";
import { principles } from "@/lib/content";
import { Decor } from "@/components/ui/decor";
import { PortraitFrame } from "@/components/ui/portrait-frame";
import { ArrowIcon } from "@/components/ui/icons";

export function About() {
  return (
    <section id="qui-suis-je" aria-labelledby="approche-titre" className="reveal relative isolate mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <Decor tone="aqua" className="right-0 top-10 size-72" />
      <div className="surface grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <PortraitFrame className="aspect-[4/5] w-full max-w-sm justify-self-center lg:col-span-4 lg:max-w-none" />

        <div className="lg:col-span-8">
          <p className="eyebrow">Qui suis-je ?</p>
          <h2 id="approche-titre" className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
            Une thérapie qui s’adapte à vous, pas l’inverse.
          </h2>
          <div className="mt-5 space-y-4 text-ink/85">
            <p>Je suis Doriane Zoko, psychologue clinicienne. Je vous reçois en visioconférence, où que vous soyez, dans un espace pensé pour vous permettre de parler librement.</p>
            <p>Mon approche est intégrative, à dominante TCC, avec une attention particulière portée à la dimension interculturelle de chaque histoire.</p>
            <p>Il n’y a pas de réponse toute faite. Nous construisons ensemble un accompagnement qui tient compte de vous, de votre rythme et de ce qui fait sens pour vous.</p>
          </div>
          <a href="#principes" className="group/cta mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-deep">
            Ma façon de vous accompagner <ArrowIcon />
          </a>

          <div id="principes" className="mt-8">
            <Tabs defaultSelectedKey={principles[0].id}>
              <Tabs.ListContainer>
                <Tabs.List aria-label="Mes principes d’accompagnement">
                  {principles.map((p, i) => (
                    <Tabs.Tab key={p.id} id={p.id}>
                      <span className="mr-1.5 text-xs text-brown">0{i + 1}</span>
                      {p.label}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
              {principles.map((p) => (
                <Tabs.Panel key={p.id} id={p.id} className="pt-4 text-ink/80">
                  {p.text}
                </Tabs.Panel>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
```

`Tabs` est un composant à état : si le build exige une frontière client, extraire le bloc `<Tabs>` dans `components/sections/principles-tabs.tsx` avec `"use client"` en première ligne et l'importer ici.

- [ ] **Step 2: Ajouter à `app/page.tsx` et vérifier visuellement**

Expected: onglets utilisables au clavier (flèches), bascule du panneau, onglets défilables sans débordement à 390 px.

- [ ] **Step 3: Commit**

```bash
git add components/sections/about.tsx app/page.tsx
git commit -m "feat: about section with principles tabs"
```

---

### Task 9: Bloc 4 — Comment ça fonctionne

**Files:**
- Create: `components/sections/how-it-works.tsx`
- Modify: `app/page.tsx` (ajouter `<HowItWorks />`)

**Interfaces:**
- Consumes: `steps`, `consultationFacts`, `CtaLink`, `FactIcon`, HeroUI `Card`.
- Produces: `HowItWorks()`.

- [ ] **Step 1: Créer `components/sections/how-it-works.tsx`**

```tsx
import { Card } from "@heroui/react";
import { consultationFacts, steps } from "@/lib/content";
import { CtaLink } from "@/components/ui/cta-link";
import { FactIcon } from "@/components/ui/icons";

export function HowItWorks() {
  return (
    <section id="cadre-tarif" aria-labelledby="seance-titre" className="reveal mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Cadre et tarif</p>
        <h2 id="seance-titre" className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
          Votre première séance, simplement.
        </h2>
        <p className="mt-3 text-lg text-brown">Vous n’avez rien à préparer.</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <Card className="surface rounded-3xl p-6 lg:col-span-7">
          <Card.Header>
            <Card.Title className="text-xl font-semibold">Première séance</Card.Title>
          </Card.Header>
          <Card.Content>
            <ol className="mt-2 grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-rose/40 text-xs font-semibold text-brown">{i + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl bg-aqua/25 p-4 text-sm text-ink/85">
              L’objectif est simplement que vous vous sentiez en confiance avant d’aller plus loin.
            </p>
          </Card.Content>
        </Card>

        <div className="grid gap-5 lg:col-span-5">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {consultationFacts.map((f) => (
              <li key={f.title} className="surface group rounded-3xl p-4 transition duration-300 hover:-translate-y-1">
                <span className="mb-2 inline-flex size-9 items-center justify-center rounded-xl bg-aqua/35 text-teal-deep transition-transform duration-300 group-hover:scale-110">
                  <FactIcon name={f.icon} />
                </span>
                <p className="text-base font-semibold">{f.title}</p>
                <p className="text-xs text-ink/70">{f.text}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-3xl bg-teal-deep p-6 text-white shadow-[0_20px_40px_rgb(62_103_97/0.25)]">
            <p className="text-5xl font-semibold tracking-tight">60 €</p>
            <p className="mt-2 text-sm text-white/90">Environ 45 minutes · individuel et en ligne</p>
            <p className="mt-4 text-sm text-white/85">Certaines mutuelles proposent un remboursement des séances de psychologie.</p>
            <CtaLink variant="light" className="mt-5">Prendre rendez-vous</CtaLink>
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-3xl border border-teal/15 bg-white/50 p-5 text-sm text-ink/80">
        <strong className="font-semibold text-ink">Pour votre séance :</strong> un appareil avec caméra et micro, ainsi qu’une connexion internet stable. La visioconférence permet de vous installer dans un lieu où vous vous sentez à l’aise, dans un cadre confidentiel et professionnel.
      </p>
    </section>
  );
}
```

Le texte blanc de la carte tarif est posé sur `#3E6761` (6,3:1), conforme à la règle de contraste.

- [ ] **Step 2: Ajouter à `app/page.tsx` et vérifier 390/768/1440**

Expected: carte tarif lisible, trois mini-cartes sans débordement, un seul CTA dans ce bloc.

- [ ] **Step 3: Commit**

```bash
git add components/sections/how-it-works.tsx app/page.tsx
git commit -m "feat: how-it-works bento section with price"
```

---

### Task 10: Bloc 5 — FAQ, réassurance et témoignages

**Files:**
- Create: `components/sections/faq-section.tsx`
- Modify: `app/page.tsx` (ajouter `<FaqSection />`)

**Interfaces:**
- Consumes: `faqs`, `testimonials`, `RPPS`, HeroUI `Accordion`, `Card`.
- Produces: `FaqSection()`.

- [ ] **Step 1: Créer `components/sections/faq-section.tsx`**

```tsx
import { Accordion } from "@heroui/react";
import { RPPS, faqs, testimonials } from "@/lib/content";

export function FaqSection() {
  const [main, ...others] = testimonials;
  return (
    <section id="faq" aria-labelledby="faq-titre" className="reveal mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-titre" className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
          Vos questions sur la thérapie en ligne
        </h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="surface rounded-3xl p-2 sm:p-4 lg:col-span-8">
          <Accordion defaultExpandedKeys={["q0"]}>
            {faqs.map((f, i) => (
              <Accordion.Item key={f.q} id={`q${i}`}>
                <Accordion.Heading>
                  <Accordion.Trigger className="text-left text-base font-medium">
                    {f.q}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="text-ink/80">{f.a}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <aside aria-label="Cadre et confidentialité" className="rounded-3xl border border-teal/15 bg-aqua/20 p-6 lg:col-span-4">
          <p className="eyebrow">En confiance</p>
          <ul className="mt-4 space-y-3 text-sm text-ink/85">
            <li>Un cadre confidentiel et professionnel.</li>
            <li>Visioconférence via la plateforme sécurisée Qare.</li>
            <li>N° RPPS {RPPS}.</li>
          </ul>
        </aside>
      </div>

      <div className="mt-14">
        <h3 className="text-2xl font-semibold tracking-tight">Ce que cet espace peut permettre.</h3>
        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <figure className="surface rounded-3xl p-7 lg:col-span-7">
            <blockquote className="text-xl font-medium leading-relaxed text-ink">{main}</blockquote>
          </figure>
          <div className="grid gap-5 lg:col-span-5">
            {others.map((q) => (
              <figure key={q} className="surface rounded-3xl p-5 transition duration-300 hover:-translate-y-1">
                <blockquote className="text-base text-ink/85">{q}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ajouter à `app/page.tsx` et vérifier**

Expected: ouverture douce (hauteur/opacité) native HeroUI, navigation clavier (Tab, Entrée/Espace), chevron animé, citations sans nom ni note.

- [ ] **Step 3: Commit**

```bash
git add components/sections/faq-section.tsx app/page.tsx
git commit -m "feat: FAQ accordion, reassurance card and testimonials"
```

---

### Task 11: Bloc 6 — CTA final, footer et assemblage

**Files:**
- Create: `components/sections/final-cta.tsx`
- Modify: `app/page.tsx` (version finale)

**Interfaces:**
- Consumes: `CtaLink`, `Decor`, `Footer` (Task 5).
- Produces: `FinalCta()` (inclut le footer).

- [ ] **Step 1: Créer `components/sections/final-cta.tsx`**

```tsx
import { CtaLink } from "@/components/ui/cta-link";
import { Footer } from "@/components/layout/footer";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-titre" className="mx-auto max-w-6xl px-5 pb-6 pt-12 lg:px-8 lg:pt-20">
      <div className="reveal relative isolate overflow-hidden rounded-[2rem] bg-teal-deep px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-64 animate-drift rounded-full bg-aqua/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-20 -left-10 -z-10 size-64 animate-drift rounded-full bg-rose/25 blur-3xl [animation-delay:-8s]" />
        <h2 id="cta-titre" className="mx-auto max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
          Vous n’avez pas besoin d’avoir toutes les réponses pour commencer.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/90">
          Si vous vous sentez bloqué·e, épuisé·e ou avez l’impression de ne plus avancer, nous pouvons prendre le temps d’en parler.
        </p>
        <CtaLink variant="light" className="mt-7">Prendre rendez-vous</CtaLink>
        <p className="mt-5 text-sm text-white/85">Vous restez totalement libre de continuer, d’espacer, ou de ne pas donner suite.</p>
      </div>
      <Footer />
    </section>
  );
}
```

- [ ] **Step 2: Version finale de `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/hero";
import { Concerns } from "@/components/sections/concerns";
import { About } from "@/components/sections/about";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Concerns />
      <About />
      <HowItWorks />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
```

- [ ] **Step 3: Supprimer les assets du template**

```bash
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/final-cta.tsx app/page.tsx
git commit -m "feat: final CTA with footer and full page assembly"
```

---

### Task 12: Vérification finale

**Files:** aucun (corrections ponctuelles dans les fichiers concernés si nécessaire).

- [ ] **Step 1: Build et lint**

Run: `pnpm build && pnpm lint`
Expected: aucune erreur ; la route `/` est statique.

- [ ] **Step 2: Contrôles par grep**

Run: `grep -rniE "d4fff9" app components lib public` → Expected: aucune sortie.
Run: `grep -rn "10111858667" app components lib` → Expected: `lib/content.ts` uniquement.
Run: `grep -rniE "serif|Arial|dark:" app components lib` → Expected: aucune sortie.
Run: `grep -rc "<CtaLink" components/sections components/layout | grep -v ":0"` → Expected: header (2 : desktop + menu mobile, un seul visible à la fois), hero (1 primaire + 1 ancre secondaire), how-it-works (1), final-cta (1) ; aucun autre.

- [ ] **Step 3: Contrôle visuel responsive**

Avec `pnpm dev` et l'outil navigateur, capturer 390, 768 et 1440 px. Vérifier : aucun overflow horizontal (`document.documentElement.scrollWidth <= window.innerWidth`), aucun texte coupé, cibles tactiles ≥ 44 px, un seul H1, 6 blocs seulement, cohérence des rayons (`rounded-3xl` surfaces, `rounded-full` boutons/chips), transitions 200-400 ms.

- [ ] **Step 4: Accessibilité et mouvement**

Navigation clavier complète (header, menu mobile, onglets, accordéon), focus visible partout. Avec l'émulation `prefers-reduced-motion: reduce`, vérifier que les halos, chips flottantes et apparitions sont figés.

- [ ] **Step 5: Contraste**

Vérifier : texte blanc sur `#3E6761` (6,3:1), texte `#26332F` sur ivoire, `#835745` sur ivoire (5,6:1), aucun texte courant directement sur `#52837C`.

- [ ] **Step 6: Commit des corrections éventuelles**

```bash
git add -A app components lib
git commit -m "fix: QA adjustments"
```

---

## Self-Review

- **Couverture de la spec :** charte et mapping HeroUI (Task 2), contenu et témoignages (3, 10), Hero (6), Situations (7), Approche + 4 principes (8), Comment ça fonctionne + tarif + prérequis (9), FAQ + réassurance (10), CTA final + footer compact (11), header sticky + menu mobile (5), SEO/metadata (2), accessibilité et reduced-motion (2, 12), `#D4FFF9` interdit (12), RPPS `10111858667` (3, 12), HeroUI installé (1). Aucun écart.
- **Placeholders :** aucun. Seules deux branches conditionnelles concrètes sont prévues (classes BEM vs `buttonVariants` ; frontière `"use client"` pour Tabs), avec le code des deux cas ou la marche à suivre.
- **Cohérence des noms :** `CtaLink` (props `variant: "primary" | "secondary" | "light"`, `href`, `className`), `PortraitFrame`, `Decor({tone})`, `ConcernIcon`/`FactIcon` (`name`), constantes de `lib/content.ts` : tous alignés entre tâches. `Header` importé par `layout.tsx` (Task 2) et créé en Task 5.
- **Risque connu :** les noms de classes BEM `button--primary`/`button--secondary` sont à confirmer au spike (Task 1, Step 4) ; ajuster `variants` dans `cta-link.tsx` en conséquence.
