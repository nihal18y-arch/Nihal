import React, { useState, useEffect } from 'react';
import type { PersonalInfo } from '../types';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center bg-stone-50 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-0 -left-48 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-24 right-20 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-20 container mx-auto px-6">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight mb-4 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Hi, I'm <span className="text-amber-600">{personalInfo.name}</span>
        </h1>
        <p className={`text-lg md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {personalInfo.title}
        </p>
        <div className={`flex justify-center space-x-4 transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="#portfolio"
            className="bg-amber-600 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View My Work
          </a>
          <a
            href={personalInfo.cvUrl}
            className="bg-white text-stone-800 font-bold py-3 px-8 rounded-full hover:bg-stone-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Download CV
          </a>
        </div>
      </div>
       <style>{`
        @keyframes blob {
	        0% { transform: translate(0px, 0px) scale(1); }
	        25% { transform: translate(20px, -30px) scale(1.05); }
	        50% { transform: translate(-20px, 20px) scale(0.95); }
	        75% { transform: translate(10px, 40px) scale(1.05); }
	        100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Hero;