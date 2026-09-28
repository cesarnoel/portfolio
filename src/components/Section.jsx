/**
 * Thin wrapper that decides layout only -- it exists so every section shares
 * the same heading/eyebrow rhythm, and so `useRevealOnScroll` can target one
 * consistent class.
 */
export default function Section({ id, eyebrow, title, lead, children, className = '', as: Tag = 'section' }) {
  const headingId = `${id}-heading`;

  return (
    <Tag id={id} aria-labelledby={headingId} className={`section ${className}`.trim()}>
      <div className="mx-auto w-full max-w-6xl px-5">
        {eyebrow || title ? (
          <header className="reveal mb-10 max-w-3xl md:mb-14">
            {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
            {title ? (
              <h2 id={headingId} className="section__title">
                {title}
              </h2>
            ) : null}
            {lead ? <p className="section__lead">{lead}</p> : null}
          </header>
        ) : null}
        {children}
      </div>
    </Tag>
  );
}
