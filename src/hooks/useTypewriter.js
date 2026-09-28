import { useEffect, useState } from 'react';

/**
 * Types, pauses, deletes and repeats through a list of words.
 * Falls back to a static word for reduced-motion visitors.
 */
export default function useTypewriter(words = [], { typeSpeed = 82, deleteSpeed = 42, pause = 1500 } = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return undefined;

    const word = words[wordIndex % words.length];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(word);
      return undefined;
    }

    const isWordComplete = !isDeleting && text === word;
    const isWordCleared = isDeleting && text === '';

    let delay = isDeleting ? deleteSpeed : typeSpeed;
    if (isWordComplete) delay = pause;
    if (isWordCleared) delay = typeSpeed * 2.5;

    const timer = window.setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isWordCleared) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setText(isDeleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
