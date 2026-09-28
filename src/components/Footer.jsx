import { navLinks, profile } from '../data/portfolio';
import { ArrowUpIcon, MailIcon, iconRegistry } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="site-footer__grid">
          <div>
            <a className="brand" href="#home">
              <span className="brand__mark brand__mark--logo" aria-hidden="true">
                <img className="brand__logo" src={profile.logoMark} alt="" width="28" height="28" />
              </span>
              <span className="brand__text">
                <span>{profile.brand}</span>
                <span className="brand__role">{profile.role}</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Online portfolio of Cesar Noel Quiñon — Senior WordPress Engineer specializing in
              custom WordPress websites, theme development and robust maintenance solutions.
            </p>
            <div className="social-row mt-5">
              {profile.socials.map((social) => {
                const Icon = iconRegistry[social.icon];
                return (
                  <a
                    key={social.label}
                    className="social-link"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${profile.name} on ${social.label}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="site-footer__heading">Sections</h2>
            <ul className="site-footer__list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a className="site-footer__link" href={`#${link.id}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__heading">Elsewhere</h2>
            <ul className="site-footer__list">
              <li>
                <a className="site-footer__link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  className="site-footer__link"
                  href="https://www.linkedin.com/in/engrcesarnoel/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="site-footer__link" href="#projects">
                  Recent development projects
                </a>
              </li>
              <li>
                <a className="site-footer__link" href="#designs">
                  Graphic design works
                </a>
              </li>
              <li>
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <a className="site-footer__link flex items-center gap-2" href="#home">
            <MailIcon size={14} />
            Back to top
            <ArrowUpIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
