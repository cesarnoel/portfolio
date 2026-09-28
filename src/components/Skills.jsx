import { skillGroups } from '../data/portfolio';
import { iconRegistry } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

function SkillBar({ skill }) {
  return (
    <li className="skill">
      <div className="skill__head">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div
        className="skill-bar"
        role="progressbar"
        aria-label={skill.name}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* The SASS partial reads this custom property for the bar width. */}
        <span className="skill-bar__fill" style={{ '--level': `${skill.level}%` }} />
      </div>
    </li>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbox"
      title="Software & Language Proficiency"
      lead="Technologies I work with to bring ideas to life. The percentages are honest self-assessments rather than marketing numbers."
    >
      <div className="skill-grid">
        {skillGroups.map((group, index) => {
          const Icon = iconRegistry[group.icon] ?? iconRegistry.sparkles;

          return (
            <Reveal key={group.title} delay={index + 1} className="h-full">
              <article className="skill-card">
                <h3 className="skill-card__title">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {group.title}
                </h3>
                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
