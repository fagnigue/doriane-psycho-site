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
        <div className="flex h-full min-h-72 flex-col items-center justify-center gap-2 bg-linear-to-br from-aqua/40 to-rose/30 p-8 text-center">
          <span className="eyebrow">Portrait</span>
          <p className="text-lg font-medium text-ink">Photo de Doriane à ajouter</p>
        </div>
      )}
    </div>
  );
}
