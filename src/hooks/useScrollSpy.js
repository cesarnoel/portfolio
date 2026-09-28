import { useEffect, useMemo, useState } from 'react';

/**
 * Watches the scroll position and reports which section is currently on screen.
 * Used to highlight the matching link in the navigation.
 */
export default function useScrollSpy(sectionIds, { offset = 120 } = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const ids = useMemo(() => sectionIds.join('|'), [sectionIds]);

  useEffect(() => {
    const sections = ids
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      let currentId = sections[0].id;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) currentId = section.id;
      });

      // Pin the last section when the page is scrolled to the very bottom.
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (reachedBottom) currentId = sections[sections.length - 1].id;

      setActiveId(currentId);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [ids, offset]);

  return activeId;
}
