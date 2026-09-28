import { ArrowUpRightIcon, ExternalLinkIcon } from './Icons';

/**
 * Single project tile with a real screenshot of the shipped site.
 * The media area links out to the live project, matching the source
 * portfolio's "View Project" / "View Demo" behaviour.
 */
export default function ProjectCard({ project, delay = 0 }) {
  const hostname = new URL(project.links.live).hostname;

  return (
    <article
      className="project-card reveal"
      data-delay={delay > 0 ? delay : undefined}
      aria-labelledby={`project-${project.id}`}
    >
      <a
        className="project-card__media"
        href={project.links.live}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${project.cta}: ${project.title} (opens in a new tab)`}
      >
        <img
          className="project-card__thumb"
          src={project.image}
          alt={`${project.title} website screenshot`}
          loading="lazy"
        />
        <span className="project-card__year">{project.kind}</span>
      </a>

      <div className="project-card__body">
        <div className="project-card__head">
          <div>
            <h3 id={`project-${project.id}`} className="project-card__title">
              {project.title}
            </h3>
            <p className="project-card__role">{hostname}</p>
          </div>
        </div>

        <p className="project-card__blurb">{project.tagline}</p>

        <ul className="project-card__highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight.slice(0, 24)}>{highlight}</li>
          ))}
        </ul>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card__footer">
          <div className="project-card__links">
            <a
              className="project-card__link"
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ExternalLinkIcon size={15} />
              {project.cta}
              <span className="visually-hidden"> for {project.title}</span>
              <ArrowUpRightIcon size={14} className="project-card__arrow" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
