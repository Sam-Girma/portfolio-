import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal, Mail, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience', icon: Terminal },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/80 backdrop-blur-lg shadow-sm border-b border-border py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold tracking-tighter text-heading hover:text-accent transition-colors">
          Samuel<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-base font-medium text-muted hover:text-heading transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-px h-6 bg-border mx-2"></div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted hover:bg-secondary hover:text-heading transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <a 
            href="https://linkedin.com/in/samuel-girma-megra/" 
            target="_blank" 
            rel="noreferrer"
            className="px-7 py-3 rounded-full bg-heading text-primary font-semibold text-base hover:bg-accent hover:text-white transition-all shadow-lg shadow-heading/5"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-heading hover:bg-secondary transition-colors"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button 
            className="text-heading hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary border-t border-border py-8 px-6 shadow-2xl animate-fade-in h-screen">
          <div className="flex flex-col gap-8 items-center pt-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-medium text-heading hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a 
              href="https://linkedin.com/in/samuel-girma-megra/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-8 px-8 py-3 rounded-full bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};