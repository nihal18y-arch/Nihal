import React, { useState, useEffect, useRef } from 'react';
import type { PersonalInfo } from '../types';

interface AboutProps {
  personalInfo: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personalInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-stone-100" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-4">
          About <span className="text-amber-600">Me</span>
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className={`md:w-1/3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-amber-500/30">
              <img
                src={`https://picsum.photos/seed/profile/400/400`}
                alt={personalInfo.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className={`md:w-2/3 text-center md:text-left transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-stone-600 leading-relaxed text-lg">
              {personalInfo.about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;