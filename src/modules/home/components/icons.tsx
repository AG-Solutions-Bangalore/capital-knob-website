/**
 * Centralised line-icon set for the home page.
 * Single source of truth — every section pulls icons from here so the visual
 * language stays consistent.
 *
 * Style notes (used to match the design):
 *   - 1.75 stroke, round caps + joins
 *   - 24x24 viewBox, renders crisply at 16/20/24/32 px
 *   - `currentColor` everywhere so hover states work via Tailwind text-*
 */

/* eslint-disable react-refresh/only-export-components */

import type { ReactNode, SVGProps } from 'react'
import type { IconKey } from '../constants'

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

function makeIcon(path: ReactNode) {
  return ({ size = 24, ...rest }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  )
}

/* -------------------- service / nav icons -------------------- */

export const HomeIcon = makeIcon(
  <>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </>,
)

export const RefreshIcon = makeIcon(
  <>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </>,
)

export const StackIcon = makeIcon(
  <>
    <ellipse cx="12" cy="6" rx="8" ry="2.5" />
    <path d="M4 6v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V6" />
    <path d="M4 12v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
  </>,
)

export const CraneIcon = makeIcon(
  <>
    <path d="M4 21V8h6" />
    <path d="M10 8V4h6v4" />
    <path d="M16 8h4l-1 13" />
    <path d="M10 14h6" />
    <path d="M3 21h18" />
  </>,
)

export const ToolsIcon = makeIcon(
  <>
    <path d="m14.7 6.3 3 3-9 9-3-3z" />
    <path d="m17.7 9.3 2.3-2.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-2.3 2.3" />
    <path d="m5.7 18.3-1.7 1.7" />
  </>,
)

export const DocumentIcon = makeIcon(
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </>,
)

export const ChartIcon = makeIcon(
  <>
    <path d="M4 20V8" />
    <path d="M10 20V4" />
    <path d="M16 20v-7" />
    <path d="M3 20h18" />
  </>,
)

export const BriefcaseIcon = makeIcon(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </>,
)

export const ShieldIcon = makeIcon(
  <>
    <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </>,
)

export const TrendUpIcon = makeIcon(
  <>
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M14 7h7v7" />
  </>,
)

export const GearIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </>,
)

export const BuildingIcon = makeIcon(
  <>
    <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M16 9h3a1 1 0 0 1 1 1v11" />
    <path d="M8 7h0M8 11h0M8 15h0M12 7h0M12 11h0M12 15h0" />
    <path d="M3 21h18" />
  </>,
)

export const CycleIcon = makeIcon(
  <>
    <path d="M20 12a8 8 0 0 0-14-5.3" />
    <path d="M4 4v4h4" />
    <path d="M4 12a8 8 0 0 0 14 5.3" />
    <path d="M20 20v-4h-4" />
  </>,
)

export const HandshakeIcon = makeIcon(
  <>
    <path d="m11 17 2 2 5-5 2-2-3-3-2 2-3-3-2 2-3-3-2 2 5 5z" />
    <path d="m3 11 3 3" />
    <path d="m21 13-3-3" />
  </>,
)

export const PlantIcon = makeIcon(
  <>
    <path d="M12 22V11" />
    <path d="M12 11c-3 0-5-2-5-5 3 0 5 2 5 5z" />
    <path d="M12 14c3 0 5-2 5-5-3 0-5 2-5 5z" />
    <path d="M7 22h10" />
  </>,
)

export const NetworkIcon = makeIcon(
  <>
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M7 6h10M7 8l4 8M17 8l-4 8" />
  </>,
)

export const TrophyIcon = makeIcon(
  <>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v6a5 5 0 0 1-10 0z" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3" />
    <path d="M7 5H4v2a3 3 0 0 0 3 3" />
  </>,
)

export const PeopleIcon = makeIcon(
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="17" cy="6" r="2.5" />
    <path d="M21 21v-1.5a3 3 0 0 0-3-3" />
  </>,
)

export const ScissorsIcon = makeIcon(
  <>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="m9 7 12 10" />
    <path d="m9 17 12-10" />
  </>,
)

export const ScaleIcon = makeIcon(
  <>
    <path d="M12 3v18" />
    <path d="M3 21h18" />
    <path d="M6 7h12" />
    <path d="m6 7-3 7h6z" />
    <path d="m18 7-3 7h6z" />
  </>,
)

export const ClockIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
)

export const UserIcon = makeIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </>,
)

export const ConnectIcon = makeIcon(
  <>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <path d="M8.5 12h7" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="19" r="2" />
    <path d="M12 7v3M12 14v3" />
  </>,
)

export const CheckIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </>,
)

export const ArrowRightIcon = makeIcon(
  <>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </>,
)

export const ArrowDownIcon = makeIcon(
  <>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </>,
)

export const PhoneIcon = makeIcon(
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7A2 2 0 0 1 22 16.9z" />,
)

/* -------------------- pillar (hero feature) icons -------------------- */

export const LendersIcon = makeIcon(
  <>
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="17" r="2" />
    <path d="M6 9v3a3 3 0 0 0 3 3M18 9v3a3 3 0 0 1-3 3" />
    <path d="m9.5 15.5 5-7" />
  </>,
)

export const GuidanceIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 12 2 2 4-5" />
    <circle cx="12" cy="12" r="3" />
  </>,
)

export const TransparentIcon = makeIcon(
  <>
    <path d="M3 7h13" />
    <path d="M3 12h10" />
    <path d="M3 17h13" />
    <circle cx="19" cy="7" r="1.5" />
    <circle cx="17" cy="12" r="1.5" />
    <circle cx="19" cy="17" r="1.5" />
  </>,
)

export const SupportIcon = makeIcon(
  <>
    <path d="M21 12a9 9 0 1 0-3 6.7" />
    <path d="M21 4v5h-5" />
  </>,
)

/* -------------------- registry (for IconKey → component) -------------------- */

export const iconRegistry: Record<IconKey, (props: IconProps) => ReactNode> = {
  home: HomeIcon,
  refresh: RefreshIcon,
  stack: StackIcon,
  crane: CraneIcon,
  tools: ToolsIcon,
  document: DocumentIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  shield: ShieldIcon,
  trendUp: TrendUpIcon,
  gear: GearIcon,
  building: BuildingIcon,
  cycle: CycleIcon,
  handshake: HandshakeIcon,
  plant: PlantIcon,
  network: NetworkIcon,
  trophy: TrophyIcon,
  people: PeopleIcon,
  scissors: ScissorsIcon,
  scale: ScaleIcon,
  clock: ClockIcon,
  user: UserIcon,
  connect: ConnectIcon,
  check: CheckIcon,
  arrowRight: ArrowRightIcon,
  arrowDown: ArrowDownIcon,
  phone: PhoneIcon,
  lenders: LendersIcon,
  guidance: GuidanceIcon,
  transparent: TransparentIcon,
  support: SupportIcon,
}

export function Icon({ name, ...rest }: IconProps & { name: IconKey }) {
  const Cmp = iconRegistry[name]
  return <Cmp {...rest} />
}