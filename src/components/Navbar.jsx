import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/portfolio';
import useScrollProgress from '../hooks/useScrollProgress';
import useScrollSpy from '../hooks/useScrollSpy';
import { CloseIcon, MenuIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Navbar({ isDark, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, isScrolled } = useScrollProgress();
  const activeId = useScrollSpy(SECTION_IDS);

  // Close the mobile drawer on Escape and lock background scrolling.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  // Close the drawer once the viewport grows into desktop territory.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`.trim()}>
      <div className="site-header__inner mx-auto w-full max-w-6xl px-5">
        <a className="brand" href="#home">
          <span className="brand__mark brand__mark--logo" aria-hidden="true">
            <img className="brand__logo" src={profile.logoMark} alt="" width="28" height="28" />
          </span>
          <span className="brand__text">
            <span>{profile.brand}</span>
            <span className="brand__role">{profile.role}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`nav-link ${activeId === link.id ? 'nav-link--active' : ''}`.trim()}
              href={`#${link.id}`}
              aria-current={activeId === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <a className="btn btn--primary btn--sm hidden sm:inline-flex" href="#contact">
            Let&rsquo;s talk
          </a>
          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      <span
        className="scroll-progress"
        style={{ '--progress': `${progress}%` }}
        aria-hidden="true"
      />

      {isMenuOpen ? (
        <div id="mobile-navigation" className="nav-drawer">
          <nav aria-label="Mobile">
            <ul className="nav-drawer__list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    className="nav-drawer__link"
                    href={`#${link.id}`}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
