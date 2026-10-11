import { Chip } from "@heroui/react";
import { RPPS } from "@/lib/content";
import { CtaLink } from "@/components/ui/cta-link";
import { Decor } from "@/components/ui/decor";
import { PortraitFrame } from "@/components/ui/portrait-frame";

const floatingWords = [
  { label: "Écouter", position: "-left-2 top-10 sm:-left-8" },
  { label: "Comprendre", position: "-right-2 bottom-20 [animation-delay:-2.5s] sm:-right-8" },
  { label: "Collaborer", position: "-left-2 top-2/3 [animation-delay:-5s] sm:-left-6" },
  { label: "En visioconférence", position: "-right-2 top-20 [animation-delay:-3s] sm:-right-5" },
] as const;

export function Hero() {
  return (
    <section id="accueil" className="relative isolate mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
      <Decor tone="aqua" className="-right-24 top-0 size-80 sm:size-104" />
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
        <PortraitFrame className="aspect-4/5 w-full" />
        {floatingWords.map((w) => (
          <Chip key={w.label} className={`absolute animate-float bg-white/85 text-base font-semibold text-brown shadow-md backdrop-blur ${w.position}`} variant="secondary">
            <span aria-hidden="true" className="mr-1 inline-block size-2 rounded-full bg-rose" />
            {w.label}
          </Chip>
        ))}
      </div>
    </section>
  );
}
