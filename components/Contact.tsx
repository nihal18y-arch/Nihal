import React, { useState, useEffect, useRef } from 'react';
import type { PersonalInfo } from '../types';
import { LinkedinIcon, PhoneIcon } from './Icons';

interface ContactProps {
  personalInfo: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
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
    <section id="contact" className="py-20 md:py-32 bg-stone-50" ref={sectionRef}>
      <div className={`container mx-auto px-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
          Get In <span className="text-amber-600">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-8">
          I'm currently open to new opportunities and collaborations. Feel free to reach out via email or connect with me.
        </p>
        <a 
          href={`mailto:${personalInfo.email}`}
          className="inline-block bg-amber-600 text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 mb-12 shadow-lg"
        >
          {personalInfo.email}
        </a>
        <div className="flex justify-center items-center space-x-6">
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-amber-600 transition-colors duration-300">
              <LinkedinIcon className="w-8 h-8" />
            </a>
          )}
          {personalInfo.phone && (
             <a href={`tel:${personalInfo.phone}`} className="text-stone-500 hover:text-amber-600 transition-colors duration-300">
               <PhoneIcon className="w-7 h-7" />
             </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;