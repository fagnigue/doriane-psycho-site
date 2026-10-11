import { Card } from "@heroui/react";
import { concerns } from "@/lib/content";
import { ConcernIcon } from "@/components/ui/icons";

const layout = ["md:col-span-7", "md:col-span-5 md:mt-12", "md:col-span-5", "md:col-span-7 md:mt-12"];

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
