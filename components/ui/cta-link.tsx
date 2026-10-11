import { QARE_URL } from "@/lib/content";
import { ArrowIcon } from "./icons";

const variants = {
  primary: "button button--primary",
  secondary: "button button--secondary",
  light: "button bg-white text-teal-deep hover:bg-ivory",
} as const;

export function CtaLink({
  children,
  href = QARE_URL,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group/cta ${variants[variant]} inline-flex h-12 items-center gap-2 rounded-full px-6 text-base font-semibold transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <ArrowIcon />
      {external && <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>}
    </a>
  );
}
