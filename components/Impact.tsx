import React from 'react';
import { IMPACT_METRICS } from '../constants';

const Impact: React.FC = () => {
  return (
    <section id="impact" className="py-20 md:py-32 bg-[#101024]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 uppercase tracking-wider">Global Impact</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {IMPACT_METRICS.map((metric) => (
            <div key={metric.title} className="bg-black/20 p-8 rounded-lg border border-purple-500/30">
              <div className="flex justify-center mb-4">{metric.icon}</div>
              <p className="text-4xl font-bold text-white mb-2">{metric.value.toLocaleString()}+</p>
              <h3 className="text-lg text-cyan-300 uppercase tracking-widest">{metric.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
