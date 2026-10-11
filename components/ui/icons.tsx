type P = { className?: string };
const base = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowIcon({ className = "size-4" }: P) {
  return (
    <svg {...base} className={`${className} transition-transform duration-300 group-hover/cta:translate-x-1`}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ open, className = "size-6" }: P & { open: boolean }) {
  return (
    <svg {...base} className={className}>
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

const concernPaths = {
  wave: "M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3.3 3.1-5 7-5s7 1.7 7 5M17 11a2.5 2.5 0 1 0 0-5M18 15c2.4.4 4 1.7 4 4",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
} as const;

export function ConcernIcon({ name, className = "size-6" }: P & { name: keyof typeof concernPaths }) {
  return (
    <svg {...base} className={className}>
      <path d={concernPaths[name]} />
    </svg>
  );
}

const factPaths = {
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  camera: "M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8ZM15 10l6-3v10l-6-3",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5v-9Z",
} as const;

export function FactIcon({ name, className = "size-5" }: P & { name: keyof typeof factPaths }) {
  return (
    <svg {...base} className={className}>
      <path d={factPaths[name]} />
    </svg>
  );
}
