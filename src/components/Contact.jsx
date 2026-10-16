import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import { LinkedinIcon, MailIcon, MapPinIcon, SendIcon, SparklesIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '', website: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Business inbox — single source is profile.email, fallback keeps form working
// even if profile import fails.
const BUSINESS_EMAIL = 'cnsqdesigns@gmail.com';

// --- Anti-spam tunables (no backend needed) ---
const MIN_FILL_SECONDS = 4; // humans need a few seconds; bots submit instantly
const RATE_LIMIT_SECONDS = 60; // one message per minute per browser
const MAX_LINKS = 3; // more than this many URLs in message = likely spam
const SPAM_PHRASES = [
  'seo offer',
  'guaranteed ranking',
  'crypto giveaway',
  'double your bitcoin',
  'free followers',
  'buy followers',
  'viagra',
  'cialis',
  'loan approval',
];

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please tell me your name (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address does not look right.';
  }

  if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps — at least 20 characters.';
  }

  // Link-count check: legit enquiries rarely contain many URLs.
  const linkCount = (values.message.match(/https?:\/\/|www\./gi) || []).length;
  if (linkCount > MAX_LINKS) {
    errors.message = `Please remove extra links (max ${MAX_LINKS}) and try again.`;
  }

  return errors;
}

const countLinks = (text) => (text.match(/https?:\/\/|www\./gi) || []).length;

const containsSpamPhrase = (text) => {
  const lowered = text.toLowerCase();
  return SPAM_PHRASES.some((phrase) => lowered.includes(phrase));
};

/**
 * Contact form: validates in the browser, then sends directly to the
 * business inbox (cnsqdesigns@gmail.com) via FormSubmit's AJAX endpoint.
 * Falls back to opening the visitor's mail client if the network send fails.
 *
 * Anti-spam layers (all invisible to humans):
 *  1. Honeypot field `website` — hidden from sighted users, bots fill it.
 *  2. Time-trap — bots submit in < MIN_FILL_SECONDS; humans take longer.
 *  3. Rate limit — one send per RATE_LIMIT_SECONDS per browser (localStorage).
 *  4. Content checks — max links + known spam phrases.
 *  5. FormSubmit `_honey` + `_captcha:true` for server-side filtering.
 */
