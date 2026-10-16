import React, { useState } from 'react';
import { Menu, X, Sun, Moon, MessageCircle, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROFILE_DATA } from '../data/initialData';

interface NavbarProps {
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv }) => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour Bireke Idea, je vous contacte depuis votre portfolio.");
    window.open(`https://wa.me/${PROFILE_DATA.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F4F5]/95 dark:bg-[#18181B]/95 backdrop-blur-xs border-b border-[#D1D5DB] dark:border-[#3F3F46] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Identité / Logo sobre */}
        <button
          onClick={() => scrollTo('hero')}
          className="text-left cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#8B4513] text-white flex items-center justify-center font-bold text-xs">
            BI
          </div>
          <span className="font-bold text-sm sm:text-base tracking-wider text-[#111827] dark:text-[#F4F4F5] uppercase">
            BIREKE <span className="text-[#8B4513]">IDEA</span>
          </span>
        </button>

        {/* Menu Desktop en MAJUSCULES */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
          <button onClick={() => scrollTo('hero')} className="hover:text-[#8B4513] cursor-pointer">
            Accueil
          </button>
          <button onClick={() => scrollTo('a-propos')} className="hover:text-[#8B4513] cursor-pointer">
            À propos
          </button>
          <button onClick={() => scrollTo('competences')} className="hover:text-[#8B4513] cursor-pointer">
            Compétences
          </button>
          <button onClick={() => scrollTo('projets')} className="hover:text-[#8B4513] cursor-pointer">
            Projets
          </button>
          <button onClick={() => scrollTo('photos')} className="hover:text-[#8B4513] cursor-pointer">
            Photos
          </button>
          <button onClick={() => scrollTo('experiences')} className="hover:text-[#8B4513] cursor-pointer">
            Parcours
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-[#8B4513] cursor-pointer">
            Contact
          </button>
        </nav>

        {/* Boutons d'Action : Mode Sombre/Clair & WhatsApp */}
        <div className="flex items-center gap-2">
          
          {/* Petit bouton pour le mode sombre et clair */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-800 dark:text-gray-200 hover:text-[#8B4513] cursor-pointer transition-colors"
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            aria-label="Mode sombre/clair"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Bouton CV */}
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex px-3 py-1.5 border border-[#8B4513] text-[#8B4513] bg-white dark:bg-[#27272A] rounded-lg text-xs font-bold uppercase hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer items-center gap-1 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Mon CV</span>
          </button>

          {/* Bouton WhatsApp direct */}
          <button
            onClick={openWhatsApp}
            className="px-3 py-1.5 bg-[#8B4513] hover:bg-[#70360F] text-white rounded-lg text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Contacter directement sur WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Bouton Hamburger mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-[#D1D5DB] dark:border-[#3F3F46] md:hidden text-gray-700 dark:text-gray-300 cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-5 py-4 space-y-3 text-xs font-bold uppercase">
          <nav className="flex flex-col space-y-2.5 text-gray-800 dark:text-gray-200">
            <button onClick={() => scrollTo('hero')} className="text-left py-1 hover:text-[#8B4513]">
              Accueil
            </button>
            <button onClick={() => scrollTo('a-propos')} className="text-left py-1 hover:text-[#8B4513]">
              À propos
            </button>
            <button onClick={() => scrollTo('competences')} className="text-left py-1 hover:text-[#8B4513]">
              Compétences
            </button>
            <button onClick={() => scrollTo('projets')} className="text-left py-1 hover:text-[#8B4513]">
              Projets
            </button>
            <button onClick={() => scrollTo('photos')} className="text-left py-1 hover:text-[#8B4513]">
              Photos
            </button>
            <button onClick={() => scrollTo('experiences')} className="text-left py-1 hover:text-[#8B4513]">
              Parcours & Formation
            </button>
            <button onClick={() => scrollTo('contact')} className="text-left py-1 hover:text-[#8B4513]">
              Contact direct
            </button>
          </nav>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full py-2 border border-[#8B4513] text-[#8B4513] rounded-lg text-center font-bold uppercase"
            >
              Consulter mon CV
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full py-2 bg-[#8B4513] text-white rounded-lg text-center font-bold uppercase flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Échanger sur WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
