interface IconProps {
  className?: string;
}

export function PortsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x="4" y="9" width="16" height="9" rx="2" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
