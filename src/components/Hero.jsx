import { codeSnippet, heroRoles, profile } from '../data/portfolio';
import useTypewriter from '../hooks/useTypewriter';
import { ArrowRightIcon, MailIcon, SparklesIcon, iconRegistry } from './Icons';
import Reveal from './Reveal';

// Minimal tokeniser for the decorative code panel: wraps string literals,
// keywords and object keys in the SASS classes defined for syntax colours.
const TOKEN_PATTERN = /('[^']*')|\b(export|const|return)\b|([A-Za-z_$][\w$]*)(?=\s*:)/g;

function tokenize(line) {
  const tokens = [];
  let cursor = 0;
  let match = TOKEN_PATTERN.exec(line);

  while (match !== null) {
    if (match.index > cursor) {
      tokens.push({ text: line.slice(cursor, match.index), className: '' });
    }

    if (match[1]) tokens.push({ text: match[1], className: 'tok-str' });
    else if (match[2]) tokens.push({ text: match[2], className: 'tok-key' });
    else tokens.push({ text: match[3], className: 'tok-fn' });

    cursor = match.index + match[0].length;
    match = TOKEN_PATTERN.exec(line);
  }

  if (cursor < line.length) tokens.push({ text: line.slice(cursor), className: '' });
  return tokens;
}

function CodePanel() {
  return (
    <div className="code-card" aria-hidden="true">
      <div className="code-card__bar">
        <span className="code-card__dot code-card__dot--red" />
        <span className="code-card__dot code-card__dot--amber" />
        <span className="code-card__dot code-card__dot--green" />
        <span className="code-card__file">stack.js</span>
      </div>
      <pre className="code-card__body">
        <code>
          {codeSnippet.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {tokenize(line).map((token, tokenIndex) => (
                <span key={tokenIndex} className={token.className}>
                  {token.text}
                </span>
              ))}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function Hero() {
  const typedRole = useTypewriter(heroRoles, { typeSpeed: 78, deleteSpeed: 38, pause: 1400 });

  return (
    <section id="home" aria-labelledby="hero-heading" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="blob blob--one" />
        <span className="blob blob--two" />
        <span className="blob blob--three" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal as="p" className="pill-inline mb-6">
            <SparklesIcon size={14} />
            {profile.greeting}
          </Reveal>

          <Reveal as="h1" delay={1} className="hero__title">
            Senior <span className="text-gradient">WordPress Engineer</span>
          </Reveal>

          <Reveal as="p" delay={2} className="hero__role">
            <span className="visually-hidden">I specialise in</span>
            <span aria-hidden="true">{'> '}</span>
            <span className="caret" aria-live="polite">
              {typedRole}
            </span>
          </Reveal>
 
          <Reveal as="p" delay={3} className="section__lead">
            {profile.tagline}
          </Reveal>
 
          <Reveal delay={4} className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              What I&rsquo;m Working On
              <ArrowRightIcon size={16} />
            </a>
            <a className="btn btn--outline" href="#contact">
              <MailIcon size={16} />
              Get in Touch
            </a>
          </Reveal>

          <Reveal delay={5} className="hero__meta">
            <span className="hero__status">
              <span className="pulse-dot" aria-hidden="true" />
              {profile.available}
            </span>
            <span className="social-row">
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
            </span>
          </Reveal>
        </div>

        <Reveal delay={3} className="lg:pl-4">
          <CodePanel />
        </Reveal>
      </div>
    </section>
  );
}
