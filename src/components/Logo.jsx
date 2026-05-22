import { useId } from 'react'

export function Logo({ size = 40 }) {
  const gid = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden className="logo-svg">
      <rect width="40" height="40" rx="10" fill={`url(#se-logo-${gid})`} />
      <path
        d="M14 26V14h5.2c2.9 0 4.8 1.5 4.8 4 0 2.5-2 4.1-4.9 4.1h-2.4V26H14zm4.3-7.2c1.3 0 2-.6 2-1.7 0-1.1-.7-1.7-2-1.7h-1.3v3.4h1.3z"
        fill="white"
      />
      <defs>
        <linearGradient id={`se-logo-${gid}`} x1="8" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--logo-start, #10b981)" />
          <stop offset="1" stopColor="var(--logo-end, #059669)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
