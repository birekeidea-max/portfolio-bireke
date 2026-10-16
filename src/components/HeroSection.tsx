import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, FileText, ArrowRight, Github, Mail, MapPin, GraduationCap, Upload, Trash2, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/initialData';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onOpenCv: () => void;
  triggerToast: (msg: string) => void;
}

const STORAGE_KEY_AVATAR = 'bireke_custom_avatar_img';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCv, triggerToast }) => {
  const { isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AVATAR) || '';
    } catch {
      return '';
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      triggerToast('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatarUrl(result);
      try {
        localStorage.setItem(STORAGE_KEY_AVATAR, result);
        triggerToast('Photo de profil mise à jour avec succès !');
      } catch {
        triggerToast('Photo chargée pour la session.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    try {
      localStorage.removeItem(STORAGE_KEY_AVATAR);
      triggerToast('Photo supprimée. Vous pouvez insérer votre propre image.');
    } catch {
      // Ignored
    }
  };

  const openWhatsApp = () => {
    const defaultMsg = encodeURIComponent("Bonjour Bireke Idea, je vous contacte depuis votre portfolio professionnel.");
    window.open(`https://wa.me/${PROFILE_DATA.whatsappRaw}?text=${defaultMsg}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-4 sm:pt-6 pb-6 border-b transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        
        {/* 1. LA PHOTO DE PROFIL COMMENCE EN PREMIER */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative group">
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-[#8B4513] shadow-md overflow-hidden bg-[#E5E7EB] dark:bg-[#27272A] flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={PROFILE_DATA.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#8B4513] p-2">
                  <span className="text-3xl font-bold tracking-wider">BI</span>
                  <span className="text-[10px] text-gray-500 uppercase mt-1">Votre photo</span>
                </div>
              )}
            </div>

            {/* Bouton de survol pour changer facilement d'image */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-[#8B4513] text-white hover:bg-[#70360F] shadow-sm cursor-pointer transition-transform hover:scale-105"
              title="Insérer ou changer ma photo de profil"
              aria-label="Insérer ma photo"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          {/* Contrôles utilisateur pour insérer sa propre image */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="flex items-center gap-2 text-xs pt-0.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[#8B4513] font-bold hover:underline cursor-pointer uppercase flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>{avatarUrl ? 'Changer ma photo' : 'Insérer ma photo personnelle'}</span>
            </button>
            {avatarUrl && (
              <>
                <span className="text-gray-400">·</span>
                <button
                  onClick={handleRemoveAvatar}
                  className="text-gray-500 hover:text-red-600 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Supprimer</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 2. NOM ET TITRE EN MAJUSCULES */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#8B4513] uppercase tracking-wide">
            {PROFILE_DATA.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400 pt-1">
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Université Catholique de Bukavu (UCB)</span>
            </span>
            <span className="text-gray-400">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Bukavu, Sud-Kivu, RD Congo</span>
            </span>
          </div>
        </div>

        {/* 3. DESCRIPTIF DU PROFIL */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#27272A] p-4 rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] text-left space-y-2 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            « {PROFILE_DATA.catchphrase} »
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {PROFILE_DATA.shortBio}
          </p>
        </div>

        {/* 4. BOUTONS D'ACTION (WHATSAPP EN DIRECT, CV, PROJETS) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          {/* Bouton WhatsApp direct */}
          <button
            onClick={openWhatsApp}
            className="px-5 py-2.5 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm cursor-pointer transition-colors inline-flex items-center gap-2 uppercase tracking-wide"
            title="Ouvrir directement WhatsApp avec le numéro de Bireke Idea"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Me contacter sur WhatsApp</span>
          </button>

          {/* Bouton CV */}
          <button
            onClick={onOpenCv}
            className="px-5 py-2.5 bg-white dark:bg-[#27272A] hover:bg-[#F9FAFB] dark:hover:bg-[#333338] text-[#8B4513] border border-[#8B4513] text-xs sm:text-sm font-bold rounded-lg shadow-xs cursor-pointer transition-colors inline-flex items-center gap-2 uppercase tracking-wide"
            title="Consulter et télécharger le CV"
          >
            <FileText className="w-4 h-4 text-[#8B4513]" />
            <span>Télécharger mon CV</span>
          </button>

          {/* Bouton Projets */}
          <button
            onClick={() => scrollToSection('projets')}
            className="px-5 py-2.5 bg-[#E5E7EB] dark:bg-[#3F3F46] hover:bg-[#D1D5DB] dark:hover:bg-[#52525B] text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1.5 uppercase tracking-wide"
          >
            <span>Mes projets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5. COORDONNÉES RAPIDES */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400 pt-1">
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>GitHub : github.com/bireke</span>
          </a>
          <span className="text-gray-400">·</span>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>WhatsApp : {PROFILE_DATA.phone}</span>
          </button>
          <span className="text-gray-400">·</span>
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>Email : {PROFILE_DATA.email}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
