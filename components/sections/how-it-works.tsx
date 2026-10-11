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

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="surface rounded-3xl p-6 lg:col-span-7">
          <Card.Header>
            <Card.Title className="text-xl font-semibold">Première séance</Card.Title>
          </Card.Header>
          <Card.Content>
            <ol className="mt-2 grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-rose/40 text-xs font-semibold text-brown">
                    {i + 1}
                  </span>
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

        <div className="grid min-w-0 gap-5 lg:col-span-5">
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
