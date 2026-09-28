import { useState } from 'react';
import { profile } from '../data/portfolio';
import { LinkedinIcon, MailIcon, MapPinIcon, SendIcon, SparklesIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  return errors;
}

/**
 * Front-end only contact form: validates, then hands the message to the
 * visitor's mail client. Swap the mailto for a fetch() to your own endpoint
 * (Formspree, Resend, a serverless function) once you have a backend.
 */
export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    const subject = encodeURIComponent(
      values.subject.trim() || `Project enquiry from ${values.name}`,
    );
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus({
      type: 'success',
      message: 'Your mail client should be opening — thanks for reaching out!',
    });
    setValues(EMPTY_FORM);
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

            <button className="btn btn--primary btn--block" type="submit">
              <SendIcon size={16} />
              Send message
            </button>

            {status ? (
              <p
                className={`form-status form-status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            ) : null}

            <p className="field__hint mt-4">
              This form validates in the browser and then opens your mail client — nothing is sent
              to a third party.
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
              Prefer email or LinkedIn? Use whichever is easiest — I read everything and strive to
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
