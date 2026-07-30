import type { SVGProps } from "react";
import type { IconName } from "@/content/schema";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconPhone(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 3h3l1.5 4-2 1.4a12.5 12.5 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

export function IconWhatsapp(p: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.8 9.8 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.89-6.96A9.77 9.77 0 0 0 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.82-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.36c0-4.5 3.68-8.17 8.2-8.17a8.13 8.13 0 0 1 5.78 2.4 8.1 8.1 0 0 1 2.39 5.78c0 4.51-3.67 8.19-8.18 8.19Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.97-1.21 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.05-.31-.02-.44-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04s.88 2.37 1 2.53c.13.16 1.73 2.64 4.2 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.18-.47-.3Z" />
    </svg>
  );
}

export function IconMail(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6.5 9 6 9-6" />
    </svg>
  );
}

export function IconFacebook(p: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function IconInstagram(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPin(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function IconArrow(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconMenu(p: Props) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(p: Props) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlus(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* --- iconuri pentru secțiunea „De ce noi" --- */

function IconWhistle(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M14.5 8.5H21l-1.5 3 1.5 3h-6.5" />
      <circle cx="8.5" cy="11.5" r="5.5" />
      <path d="M8.5 9v2.5" />
    </svg>
  );
}

function IconTrophy(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5v1.8A3 3 0 0 0 7 10.2M17 5.5h2.5v1.8A3 3 0 0 1 17 10.2" />
      <path d="M12 14v3.5M8.5 20h7M9.5 17.5h5V20h-5z" />
    </svg>
  );
}

function IconPath(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="5.5" r="2.5" />
      <path d="M8 18.5h5.5a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6" />
    </svg>
  );
}

function IconHeart(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3c0 5-7.5 9.6-7.5 9.6Z" />
    </svg>
  );
}

function IconShield(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.6 7 9.8 4.1-2.2 7-5.5 7-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </svg>
  );
}

function IconUsers(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2M17.5 14.6a5.5 5.5 0 0 1 3 4.9" />
    </svg>
  );
}

const valueIcons: Record<IconName, (p: Props) => React.ReactElement> = {
  whistle: IconWhistle,
  trophy: IconTrophy,
  path: IconPath,
  heart: IconHeart,
  shield: IconShield,
  users: IconUsers,
};

export function ValueIcon({ name, ...rest }: Props & { name: IconName }) {
  const Cmp = valueIcons[name];
  return <Cmp {...rest} />;
}
