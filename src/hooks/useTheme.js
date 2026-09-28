import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

function readPreferredTheme() {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Private browsing can block storage -- fall back to the OS preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Class-based dark mode that plays nicely with Tailwind's `darkMode: 'class'`.
 * The visitor's explicit choice wins over the OS preference and is persisted.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(readPreferredTheme);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // Apply the theme to <html> so Tailwind's `dark:` variants kick in.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  // Keep following the OS until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      let hasExplicitChoice = false;
      try {
        hasExplicitChoice = Boolean(window.localStorage.getItem(STORAGE_KEY));
      } catch {
        hasExplicitChoice = false;
      }
      if (!hasExplicitChoice) setTheme(event.matches ? 'dark' : 'light');
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = themeRef.current === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the UI still switches for this session.
    }
    setTheme(next);
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme };
}
