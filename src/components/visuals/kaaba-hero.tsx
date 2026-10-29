/**
 * Decorative illustration: the Ka'bah under an arch, with a geometric star pattern.
 * Purely illustrative (not a photograph).
 */
export function KaabaHero({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label={label} className={className}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#043D31" />
          <stop offset="1" stopColor="#075E45" />
        </linearGradient>
        <pattern id="stars" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M16 3 19.8 12.2 29 16 19.8 19.8 16 29 12.2 19.8 3 16 12.2 12.2Z"
            fill="none"
            stroke="#C5A46D"
            strokeOpacity=".22"
          />
        </pattern>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8864d" />
          <stop offset=".5" stopColor="#e6cf9c" />
          <stop offset="1" stopColor="#a8864d" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sky)" />
      <rect width="320" height="220" fill="url(#stars)" />
      {/* Arch */}
      <path d="M60 220V110a100 100 0 0 1 200 0v110" fill="none" stroke="url(#gold)" strokeWidth="3" />
      <path d="M74 220V112a86 86 0 0 1 172 0v108" fill="#F8F6F1" fillOpacity=".06" stroke="#C5A46D" strokeOpacity=".4" />
      {/* Mataf ellipse */}
      <ellipse cx="160" cy="192" rx="92" ry="16" fill="#F8F6F1" fillOpacity=".12" />
      <ellipse cx="160" cy="192" rx="70" ry="11" fill="none" stroke="#F8F6F1" strokeOpacity=".25" strokeDasharray="3 5" />
      {/* Ka'bah */}
      <path d="M116 112 160 96l44 16v68l-44 14-44-14Z" fill="#0d0d0d" />
      <path d="M160 128v66" stroke="#262626" />
      <path d="M116 112 160 128l44-16" fill="none" stroke="#262626" />
      <path d="M116 124 160 140l44-16" fill="none" stroke="url(#gold)" strokeWidth="5" />
      <rect x="168" y="150" width="12" height="22" fill="url(#gold)" transform="skewY(-20) translate(0 62)" opacity=".85" />
      {/* Crescent */}
      <path d="M160 28a14 14 0 1 0 10 24 11 11 0 1 1-10-24Z" fill="#C5A46D" />
    </svg>
  );
}
