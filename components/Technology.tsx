import React from 'react';
import { TECHNOLOGY_CATEGORIES } from '../constants';
import Card from './Card';

const Technology: React.FC = () => {
  return (
    <section id="technology" className="py-20 md:py-32 bg-[#0a0a1a]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 uppercase tracking-wider">Core Technology</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <div className="space-y-16">
          {TECHNOLOGY_CATEGORIES.map((category) => (
            <div key={category.category}>
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">{category.category}</h3>
              <p className="text-gray-400 mb-8 max-w-3xl">{category.description}</p>
              <div className="grid md:grid-cols-2 gap-8">
                {category.technologies.map((tech) => (
                  <Card key={tech.name}>
                    <div className="p-8">
                      <h4 className="text-xl font-semibold text-white mb-3">{tech.name}</h4>
                      <p className="text-gray-400 mb-4">{tech.description}</p>
                      <p className="text-sm text-cyan-500"><span className="font-bold">Examples:</span> {tech.examples}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
