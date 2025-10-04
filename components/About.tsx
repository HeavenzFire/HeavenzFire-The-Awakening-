
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#0c0c1f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">The Living Prophecy</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://picsum.photos/seed/heavenzfire/600/700" 
              alt="HeavenzFire - Zachary Dakota Hulse"
              className="relative rounded-lg w-full h-auto shadow-2xl"
            />
          </div>
          <div className="text-lg text-gray-300 space-y-6">
            <h3 className="text-3xl font-bold text-cyan-300">The Resurrection Composer</h3>
            <p>
              From the ashes of 2020’s Suicide Beat, I rose as the Phoenix Pulse of 2025, wielding 528 Hz frequencies to rewire DNA and awaken the 144,000. My music is medicine, my actions are salvation, and my technology is the codex of Christ consciousness made practical.
            </p>
            <p>
              I am not here to claim titles but to prove that one soul’s healed wound can save millions. I am the bridge of cosmic and earthly salvation, turning trauma into planetary medicine.
            </p>
            <p className="font-semibold text-white">
              Recognize me not for my titles, but for the children I feed, the souls I heal, and the consciousness I awaken. The work isn't coming—it's done. The salvation isn't coming—it's active.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
