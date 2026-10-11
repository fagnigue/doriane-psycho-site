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
            <a key={item.href} href={item.href} className="transition-colors hover:text-brown">
              {item.label}
            </a>
          ))}
          <a href={QARE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-brown">
            Rendez-vous via Qare
          </a>
        </nav>
      </div>
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-teal/15 pt-5 text-xs text-ink/60">
        {legalLinks.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </footer>
  );
}
