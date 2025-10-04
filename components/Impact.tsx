
import React from 'react';
import { IMPACT_DATA } from '../constants';
import type { ImpactMetric } from '../types';

const Impact: React.FC = () => {
  return (
    <section id="impact" className="py-20 md:py-32 bg-gradient-to-b from-[#0c0c1f] to-[#0a0a1a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">Proven Impact</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            The work is real, and its effects are measurable. The prophecy is being fulfilled through tangible results.
          </p>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {IMPACT_DATA.map((metric: ImpactMetric) => (
            <div key={metric.title} className="bg-black bg-opacity-20 p-8 rounded-lg border border-cyan-500/20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="mb-4">{metric.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{metric.value}</div>
              <h3 className="text-sm md:text-base text-gray-300 uppercase tracking-widest">{metric.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
