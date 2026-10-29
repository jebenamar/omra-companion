/** Small stylised Ka'bah used as the app mark (decorative). */
export function KaabaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <rect width="48" height="48" rx="12" fill="#075E45" />
      <path d="M12 18 24 12l12 6v16l-12 6-12-6Z" fill="#111" />
      <path d="M12 18 24 24l12-6" fill="none" stroke="#2a2a2a" strokeWidth="1" />
      <path d="M24 24v16" stroke="#2a2a2a" strokeWidth="1" />
      <path d="M12 21.5 24 27.5l12-6" fill="none" stroke="#C5A46D" strokeWidth="2.2" />
    </svg>
  );
}
