import { CtaLink } from "@/components/ui/cta-link";
import { Footer } from "@/components/layout/footer";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-titre" className="mx-auto max-w-6xl px-5 pb-4 pt-8 lg:px-8 lg:pt-14">
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
