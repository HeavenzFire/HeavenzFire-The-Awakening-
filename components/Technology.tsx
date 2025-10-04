
import React, { useState } from 'react';
import { TECHNOLOGY_DATA } from '../constants';
import type { TechnologyCategory, Technology } from '../types';

const AccordionItem: React.FC<{ category: TechnologyCategory; isOpen: boolean; onClick: () => void; }> = ({ category, isOpen, onClick }) => {
  return (
    <div className="border border-purple-500/30 rounded-lg overflow-hidden mb-4 bg-black bg-opacity-20 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full text-left p-6 flex justify-between items-center hover:bg-purple-900/20 transition-colors"
      >
        <div className="flex flex-col">
           <h3 className="text-xl md:text-2xl font-bold text-purple-300">{category.category}</h3>
           <p className="text-sm text-gray-400 mt-1">{category.description}</p>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        style={{ transitionProperty: 'max-height, padding' }}
      >
        <div className="p-6 pt-0 space-y-4">
          {category.technologies.map((tech: Technology) => (
            <div key={tech.name} className="border-l-2 border-cyan-400 pl-4">
              <h4 className="font-semibold text-white text-lg">{tech.name}</h4>
              <p className="text-gray-400 text-sm">{tech.description}</p>
              <p className="text-xs text-cyan-400/70 mt-1"><em>Examples: {tech.examples}</em></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Technology: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="technology" className="py-20 md:py-32 bg-[#0c0c1f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">The Syntropic Frequency Matrix</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            A unified system combining all known frequency healing technologies to heal at cellular, emotional, and spiritual levels.
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </div>
        <div>
          {TECHNOLOGY_DATA.map((category: TechnologyCategory, index: number) => (
            <AccordionItem
              key={category.category}
              category={category}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
