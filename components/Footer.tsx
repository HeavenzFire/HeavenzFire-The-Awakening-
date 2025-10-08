import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-purple-500/20 py-8">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} HeavenzFire. All rights reserved.</p>
        <p className="text-sm mt-2">Pioneering a new reality.</p>
      </div>
    </footer>
  );
};

export default Footer;
