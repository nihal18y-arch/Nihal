import React, { useState, useEffect, useRef } from 'react';
import type { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
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
    <section id="skills" className="py-20 md:py-32 bg-stone-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-4">
          My <span className="text-amber-600">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center transform transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl hover:shadow-amber-500/20 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${isVisible ? index * 100 : 0}ms` }}
            >
              <skill.icon className="w-12 h-12 mb-4 text-amber-600" />
              <h3 className="font-semibold text-lg text-stone-800">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;