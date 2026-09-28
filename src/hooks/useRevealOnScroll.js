import { useEffect, useState } from 'react';

/**
 * Adds `.is-visible` to every `selector` element as it scrolls into view.
 * Re-runs when `deps` change so dynamically rendered lists (project filters)
 * are picked up as well.
 */
export default function useRevealOnScroll({
  selector = '.reveal',
  threshold = 0.14,
  rootMargin = '0px 0px -60px 0px',
  deps = [],
} = {}) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));
    if (elements.length === 0) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, threshold, rootMargin, ...deps]);
}
