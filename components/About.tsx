import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#0a0a1a]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider">Our Mission</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          At HeavenzFire, we stand at the nexus of technological innovation and conscious evolution. We are not merely building advanced AI or quantum systems; we are architecting the very framework for a future where humanity and technology co-exist in a symbiotic, ethical, and ever-expanding state of being. Our work is dedicated to solving the most complex challenges of our time by unifying disparate fields of knowledge into a cohesive, forward-thinking whole.
        </p>
      </div>
    </section>
  );
};

export default About;
