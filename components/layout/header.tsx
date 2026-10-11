"use client";

import { useState } from "react";
import Image from "next/image";
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
        <a href="#accueil" onClick={close} className="flex items-center gap-2 leading-tight">
          <Image src="/logo.jpg" alt="Logo Doriane Zoko" width={40} height={40} className="rounded-full" />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-brown">Doriane Zoko</span>
            <span className="text-xs text-ink/70">Psychologue clinicienne</span>
          </div>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-ink/80 transition-colors duration-200 hover:bg-rose/30 hover:text-brown"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink className="hidden h-10 px-5 text-sm sm:inline-flex">Prendre rendez-vous</CtaLink>
          <Button
            isIconOnly
            variant="secondary" 
            className="rounded-full text-brown lg:hidden"
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
              <a href={item.href} onClick={close} className="block rounded-2xl px-4 py-3 text-base text-ink hover:bg-rose/30">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaLink className="mt-3 w-full justify-center">Prendre rendez-vous</CtaLink>
      </nav>
    </header>
  );
}
