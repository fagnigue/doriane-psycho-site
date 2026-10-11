import { Tabs } from "@heroui/react";
import { principles } from "@/lib/content";
import { Decor } from "@/components/ui/decor";
import { PortraitFrame } from "@/components/ui/portrait-frame";
import { ArrowIcon } from "@/components/ui/icons";

export function About() {
  return (
    <section id="qui-suis-je" aria-labelledby="approche-titre" className="reveal relative isolate mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <Decor tone="aqua" className="right-0 top-10 size-72" />
      <div className="surface grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <PortraitFrame className="aspect-[4/5] w-full max-w-sm justify-self-center lg:col-span-4 lg:max-w-none" />

        <div className="min-w-0 lg:col-span-8">
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
              <Tabs.ListContainer className="overflow-x-auto">
                <Tabs.List aria-label="Mes principes d’accompagnement">
                  {principles.map((p, i) => (
                    <Tabs.Tab key={p.id} id={p.id} className="shrink-0 whitespace-nowrap">
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
