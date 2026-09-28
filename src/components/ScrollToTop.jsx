import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './Icons';

/**
 * Floating back-to-top control. Fades in only once the hero is behind you.
 */
export default function ScrollToTop({ showAfter = 600 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`to-top ${isVisible ? 'to-top--visible' : ''}`.trim()}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUpIcon size={18} />
    </button>
  );
}
