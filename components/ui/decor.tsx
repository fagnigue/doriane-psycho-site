export function Decor({ tone, className = "" }: { tone: "aqua" | "rose"; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 animate-drift rounded-full blur-3xl ${
        tone === "aqua" ? "bg-aqua/35" : "bg-rose/30"
      } ${className}`}
    />
  );
}
