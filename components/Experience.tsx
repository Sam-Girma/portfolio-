import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { Building2, CheckCircle2, Server, Terminal, ChevronRight, Briefcase } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6">Work Experience</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            A journey through impactful projects and innovative solutions across diverse industries
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {EXPERIENCE_DATA.map((job, index) => (
            <div 
              key={job.id} 
              className="group relative"
            >
              {/* Card with full width design */}
              <div className="bg-gradient-to-br from-secondary to-secondary/50 p-8 md:p-10 rounded-3xl border-2 border-border hover:border-accent/50 transition-all shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 duration-300">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-accent/10 rounded-2xl border-2 border-accent/20 flex-shrink-0">
                      <Briefcase size={32} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-heading mb-2">{job.company}</h3>
                      <p className="text-accent text-xl md:text-2xl font-semibold mb-2">{job.role}</p>
                      <span className="inline-block px-4 py-1.5 text-sm rounded-full bg-primary text-muted border border-border font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Visual Badge */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-500 text-white font-bold text-2xl shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted mb-8 leading-relaxed text-base md:text-lg border-l-4 border-accent/30 pl-6 italic">
                  {job.description}
                </p>

                {/* Two Column Layout for Achievements and Highlight */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Achievements Column */}
                  {job.achievements && job.achievements.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-4">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-body text-base">
                            <ChevronRight size={20} className="text-accent mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlight Column */}
                  <div className="space-y-6">
                    {job.highlight && (
                      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 rounded-2xl border-2 border-emerald-500/30 h-full">
                        <div className="flex items-center gap-3 text-emerald-500 font-bold text-lg mb-4">
                          <CheckCircle2 size={24} />
                          <span>Key Achievement</span>
                        </div>
                        <p className="text-body text-base leading-relaxed">{job.highlight}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies Section */}
                <div className="pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold text-heading mb-4">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-3">
                    {job.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-4 py-2 bg-primary text-body text-sm md:text-base rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-2 font-medium"
                      >
                         {tech.includes('React') || tech.includes('Node') ? <Terminal size={14} /> : <Server size={14} />}
                         {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};