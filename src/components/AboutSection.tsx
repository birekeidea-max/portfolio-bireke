import React from 'react';
import { User, Target, Lightbulb, Check, Compass, Network, Award } from 'lucide-react';
import { PROFILE_DATA } from '../data/initialData';

export const AboutSection: React.FC = () => {
  return (
    <section id="a-propos" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        
        {/* En-tête de section */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Présentation & Expertise IT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            À propos de Bireke Idea — Développeur Informatique & Cisco CCNA
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Développement Web & Logiciel, Intelligence Artificielle, Réseaux et Infrastructures Informatiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Colonne gauche : Parcours détaillé */}
          <div className="lg:col-span-7 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-4 shadow-xs">
            <h3 className="text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#8B4513]" />
              <span>Parcours, Vision Logicielle & Réseaux</span>
            </h3>

            {/* Encadré Phare : Cisco CCNA & Réseaux */}
            <div className="p-3.5 rounded-lg bg-[#FBF4EE] dark:bg-[#18181B] border-l-4 border-[#8B4513] space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513]">
                  <Network className="w-4 h-4" />
                  <span>Focus Actuel : Certification Cisco CCNA & Réseaux</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#8B4513] text-white text-[10px] font-bold uppercase inline-flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Finalisation en cours</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed font-medium">
                {PROFILE_DATA.aboutMeParagraphs[0]}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed">
              {PROFILE_DATA.aboutMeParagraphs.slice(1).map((par, idx) => (
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
                Apprendre avec rigueur, concevoir des solutions modulaires et stables, et maîtriser de bout en bout le génie logiciel ainsi que les infrastructures réseaux à Bukavu et dans la région.
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
