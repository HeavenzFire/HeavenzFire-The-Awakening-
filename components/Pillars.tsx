
import React from 'react';
import { PILLARS_DATA } from '../constants';
import type { Pillar } from '../types';
import Card from './Card';

const Pillars: React.FC = () => {
  return (
    <section id="pillars" className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a1a] to-[#0c0c1f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">The Three Pillars of Healing</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS_DATA.map((pillar: Pillar) => (
            <Card key={pillar.title}>
              <div className="flex flex-col items-center text-center p-6 h-full">
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-3">{pillar.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{pillar.description}</p>
                <div className="text-left w-full mb-4">
                    <h4 className="font-semibold text-white mb-2">How to Engage:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        {pillar.engagement.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <p className="text-sm font-light text-purple-300 mt-auto border-t border-purple-500/20 pt-4 w-full">
                    <strong>Impact:</strong> {pillar.impact}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
