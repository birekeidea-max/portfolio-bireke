import React from 'react';
import { Sparkles, Check, Calendar, Award } from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/initialData';

export const ExperiencesSection: React.FC = () => {
  return (
    <section id="experiences" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête de section */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Activités & Communautés</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            Parcours dans l'innovation
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Participation aux initiatives d'incubation, hackathons et ateliers d'intelligence artificielle.
          </p>
        </div>

        {/* Timeline verticale compacte */}
        <div className="relative border-l-2 border-[#8B4513] ml-3 sm:ml-4 space-y-5 pl-5 sm:pl-6">
          {EXPERIENCES_DATA.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Point de repère */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#18181B] border-2 border-[#8B4513]" />

              {/* Carte */}
              <div className="bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-4 sm:p-5 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider block">
                      {exp.organization}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                      {exp.title}
                    </h3>
                  </div>

                  {exp.badge && (
                    <span className="self-start sm:self-auto px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F4F4F5] dark:bg-[#18181B] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                      {exp.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-relaxed font-normal">
                  {exp.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase text-[#111827] dark:text-[#F4F4F5] block">
                    Points marquants :
                  </span>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#8B4513] shrink-0 mt-0.5" />
                        <span className="text-gray-900 dark:text-gray-100">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
