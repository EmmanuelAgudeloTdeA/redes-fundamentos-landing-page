interface IconProps {
  className?: string;
}

export function ProtocolsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h11a4 4 0 0 1 4 4v1" />
      <path d="M16 21l4-4-4-4" />
      <path d="M20 17H9a4 4 0 0 1-4-4v-1" />
    </svg>
  );
}
