import useRevealOnScroll from './hooks/useRevealOnScroll';
import useTheme from './hooks/useTheme';
import About from './components/About';
import Contact from './components/Contact';
import Designs from './components/Designs';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ScrollToTop from './components/ScrollToTop';
import Skills from './components/Skills';

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  // One observer for the whole page; sections opt in with the `.reveal` class.
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Designs />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
