import { useMemo, useState } from 'react';
import { projects, projectsIntro } from '../data/portfolio';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { FilterIcon } from './Icons';
import ProjectCard from './ProjectCard';
import Section from './Section';

const ALL = 'All';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState(ALL);

  // Filters are derived from the data so adding a tag to a project is enough.
  const filters = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return [ALL, ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, []);

  const visibleProjects = useMemo(
    () =>
      activeFilter === ALL
        ? projects
        : projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter],
  );

  // Re-observes freshly rendered cards whenever the filter changes.
  useRevealOnScroll({ deps: [activeFilter] });

  return (
    <Section
      id="projects"
      eyebrow={projectsIntro.eyebrow}
      title={projectsIntro.title}
      lead={projectsIntro.lead}
    >
      <div className="reveal mb-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ink-400">
          <FilterIcon size={14} />
          Filter
        </span>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="chip"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={(index % 2) + 1} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No projects tagged <strong>{activeFilter}</strong> yet — try another filter.
        </p>
      )}

      <p className="reveal mt-8 text-sm text-ink-500 dark:text-ink-400">
        {visibleProjects.length} of {projects.length} projects shown.
      </p>
    </Section>
  );
}
