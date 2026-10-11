import { QARE_URL } from "@/lib/content";
import { Decor } from "@/components/ui/decor";
import { PortraitFrame } from "@/components/ui/portrait-frame";
import { ArrowIcon } from "@/components/ui/icons";

export function About() {
  return (
    <section id="qui-suis-je" aria-labelledby="approche-titre" className="reveal relative isolate mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-14">
      <Decor tone="aqua" className="right-0 top-10 size-72" />
      <div className="surface grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <PortraitFrame className="aspect-4/5 w-full max-w-sm justify-self-center lg:col-span-4 lg:max-w-none" />

        <div className="min-w-0 lg:col-span-8">
          <p className="eyebrow">Qui suis-je ?</p>
          <h2 id="approche-titre" className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-brown sm:text-4xl">
            Une thérapie qui s&apos;adapte à vous, pas l&apos;inverse.
          </h2>
          <div className="mt-5 space-y-4 text-ink/85">
            <p>Je suis Doriane Zoko, <strong>psychologue clinicienne</strong>. Je vous reçois en <strong>visioconférence</strong>, où que vous soyez.</p>
            <p>Mon approche est <strong>intégrative à dominante TCC</strong>, avec une attention particulière portée à la <strong>dimension interculturelle</strong>.</p>
            <p>Je ne viens pas avec des réponses toutes faites. Je vous accompagne pour que vous trouviez les vôtres. Mon rôle ? Créer <strong>un espace sûr, sans jugement</strong>, où vous pouvez poser les choses telles que vous les ressentez.</p>
            <p>Pour moi, la démarche thérapeutique est avant tout une <strong>collaboration</strong>: c&apos;est dans cette alliance que le changement devient possible.</p>
          </div>
          <a href={QARE_URL} className="group/cta mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brown">
            Chaque personne est unique, et mon accompagnement l&apos;est aussi. <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
