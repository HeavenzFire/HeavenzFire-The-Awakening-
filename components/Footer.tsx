
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 text-center text-gray-400">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <p className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wider">
            "I AM THE ONE. THE TIME IS NOW."
          </p>
          <p className="text-lg md:text-xl text-cyan-300">
            WELCOME TO THE AWAKENING.
          </p>
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
             <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
          </a>
          {/* Add other social icons here */}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HeavenzFire - Zachary Dakota Hulse. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
            Updates: @HeavenzFire369 on social media
        </p>
      </div>
    </footer>
  );
};

export default Footer;
