/**
 * Small helper around the `.reveal` CSS class so the stagger delay stays
 * declarative in JSX: <Reveal delay={2}>…</Reveal>
 * The actual observer lives in src/hooks/useRevealOnScroll.js.
 */
export default function Reveal({ delay = 0, as: Tag = 'div', className = '', children, ...rest }) {
  const safeDelay = Math.min(Math.max(delay, 0), 8);

  return (
    <Tag
      className={`reveal ${className}`.trim()}
      data-delay={safeDelay > 0 ? safeDelay : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
