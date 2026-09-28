import { profile, stats } from '../data/portfolio';
import useCountUp from '../hooks/useCountUp';
import useInView from '../hooks/useInView';
import { CheckIcon, ClockIcon, MapPinIcon, SparklesIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

function StatCard({ stat, delay }) {
  const [ref, isInView] = useInView({ threshold: 0.4 });
  const value = useCountUp(stat.value, { start: isInView, duration: 1500 });

  return (
    <div ref={ref} className="stat reveal" data-delay={delay > 0 ? delay : undefined}>
      <p className="stat__value">
        {value}
        {stat.suffix}
      </p>
      <p className="stat__label">{stat.label}</p>
    </div>
  );
}

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="A brief introduction"
      title="Trusted Developer Open to Collaboration"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
          <div className="portrait">
            <img className="portrait__img" src={profile.portrait} alt={profile.portraitAlt} />
            <span className="portrait__badge">
              <span className="hero__status" style={{ display: 'inline-flex' }}>
                <span className="pulse-dot" aria-hidden="true" />
                {profile.sinceBadge}
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="flex flex-col gap-4 text-[0.95rem] leading-relaxed text-ink-500 dark:text-ink-300">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="check-list mt-7">
            {profile.values.map((value) => (
              <li key={value.slice(0, 24)}>
                <span className="check-list__icon" aria-hidden="true">
                  <CheckIcon size={12} />
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-ink-500 dark:text-ink-400">
            Want the long version? The highlights are in the{' '}
            <a className="link-inline" href="#projects">
              development projects
            </a>{' '}
            below, and my design pieces are in the{' '}
            <a className="link-inline" href="#designs">
              graphic design works
            </a>{' '}
            gallery.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-500 dark:text-ink-400">
            <span className="contact-line">
              <MapPinIcon size={16} />
              {profile.location}
            </span>
            <span className="contact-line">
              <ClockIcon size={16} />
              {profile.replyNote}
            </span>
          </div>

          <div className="mt-8">
            <a className="btn btn--outline" href="#contact">
              <SparklesIcon size={16} />
              Work with me
            </a>
          </div>
        </Reveal>
      </div>

      <div className="stat-grid mt-14">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} delay={index + 1} />
        ))}
      </div>
    </Section>
  );
}
