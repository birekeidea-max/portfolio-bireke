import React from 'react';
import { GraduationCap, Languages, Network } from 'lucide-react';
import { EDUCATION_DATA, LANGUAGES_DATA } from '../data/initialData';

export const EducationSection: React.FC = () => {
  return (
    <section id="formation" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Cursus & Communication</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            Formation Académique & Langues
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Études universitaires en Sciences Informatiques et compétences linguistiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Colonne gauche : Formation académique */}
          <div className="lg:col-span-7 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider block">
                  Université Partenaire
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                  {EDUCATION_DATA.institution}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                  {EDUCATION_DATA.degree}
                </p>
              </div>

              <span className="self-start sm:self-auto px-2.5 py-1 rounded text-[10px] font-semibold bg-[#F4F4F5] dark:bg-[#18181B] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                {EDUCATION_DATA.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-relaxed font-normal">
              {EDUCATION_DATA.description}
            </p>

            {/* Rubrique complémentaire réseaux et télécoms */}
            <div className="p-3 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513]">
                <Network className="w-3.5 h-3.5" />
                <span>Apprentissage complémentaire</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
                {EDUCATION_DATA.complementary}
              </p>
            </div>
          </div>

          {/* Colonne droite : Langues */}
          <div className="lg:col-span-5 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-3 shadow-xs">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#8B4513]" />
                <h3 className="text-sm font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                  Langues Pratiquées
                </h3>
              </div>
              <span className="text-[11px] text-gray-700 dark:text-gray-300 font-medium">Communication</span>
            </div>

            <div className="space-y-2">
              {LANGUAGES_DATA.map((lang, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 text-xs"
                >
                  <span className="font-bold text-gray-900 dark:text-white">
                    {lang.name}
                  </span>
                  <span className="text-[11px] text-[#8B4513] font-semibold">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
