import React from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { Github, Linkedin, Mail, Send, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  send: Send,
};

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-2/3 bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none"></div>
      
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 space-y-8 animate-slide-up text-center md:text-left">
          <div className="inline-block px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-base font-semibold tracking-wide mb-2">
            Available for opportunities
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-heading leading-[1.1] tracking-tight">
            <span className="block">Samuel</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
              Girma.
            </span>
          </h1>
          
          <div className="space-y-4">
             <p className="text-3xl md:text-4xl text-body font-light">
               Software Engineer
             </p>
             <p className="text-muted text-xl md:text-2xl leading-relaxed max-w-xl mx-auto md:mx-0">
               {PERSONAL_INFO.summary}
             </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-secondary border border-border rounded-full text-body hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-sm"
                  aria-label={link.name}
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>

          <div className="pt-6 flex justify-center md:justify-start">
            <a 
              href="#experience" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-heading text-primary rounded-full text-lg font-semibold hover:bg-accent hover:text-white transition-all shadow-lg hover:shadow-accent/25 group"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-md md:max-w-full flex justify-center md:justify-end animate-fade-in delay-200">
          <div className="relative w-full aspect-[3/4] md:max-w-[400px] lg:max-w-[450px]">
            {/* Image Frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 rounded-[2rem] rotate-3 opacity-20 blur-xl"></div>
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-secondary group">
               <div className="w-full h-full scale-x-[-1]">
                 <img 
                   src="/portfolio.png" 
                   alt="Samuel Girma Megra" 
                   className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                 />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                 <p className="text-white font-medium">Software Engineer • Full Stack</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};