import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { Code2, Database, Layout, MessageSquare } from 'lucide-react';

export const Skills: React.FC = () => {
  const getIcon = (title: string) => {
    switch (title) {
      case 'Frontend': return <Layout className="text-blue-500" />;
      case 'Backend': return <Code2 className="text-emerald-500" />;
      case 'Databases': return <Database className="text-purple-500" />;
      case 'Tools & Platforms': return <MessageSquare className="text-orange-500" />;
      default: return <Code2 className="text-gray-500" />;
    }
  };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6">Technical Expertise</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            My stack is focused on modern, scalable technologies that enable fast production of robust applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <div 
              key={category.title} 
              className="bg-secondary rounded-2xl p-8 border-2 border-border hover:border-accent/50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-2 duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-primary rounded-xl border border-border">
                  {getIcon(category.title)}
                </div>
                <h3 className="text-2xl font-bold text-heading">{category.title}</h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between text-base text-muted mb-2">
                      <span className="group-hover:text-heading transition-colors font-medium">{skill.name}</span>
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-primary rounded-full overflow-hidden border border-border/50">
                      <div 
                        className="h-full bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-400 group-hover:from-accent group-hover:to-blue-500 transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};