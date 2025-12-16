import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { AIChat } from './components/AIChat';

const App: React.FC = () => {
  // Initialize theme from local storage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-primary transition-colors duration-300">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <footer className="bg-secondary py-6 text-center text-muted text-sm border-t border-border transition-colors duration-300">
        <p>© {new Date().getFullYear()} Samuel Girma Megra. Built with React & Tailwind CSS.</p>
      </footer>

      {/* Floating AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;