// GymIcons.jsx
// Original, simple SVG icons (dumbbell, barbell, flexed arm) - no external
// images needed, so the app works offline and there's nothing to attribute.

export function DumbbellIcon({ size = 32, color = '#ef4444' }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 100 40" fill="none">
      <rect x="2" y="8" width="14" height="24" rx="3" fill={color} />
      <rect x="16" y="15" width="8" height="10" fill={color} />
      <rect x="24" y="17" width="52" height="6" rx="2" fill={color} />
      <rect x="76" y="15" width="8" height="10" fill={color} />
      <rect x="84" y="8" width="14" height="24" rx="3" fill={color} />
    </svg>
  );
}

export function BarbellIcon({ size = 48, color = '#ef4444' }) {
  return (
    <svg width={size} height={size * 0.3} viewBox="0 0 160 48" fill="none">
      <rect x="0" y="10" width="10" height="28" rx="2" fill={color} />
      <rect x="10" y="16" width="8" height="16" rx="1" fill={color} opacity="0.8" />
      <rect x="18" y="20" width="6" height="8" fill={color} opacity="0.6" />
      <rect x="24" y="22" width="112" height="4" fill={color} />
      <rect x="136" y="20" width="6" height="8" fill={color} opacity="0.6" />
      <rect x="142" y="16" width="8" height="16" rx="1" fill={color} opacity="0.8" />
      <rect x="150" y="10" width="10" height="28" rx="2" fill={color} />
    </svg>
  );
}

export function MuscleIcon({ size = 32, color = '#ef4444' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M20 85 C15 70 15 55 22 45 C18 35 22 20 35 15 C45 11 55 13 60 20 C68 18 78 22 82 32 C86 42 82 52 74 55 C78 62 76 72 68 78 C58 86 40 88 20 85 Z"
        fill={color}
      />
      <circle cx="60" cy="30" r="6" fill="#000" opacity="0.15" />
    </svg>
  );
}
