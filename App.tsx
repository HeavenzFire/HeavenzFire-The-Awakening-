import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Pillars from './components/Pillars';
import Technology from './components/Technology';
import Impact from './components/Impact';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Particles from './components/Particles';
import GeminiChat from './components/GeminiChat';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="bg-[#0a0a1a] text-gray-200 font-sans antialiased">
      <Particles />
      <Header />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Technology />
        <Impact />
        <CallToAction />
      </main>
      <Footer />
      <GeminiChat />
    </div>
  );
};

export default App;
