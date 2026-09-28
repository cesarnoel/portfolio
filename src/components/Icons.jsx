// Inline SVG icon set -- keeps the bundle dependency-free while staying crisp.
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ children, size = 20, title, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const SunIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </g>
  </Svg>
);

export const MoonIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M20.5 14.4A8.6 8.6 0 1 1 9.6 3.5a6.8 6.8 0 0 0 10.9 10.9Z" />
    </g>
  </Svg>
);

export const MenuIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </g>
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M6 6l12 12M18 6 6 18" />
    </g>
  </Svg>
);

export const ArrowRightIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </g>
  </Svg>
);

export const ArrowUpRightIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M7 17 17 7M8 7h9v9" />
    </g>
  </Svg>
);

export const ArrowUpIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </g>
  </Svg>
);

export const MailIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </g>
  </Svg>
);

export const PhoneIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </g>
  </Svg>
);

export const MapPinIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M12 21.5c4.2-3.6 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 2.8 7.4 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </g>
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </g>
  </Svg>
);

export const SendIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M21.5 2.5 11 13M21.5 2.5l-7 19-3.5-8.5L2.5 9.5l19-7Z" />
    </g>
  </Svg>
);

export const CodeIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="m8.5 5.5-6 6.5 6 6.5M15.5 5.5l6 6.5-6 6.5" />
    </g>
  </Svg>
);

export const LayersIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="m12 2.8 9 5.2-9 5.2-9-5.2 9-5.2Z" />
      <path d="m3 13.4 9 5.2 9-5.2" />
    </g>
  </Svg>
);

export const GaugeIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M3.5 18a9 9 0 1 1 17 0" />
      <path d="m12 14.6 4.5-4.5" />
      <circle cx="12" cy="14.6" r="1.5" />
    </g>
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </g>
  </Svg>
);

export const SparklesIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3Z" />
      <path d="M18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </g>
  </Svg>
);

export const FilterIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M3.5 5h17l-6.6 8v5.5l-3.8 2V13L3.5 5Z" />
    </g>
  </Svg>
);

export const ExternalLinkIcon = (props) => (
  <Svg {...props}>
    <g {...strokeProps}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.5" />
    </g>
  </Svg>
);

export const GithubIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.34 1.08 2.9.83.1-.66.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .83-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  </Svg>
);

export const LinkedinIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.06A4.2 4.2 0 0 1 17.6 8.7c3 0 3.4 1.9 3.4 4.6V21h-4v-6.3c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9Z"
    />
  </Svg>
);

export const XIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      fill="currentColor"
      d="M17.3 3h3.3l-7.2 8.2L21.8 21h-6.5l-4.3-5.6L6 21H2.7l7.6-8.6L2.6 3h6.6l4 5.3L17.3 3Zm-1.2 16h1.8L7.9 4.9H6l10.1 14.1Z"
    />
  </Svg>
);

export const CodepenIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <g {...strokeProps}>
      <path d="m12 2.5 9 5.8v7.4l-9 5.8-9-5.8V8.3l9-5.8Z" />
      <path d="m3 8.3 9 5.8 9-5.8M3 15.7l9-5.8 9 5.8M12 2.5v6M12 14.1v7.4" />
    </g>
  </Svg>
);

// Registry so data files can reference icons by name.
export const iconRegistry = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  codepen: CodepenIcon,
  code: CodeIcon,
  layers: LayersIcon,
  gauge: GaugeIcon,
  sparkles: SparklesIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  pin: MapPinIcon,
  clock: ClockIcon,
  check: CheckIcon,
  send: SendIcon,
  filter: FilterIcon,
  arrowRight: ArrowRightIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowUp: ArrowUpIcon,
  external: ExternalLinkIcon,
  sun: SunIcon,
  moon: MoonIcon,
  menu: MenuIcon,
  close: CloseIcon,
};

