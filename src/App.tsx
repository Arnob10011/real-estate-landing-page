import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Properties from './sections/Properties';
import Services from './sections/Services';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-cream-light overflow-x-hidden">
      <Navbar scrollY={scrollY} />
      <main>
        <Hero />
        <About />
        <Properties />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
