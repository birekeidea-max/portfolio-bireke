import React from 'react';
import { User, Target, Lightbulb, Check, Compass } from 'lucide-react';
import { PROFILE_DATA } from '../data/initialData';

export const AboutSection: React.FC = () => {
  return (
    <section id="a-propos" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        
        {/* En-tête de section */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Présentation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            À propos de Bireke Idea
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Parcours académique, vision technologique et engagement pour l'innovation locale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Colonne gauche : Parcours détaillé */}
          <div className="lg:col-span-7 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-4 shadow-xs">
            <h3 className="text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#8B4513]" />
              <span>Parcours et vision en développement logiciel</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed">
              {PROFILE_DATA.aboutMeParagraphs.map((par, idx) => (
                <p key={idx} className="text-gray-900 dark:text-white leading-relaxed">{par}</p>
              ))}
            </div>

            {/* Encadré Démarche */}
            <div className="p-3.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513]">
                <Compass className="w-3.5 h-3.5" />
                <span>Mon approche</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                Apprendre avec rigueur, concevoir des solutions modulaires et stables, et collaborer activement au sein de projets technologiques utiles à Bukavu et dans la région.
              </p>
            </div>
          </div>

          {/* Colonne droite : Centres d'intérêt */}
          <div className="lg:col-span-5 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-3 shadow-xs">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#8B4513]" />
                <span>Domaines d'intérêt majeurs</span>
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                Piliers technologiques développés au quotidien :
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {PROFILE_DATA.interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700"
                >
                  <Check className="w-3.5 h-3.5 text-[#8B4513] shrink-0 mt-0.5" />
                  <span className="text-gray-900 dark:text-white leading-relaxed font-medium">
                    {interest}
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
