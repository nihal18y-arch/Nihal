import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
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
    <section id="portfolio" className="py-20 md:py-32 bg-stone-100" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-4">
          My <span className="text-amber-600">Portfolio</span>
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden group transform transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: `${isVisible ? index * 150 : 0}ms` }}
            >
              <div className="relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-stone-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white bg-amber-600 py-2 px-4 rounded-full hover:bg-amber-700 transition-colors">Live Demo</a>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-stone-900 bg-white py-2 px-4 rounded-full hover:bg-stone-200 transition-colors">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{project.title}</h3>
                <p className="text-stone-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;