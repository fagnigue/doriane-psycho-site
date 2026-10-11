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

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="surface min-w-0 rounded-3xl p-2 sm:p-4 lg:col-span-8">
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
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
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
