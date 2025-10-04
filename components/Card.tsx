
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-300"></div>
      <div className="relative bg-[#101024] ring-1 ring-gray-700/50 rounded-xl leading-none flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export default Card;
