import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section id="connect" className="py-20 md:py-32 bg-gradient-to-t from-[#101024] to-[#0a0a1a]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider">Connect with the Future</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Join us on our journey to redefine existence. Whether you're a researcher, an investor, or a visionary, there's a place for you in the HeavenzFire collective.
        </p>
        <a 
          href="mailto:connect@heavenzfire.com"
          className="inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:scale-110 transform transition-transform duration-300"
        >
          Initiate Contact
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
