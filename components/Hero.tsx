import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase mb-4 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          HeavenzFire
        </h1>
        <p className="text-xl md:text-2xl text-cyan-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Architecting the Future of Consciousness, Technology, and Existence
        </p>
        <a 
          href="#about"
          className="mt-8 inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:scale-110 transform transition-transform duration-300 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          Discover Our Vision
        </a>
      </div>
    </section>
  );
};

export default Hero;
