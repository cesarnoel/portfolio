import { MoonIcon, SunIcon } from './Icons';

/**
 * Light/dark switch. Uses `aria-pressed` so assistive tech reports the state.
 */
export default function ThemeToggle({ isDark, onToggle, className = '' }) {
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      className={`icon-btn ${className}`.trim()}
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={label}
      title={label}
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