export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const formLoadedAt = useRef(Date.now());

  // Reset the time-trap when the form scrolls into view (fresh human timing).
  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus(null);
  };

  const openMailClient = () => {
    const to = profile.email || BUSINESS_EMAIL;
    const subject = encodeURIComponent(
      values.subject.trim() || `Project enquiry from ${values.name}`,
    );
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const isSpamAttempt = () => {
    // 1. Honeypot — real users never see/fill `website`.
    if (values.website.trim() !== '') return 'honeypot';

    // 2. Time-trap — submitted too fast to be human.
    const elapsedSeconds = (Date.now() - formLoadedAt.current) / 1000;
    if (elapsedSeconds < MIN_FILL_SECONDS) return 'too-fast';

    // 3. Rate limit — same browser sent very recently.
    try {
      const lastSent = Number(localStorage.getItem('contact-last-sent') || 0);
      if (Date.now() - lastSent < RATE_LIMIT_SECONDS * 1000) return 'rate-limited';
    } catch {
      // localStorage unavailable (private mode) — skip rate limit, other checks remain.
    }

    // 4. Content checks — too many links or known spam phrases.
    const combined = `${values.name} ${values.subject} ${values.message}`;
    if (countLinks(values.message) > MAX_LINKS) return 'too-many-links';
    if (containsSpamPhrase(combined)) return 'spam-phrase';

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    // Silent drop for bots: pretend success so they don't retry with variations.
    const spamReason = isSpamAttempt();
    if (spamReason === 'rate-limited') {
      setStatus({
        type: 'error',
        message: `Please wait a minute before sending another message — spam protection is on.`,
      });
      return;
    }
    if (spamReason) {
      setStatus({
        type: 'success',
        message: `Message sent — thanks for reaching out! I will reply as soon as possible.`,
      });
      setValues(EMPTY_FORM);
      formLoadedAt.current = Date.now();
      return;
    }

    const to = profile.email || BUSINESS_EMAIL;
    setSending(true);
    setStatus({ type: 'sending', message: `Sending to ${to}…` });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim() || `Project enquiry from ${values.name.trim()}`,
          message: values.message.trim(),
          _subject: values.subject.trim() || `Project enquiry from ${values.name.trim()}`,
          _template: 'table',
          _captcha: 'true',
          _honey: values.website.trim(),
        }),
      });

      if (!response.ok) throw new Error(`FormSubmit responded ${response.status}`);

      try {
        localStorage.setItem('contact-last-sent', String(Date.now()));
      } catch {
        // Ignore storage errors — send already succeeded.
      }
      setStatus({
        type: 'success',
        message: `Message sent to ${to} — thanks for reaching out! I will reply as soon as possible.`,
      });
      setValues(EMPTY_FORM);
      formLoadedAt.current = Date.now();
    } catch {
      openMailClient();
      setStatus({
        type: 'success',
        message: `Could not send automatically, so your mail client should be opening to ${to} — just hit Send there. Thanks!`,
      });
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (field) => `field ${errors[field] ? 'field--invalid' : ''}`.trim();

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Contact Me"
      lead="I would love to hear from you! Whether you have a question about my services, need support, or just want to say hello, please feel free to get in touch with me. I strive to respond to all inquiries as soon as possible."
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot: hidden from humans, bots fill it and get silently dropped. */}
            <div className="field-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                placeholder="Leave this empty"
                value={values.website}
                onChange={updateField}
              />
            </div>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div className={fieldClass('name')}>
                <label className="field__label" htmlFor="contact-name">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  className="field__control"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={values.name}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  required
                />
                {errors.name ? (
                  <p className="field__error" id="contact-name-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className={fieldClass('email')}>
                <label className="field__label" htmlFor="contact-email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  className="field__control"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  required
                />
                {errors.email ? (
                  <p className="field__error" id="contact-email-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                className="field__control"
                name="subject"
                type="text"
                placeholder="Front-end contract, 3 months, React"
                value={values.subject}
                onChange={updateField}
              />
            </div>

            <div className={fieldClass('message')}>
              <label className="field__label" htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                className="field__control"
                name="message"
                rows={6}
                placeholder="What are you building, and where does it need help?"
                value={values.message}
                onChange={updateField}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                required
              />
              {errors.message ? (
                <p className="field__error" id="contact-message-error" role="alert">
                  {errors.message}
                </p>
              ) : (
                <p className="field__hint" id="contact-message-hint">
                  Include scope, timeline, and anything you have already tried so I can reply with something useful.
                </p>
              )}
            </div>

            <button className="btn btn--primary btn--block" type="submit" disabled={sending}>
              <SendIcon size={16} />
              {sending ? 'Sending…' : `Send to ${(profile.email || BUSINESS_EMAIL)}`}
            </button>

            {status ? (
              <p
                className={`form-status form-status--${status.type === 'sending' ? 'info' : status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            ) : null}

            <p className="field__hint mt-4">
              This form sends directly to {(profile.email || BUSINESS_EMAIL)} — please contact me
              via email, I reply as soon as possible.
            </p>
          </form>
        </Reveal>

        <Reveal delay={1}>
          <aside className="contact-aside">
            <p className="pill-inline">
              <SparklesIcon size={14} />
              {profile.available}
            </p>

            <p className="leading-relaxed text-ink-500 dark:text-ink-300">
              Please contact me via email — I read everything at {profile.email} and strive to
              respond to all inquiries as soon as possible.
            </p>

            <span className="contact-line">
              <span className="contact-line__icon" aria-hidden="true">
                <MailIcon size={17} />
              </span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>

            <span className="contact-line">
              <span className="contact-line__icon" aria-hidden="true">
                <LinkedinIcon size={17} />
              </span>
              <a
                href="https://www.linkedin.com/in/engrcesarnoel/"
                target="_blank"
                rel="noreferrer noopener"
              >
                linkedin.com/in/engrcesarnoel
              </a>
            </span>

            <span className="contact-line">
              <span className="contact-line__icon" aria-hidden="true">
                <MapPinIcon size={17} />
              </span>
              {profile.location}
            </span>

            <div className="cta-banner mt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Typical engagement
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Custom WordPress builds, theme customization and ongoing maintenance — plus content
                publishing training so you can run the site yourself.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
