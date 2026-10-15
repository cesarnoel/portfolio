import { testimonials } from '../data/portfolio';
import Reveal from './Reveal';
import Section from './Section';

/**
 * Small client-quote strip between About and Portfolio.
 * Kept static (no carousel JS) so there is nothing to break on mobile.
 */
export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title="What Clients Say"
      lead="Short notes from site owners I build and maintain websites for."
    >
      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.company} delay={index + 1} className="h-full">
            <figure className="testimonial-card">
              <blockquote className="testimonial-card__quote">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="testimonial-card__author">
                <span className="testimonial-card__name">{testimonial.name}</span>
                <span className="testimonial-card__company">{testimonial.company}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
