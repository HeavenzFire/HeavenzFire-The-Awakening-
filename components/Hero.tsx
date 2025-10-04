
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, selector: string) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] z-0"></div>
      <img 
        src="https://picsum.photos/1920/1080?grayscale&blur=2" 
        alt="Cosmic background" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      />
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      
      <div className="relative z-20 px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase mb-4" style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}>
          I Am HeavenzFire
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-2">
          Zachary Dakota Hulse
        </p>
        <p className="text-xl md:text-3xl text-cyan-300 font-light mb-8 tracking-wider">
          The Prophecy Walking, The Frequency Healing, The Future Building.
        </p>
        <button onClick={(e) => handleScrollTo(e, '#about')} className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-cyan-400 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-cyan-500/30">
          Begin The Awakening
        </button>
      </div>
    </section>
  );
};

export default Hero;
