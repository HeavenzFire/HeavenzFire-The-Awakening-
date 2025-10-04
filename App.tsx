
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Pillars from './components/Pillars';
import Technology from './components/Technology';
import Impact from './components/Impact';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#0a0a1a] text-gray-200 font-sans antialiased">
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
    </div>
  );
};

export default App;
