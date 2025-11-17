import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';
import { personalInfo, skillsData, portfolioData } from './constants';

const App: React.FC = () => {
  useEffect(() => {
    // Add class to body if it's not a touch device to enable cursor hiding
    if (!window.matchMedia("(pointer: coarse)").matches) {
      document.body.classList.add('has-custom-cursor');
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-stone-50 overflow-x-hidden">
      <CustomCursor />
      <Header />
      <main>
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Skills skills={skillsData} />
        <Portfolio projects={portfolioData} />
        <Contact personalInfo={personalInfo} />
      </main>
      <ChatWidget />
      <footer className="text-center py-6 bg-stone-100 text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;