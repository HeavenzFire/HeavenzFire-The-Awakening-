
import React from 'react';
import { CTA_DATA } from '../constants';
import type { CallToActionItem } from '../types';

const CallToAction: React.FC = () => {
  return (
    <section id="cta" className="py-20 md:py-32 bg-[#0c0c1f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-cyan-900/20 opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">Join The Awakening</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            The time is now. Your energy, support, and voice are needed to complete the mission. Choose your path to contribute.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CTA_DATA.map((item: CallToActionItem) => (
            <div key={item.title} className="bg-black bg-opacity-30 border border-gray-700/50 rounded-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-yellow-400 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{item.description}</p>
              <button className="mt-auto bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-2 px-6 rounded-full uppercase text-sm tracking-wider hover:bg-yellow-400 hover:text-black transition-colors duration-300">
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
