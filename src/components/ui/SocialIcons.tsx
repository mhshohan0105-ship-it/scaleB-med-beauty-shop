// Brand glyphs drawn inline (lucide no longer ships brand icons).
const icons = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.6l.4-3h-3V6.8c0-.5.4-.8.8-.8H15Z" />,
  X: (
    <>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5v5l4.5-2.5Z" fill="currentColor" />
    </>
  ),
} as const;

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={className ?? "flex gap-3"}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
        <li key={name}>
          <a
            href="#"
            aria-label={`scaleB on ${name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mint-400 hover:text-navy-900"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icons[name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
