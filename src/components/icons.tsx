/** Inline icon set — no icon library, no extra request. */

type IconProps = { className?: string };

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1l-2.22 2.3Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01a9.9 9.9 0 0 0 9.94-9.9A9.9 9.9 0 0 0 12.04 2Zm5.8 14.05c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.23-3.3-.7-2.78-1.1-4.54-3.95-4.68-4.14-.13-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.02.96-2.29a1 1 0 0 1 .73-.34h.52c.17 0 .4-.06.62.48.24.57.8 1.98.87 2.13.07.14.11.31.02.5-.09.19-.14.31-.28.47l-.4.47c-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.2 1.36.28.13.44.11.6-.07.17-.19.71-.83.9-1.11.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.13.46.2.53.31.07.12.07.67-.17 1.35Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function GridIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

export function ListIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function HomeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3.5 10.2 12 3.5l8.5 6.7V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.8Z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function WorkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.75" y="6.75" width="14.5" height="11.5" rx="1.5" />
      <path d="M6 6.75V5.5a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 1.5 1.5v9.75" />
      <path d="m3.5 15.5 3.75-3.25 3 2.5 2.5-2 4.5 3.75" />
    </svg>
  );
}

export function InfoIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.75h.01" />
    </svg>
  );
}

export function ChatIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.5 12.4c0 4-3.8 7.2-8.5 7.2a9.9 9.9 0 0 1-2.6-.34L4 21l1.3-3.6a6.9 6.9 0 0 1-1.8-4.6c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
    </svg>
  );
}
