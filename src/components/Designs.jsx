import { designWorks, profile } from '../data/portfolio';
import { ArrowUpRightIcon, MailIcon, iconRegistry } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

/**
 * Graphic Design Works — real copy and artwork from the companion gallery
 * at https://cnsqdemo.my.canva.site/cnsqdesigns. Images live in
 * public/media/designs and are lazy-loaded in a masonry-style column layout.
 */
export default function Designs() {
  return (
    <Section
      id="designs"
      eyebrow={designWorks.eyebrow}
      title={designWorks.title}
      lead={designWorks.lead}
    >
      <Reveal>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-ink-500 dark:text-ink-300">
          {designWorks.intro}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {designWorks.services.map((service, index) => {
          const Icon = iconRegistry[service.icon] ?? iconRegistry.sparkles;

          return (
            <Reveal key={service.title} delay={index + 1} className="h-full">
              <article className="design-service">
                <h3 className="skill-card__title">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                  {service.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="design-gallery mt-10">
        {designWorks.images.map((image, index) => (
          <a
            key={image.src}
            className="design-gallery__item reveal"
            data-delay={(index % 3) + 1}
            href={designWorks.galleryUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </a>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center gap-3">
        <a className="btn btn--primary" href={`mailto:${profile.email}`}>
          <MailIcon size={16} />
          Work with me
        </a>
        <a
          className="btn btn--outline"
          href={designWorks.galleryUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          View the full gallery on Canva
          <ArrowUpRightIcon size={16} />
        </a>
      </Reveal>
    </Section>
  );
}
