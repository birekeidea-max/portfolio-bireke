import React from 'react';
import { Code, Smartphone, Database, Bot, Network, Layers } from 'lucide-react';
import { SKILL_CATEGORIES_DATA } from '../data/initialData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code className="w-4 h-4 text-[#8B4513]" />;
      case 1:
        return <Smartphone className="w-4 h-4 text-[#8B4513]" />;
      case 2:
        return <Database className="w-4 h-4 text-[#8B4513]" />;
      case 3:
        return <Bot className="w-4 h-4 text-[#8B4513]" />;
      default:
        return <Network className="w-4 h-4 text-[#8B4513]" />;
    }
  };

  return (
    <section id="competences" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Savoir-faire Technique</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            Compétences & Technologies
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Présentation claire des technologies utilisées dans mes projets et des disciplines étudiées.
          </p>
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES_DATA.map((category, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-3 shadow-xs"
            >
              {/* En-tête de catégorie */}
              <div className="flex items-center gap-2.5 border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <div className="p-1.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700">
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-2">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#111827] dark:text-[#F4F4F5]">
                        {skill.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-[#27272A] text-[#8B4513] border border-gray-300 dark:border-gray-600">
                        {skill.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
                      {skill.description}
                    </p>
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
