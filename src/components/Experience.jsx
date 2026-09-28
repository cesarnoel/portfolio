import { experience } from '../data/portfolio';
import { MapPinIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Fifteen years of WordPress, eighteen years of design"
      lead="Two crafts, one career: engineering WordPress sites that stay fast and secure, and graphic design across web, print and e-books."
    >
      <ol className="timeline">
        {experience.map((job, index) => (
          <li key={`${job.company}-${job.period}`} className="timeline__item">
            <span className="timeline__marker" aria-hidden="true" />
            <Reveal delay={(index % 3) + 1}>
              <article className="timeline__card">
                <header className="timeline__head">
                  <div>
                    <h3 className="timeline__role">{job.role}</h3>
                    <p className="timeline__company">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span className="timeline__period">{job.period}</span>
                    <span className="contact-line text-xs">
                      <MapPinIcon size={14} />
                      {job.location}
                    </span>
                  </div>
                </header>

                <p className="timeline__summary">{job.summary}</p>

                <ul className="timeline__bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 24)}>{bullet}</li>
                  ))}
                </ul>

                <div className="timeline__stack">
                  {job.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
