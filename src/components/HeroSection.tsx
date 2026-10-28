import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, FileText, ArrowRight, Github, Linkedin, Twitter, Mail, MapPin, GraduationCap, Upload, Trash2, Check, Link as LinkIcon, Globe, X, Info } from 'lucide-react';
import { PROFILE_DATA } from '../data/initialData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { processAndUploadImage, fetchSharedPortfolioState, syncPortfolioState } from '../utils/imageUpload';

interface HeroSectionProps {
  onOpenCv: () => void;
  triggerToast: (msg: string) => void;
}

const STORAGE_KEY_AVATAR = 'bireke_custom_avatar_img';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCv, triggerToast }) => {
  const { isDark } = useTheme();
  const { requireAuth } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AVATAR);
      return saved || PROFILE_DATA.avatar || '/images/bireke-idea-profile.jpg';
    } catch {
      return PROFILE_DATA.avatar || '/images/bireke-idea-profile.jpg';
    }
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    let active = true;
    fetchSharedPortfolioState().then((shared) => {
      if (!active || !shared) return;
      if (shared.avatarUrl && typeof shared.avatarUrl === 'string') {
        setAvatarUrl(shared.avatarUrl);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      triggerToast('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const uploadedUrl = await processAndUploadImage(file, 'avatar');
      setAvatarUrl(uploadedUrl);
      syncPortfolioState({ avatarUrl: uploadedUrl });
      try {
        localStorage.setItem(STORAGE_KEY_AVATAR, uploadedUrl);
      } catch {
        // Ignored
      }
      triggerToast('Photo de profil téléchargée et visible pour tous les visiteurs !');
      setIsPhotoModalOpen(false);
    } catch {
      triggerToast('Erreur lors du traitement de la photo.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = photoUrlInput.trim();
    if (!trimmed) {
      triggerToast('Veuillez entrer une adresse URL valide.');
      return;
    }
    setAvatarUrl(trimmed);
    syncPortfolioState({ avatarUrl: trimmed });
    try {
      localStorage.setItem(STORAGE_KEY_AVATAR, trimmed);
    } catch {
      // Ignored
    }
    setIsPhotoModalOpen(false);
    setPhotoUrlInput('');
    triggerToast('URL d\'image publique enregistrée (optimale pour Google Images) !');
  };

  const handleResetToDefault = () => {
    const defaultUrl = '/images/bireke-idea-profile.jpg';
    setAvatarUrl(defaultUrl);
    syncPortfolioState({ avatarUrl: defaultUrl });
    try {
      localStorage.removeItem(STORAGE_KEY_AVATAR);
      triggerToast('Photo réinitialisée avec l\'image publique indexable.');
    } catch {
      // Ignored
    }
    setIsPhotoModalOpen(false);
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
              <img
                src={avatarUrl || '/images/bireke-idea-profile.jpg'}
                alt="Photo officielle de BIREKE BASHIGE IDEA — Développeur Informatique Bukavu (UCB)"
                title="BIREKE BASHIGE IDEA — Développeur Informatique"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bouton de survol pour changer facilement d'image */}
            <button
              onClick={() => requireAuth(() => setIsPhotoModalOpen(true))}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-[#8B4513] text-white hover:bg-[#70360F] shadow-sm cursor-pointer transition-transform hover:scale-105"
              title="Gérer ou modifier ma photo de profil (Accès propriétaire requis)"
              aria-label="Gérer ma photo de profil"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs pt-0.5">
            <button
              onClick={() => requireAuth(() => setIsPhotoModalOpen(true))}
              className="text-[#8B4513] font-bold hover:underline cursor-pointer uppercase flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>Gérer / Changer ma photo</span>
            </button>
            <span className="text-gray-400">·</span>
            <button
              onClick={() => requireAuth(handleResetToDefault)}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              title="Réinitialiser avec l'image publique indexable (Accès propriétaire requis)"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* MODALE GESTION PHOTO DE PROFIL (OPTIMISÉE POUR GOOGLE IMAGES & FICHIERS) */}
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative text-left">
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#8B4513]" />
                  <span>Photo de profil & Indexation Google</span>
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Choisissez la méthode pour afficher votre photo professionnelle sur votre portfolio.
                </p>
              </div>

              {/* Note d'explication Google Indexation */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs space-y-1 text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center gap-1.5 uppercase">
                  <Info className="w-3.5 h-3.5" />
                  <span>Comment Google indexe votre photo ?</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Pour être indexée dans Google Images, une photo doit posséder une <strong>URL Web publique accessible</strong> (ex: hébergée dans votre projet ou sur GitHub). Les images importées en local depuis le navigateur ne sont visibles que par vous.
                </p>
              </div>

              {/* Option A: Upload local */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
                <div className="font-bold text-xs uppercase text-[#8B4513]">
                  Option 1 : Téléverser un fichier depuis votre appareil
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border file:border-gray-300 file:text-xs file:font-bold file:bg-[#8B4513] file:text-white cursor-pointer"
                />
              </div>

              {/* Option B: URL Web publique (optimale pour Google Images) */}
              <form onSubmit={handleApplyUrl} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
                <div className="font-bold text-xs uppercase text-[#8B4513] flex items-center justify-between">
                  <span>Option 2 : URL d'image publique (Recommandé Google Images)</span>
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://raw.githubusercontent.com/... ou lien d'hébergeur"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 text-xs border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold uppercase rounded cursor-pointer"
                  >
                    Appliquer
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Lien direct (JPG, PNG, WebP) accessible publiquement sur internet.
                </p>
              </form>

              {/* Option C: Image par défaut du projet */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#8B4513] font-bold uppercase"
                >
                  Utiliser l'image publique du projet (/images/bireke-idea-profile.jpg)
                </button>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-bold uppercase"
                >
                  Fermer
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. NOM ET TITRE EN MAJUSCULES (AVEC MICRODATA SCHEMA.ORG POUR GOOGLE) */}
        <div className="space-y-1.5" itemScope itemType="https://schema.org/Person">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FBF4EE] dark:bg-[#27272A] border border-[#8B4513] text-[#8B4513] text-[11px] font-bold uppercase tracking-wider">
            <span>Développeur Full-Stack · Administration Réseau · Cisco CCNA · Expert IT Polyvalent</span>
          </div>
          <h1 itemProp="name" className="text-2xl sm:text-3xl font-extrabold tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            {PROFILE_DATA.name}
          </h1>
          <p itemProp="jobTitle" className="text-xs sm:text-sm font-bold text-[#8B4513] uppercase tracking-wide">
            {PROFILE_DATA.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-800 dark:text-gray-200 font-medium pt-1">
            <span className="inline-flex items-center gap-1" itemProp="affiliation">
              <GraduationCap className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Université Catholique de Bukavu (UCB)</span>
            </span>
            <span className="text-[#8B4513] font-bold">·</span>
            <span className="inline-flex items-center gap-1" itemProp="address">
              <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Bukavu, Sud-Kivu, RD Congo</span>
            </span>
          </div>

          {/* 3. DESCRIPTIF PUBLIC INDEXÉ DU PROFIL */}
          <div className="max-w-3xl mx-auto mt-3 bg-white dark:bg-[#27272A] p-4 sm:p-5 rounded-xl border-2 border-[#8B4513] text-left space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-700 pb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B4513]">
                Déclaration Officielle de Spécialisation — Expert IT Polyvalent
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#8B4513] text-white">
                Cisco CCNA &amp; Full-Stack
              </span>
            </div>
            <p itemProp="description" className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed font-medium">
              {PROFILE_DATA.shortBio}
            </p>
            <p className="text-xs text-gray-800 dark:text-gray-200 font-bold leading-relaxed pt-1 border-t border-gray-100 dark:border-gray-800">
              « {PROFILE_DATA.catchphrase} »
            </p>
          </div>
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
            className="px-5 py-2.5 bg-[#E5E7EB] dark:bg-[#3F3F46] hover:bg-[#D1D5DB] dark:hover:bg-[#52525B] text-gray-900 dark:text-white text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1.5 uppercase tracking-wide"
          >
            <span>Mes projets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5. COORDONNÉES RAPIDES */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-800 dark:text-gray-200 font-medium pt-1">
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>GitHub : birekeidea-max</span>
          </a>
          <span className="text-gray-400">·</span>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>LinkedIn : Idea Bireke</span>
          </a>
          <span className="text-gray-400">·</span>
          <a
            href={PROFILE_DATA.x}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Twitter className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>X : @IdeaB19613</span>
          </a>
          <span className="text-gray-400">·</span>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-1 hover:text-[#8B4513] transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>WhatsApp : {PROFILE_DATA.phone}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
