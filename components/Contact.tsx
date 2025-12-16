import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Mail, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary -z-10"></div>
      
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 text-accent rounded-full mb-8 border-2 border-accent/20">
             <MessageCircle size={40} />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-8">Let's Work Together</h2>
          
          <p className="text-muted text-xl md:text-2xl mb-12 leading-relaxed">
            Whether you have a question, a project opportunity, or just want to say hi, I'm always open to discussing new challenges.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <a 
               href={`mailto:${PERSONAL_INFO.email}`} 
               className="flex items-center gap-3 px-10 py-5 bg-accent text-white text-lg font-bold rounded-xl hover:bg-accent-hover transition-all transform hover:-translate-y-1 shadow-xl shadow-accent/20"
             >
               <Mail size={24} />
               Send an Email
             </a>
             <a 
               href="https://t.me/SamuelMegra" 
               target="_blank"
               rel="noreferrer" 
               className="flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-muted text-heading text-lg font-semibold rounded-xl hover:bg-secondary hover:border-heading transition-all"
             >
               Telegram Me
             </a>
          </div>

          <div className="mt-16 p-8 bg-primary/50 rounded-2xl border-2 border-border inline-block shadow-lg">
             <p className="text-muted font-mono text-base md:text-lg">
                email: <span className="text-accent select-all font-semibold">{PERSONAL_INFO.email}</span>
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};