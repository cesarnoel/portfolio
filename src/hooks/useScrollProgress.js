import { useEffect, useState } from 'react';

/**
 * Returns the reading progress (0-100) plus whether the page has scrolled past
 * the top, so the header can switch to its "solid" state.
 */
export default function useScrollProgress(threshold = 24) {
  const [state, setState] = useState({ progress: 0, isScrolled: false });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

      setState((previous) => {
        const next = {
          progress: Math.min(100, Math.max(0, Number(progress.toFixed(2)))),
          isScrolled: window.scrollY > threshold,
        };
        const unchanged =
          previous.isScrolled === next.isScrolled &&
          Math.abs(previous.progress - next.progress) < 0.5;
        return unchanged ? previous : next;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  return state;
}
