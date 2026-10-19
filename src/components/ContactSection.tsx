import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Copy, Check, Edit2, ArrowUp } from 'lucide-react';
import { PROFILE_DATA } from '../data/initialData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface ContactSectionProps {
  triggerToast: (msg: string) => void;
}

const STORAGE_KEY_WHATSAPP = 'bireke_whatsapp_number_v1';

export const ContactSection: React.FC<ContactSectionProps> = ({ triggerToast }) => {
  const { isDark } = useTheme();
  const { requireAuth } = useAuth();

  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_WHATSAPP) || PROFILE_DATA.whatsappRaw;
    } catch {
      return PROFILE_DATA.whatsappRaw;
    }
  });

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(whatsappNumber);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    subject: 'Projet / Collaboration',
    message: ''
  });

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = tempPhone.replace(/[^0-9]/g, '');
    if (cleanNumber.length < 9) {
      triggerToast('Veuillez entrer un numéro valide (avec indicatif pays, ex: 2439994286469).');
      return;
    }
    setWhatsappNumber(cleanNumber);
    try {
      localStorage.setItem(STORAGE_KEY_WHATSAPP, cleanNumber);
      triggerToast('Numéro WhatsApp mis à jour avec succès !');
    } catch {
      // Ignored
    }
    setIsEditingPhone(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    triggerToast('Adresse e-mail copiée !');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(PROFILE_DATA.phone);
    setCopiedPhone(true);
    triggerToast('Numéro de téléphone copié !');
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      triggerToast('Veuillez renseigner au minimum votre nom et votre message.');
      return;
    }

    const text = `*Message de contact via Portfolio*\n\n*Nom :* ${formData.name}\n*Contact/Email :* ${formData.contactInfo || 'Non spécifié'}\n*Objet :* ${formData.subject}\n\n*Message :*\n${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    triggerToast('Redirection directe vers votre discussion WhatsApp...');
  };

  const handleSendViaEmail = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      triggerToast('Veuillez renseigner votre nom et votre message.');
      return;
    }
    const mailto = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      `[Portfolio] ${formData.subject} - ${formData.name}`
    )}&body=${encodeURIComponent(
      `Bonjour Bireke Idea,\n\n${formData.message}\n\nDe : ${formData.name}\nContact : ${formData.contactInfo}`
    )}`;
    window.location.href = mailto;
    triggerToast('Ouverture du client e-mail...');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête de section */}
        <div className="border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact Direct</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
            Me contacter directement
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
            Échangez directement avec moi sur WhatsApp ou par e-mail pour vos projets et propositions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Colonne gauche : Coordonnées Directes & WhatsApp en vedette */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Boîte Principale WhatsApp */}
            <div className="bg-[#8B4513] text-white rounded-xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-white" />
                <h3 className="font-bold uppercase text-sm sm:text-base tracking-wide">
                  WhatsApp Direct
                </h3>
              </div>
              <p className="text-xs text-[#FDF8F5] leading-relaxed">
                Le moyen le plus rapide pour me joindre directement. Cliquez ci-dessous pour ouvrir immédiatement une discussion sur mon numéro.
              </p>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent("Bonjour Bireke Idea, je vous contacte directement depuis votre portfolio.");
                    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                  }}
                  className="w-full py-2.5 bg-white text-[#8B4513] hover:bg-[#F9FAFB] font-bold text-xs uppercase rounded-lg shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#8B4513]" />
                  <span>Ouvrir mon WhatsApp ({PROFILE_DATA.phone})</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#FDF8F5] pt-1">
                  <span>Numéro actif : {whatsappNumber}</span>
                  <button
                    onClick={() => {
                      requireAuth(() => {
                        setTempPhone(whatsappNumber);
                        setIsEditingPhone(!isEditingPhone);
                      });
                    }}
                    className="underline text-white font-semibold cursor-pointer inline-flex items-center gap-1"
                    title="Modifier le numéro WhatsApp (Accès propriétaire requis)"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Modifier le numéro</span>
                  </button>
                </div>

                {isEditingPhone && (
                  <form onSubmit={handleSavePhone} className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="Ex: 2439994286469"
                      className="px-2 py-1 text-xs rounded bg-white text-black flex-1 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 bg-black text-white text-xs font-bold uppercase rounded cursor-pointer"
                    >
                      Sauvegarder
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Boîte Coordonnées E-mail & Téléphone */}
            <div className="bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513]">
                Autres canaux de communication
              </h3>

              <div className="space-y-2 text-xs">
                {/* E-mail */}
                <div className="p-2.5 bg-[#F4F4F5] dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Mail className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                    <a
                      href={`mailto:${PROFILE_DATA.email}`}
                      className="text-gray-900 dark:text-white font-semibold truncate hover:underline"
                    >
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-gray-500 hover:text-[#8B4513] cursor-pointer shrink-0"
                    title="Copier l'e-mail"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Téléphone */}
                <div className="p-2.5 bg-[#F4F4F5] dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {PROFILE_DATA.phone}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1 text-gray-500 hover:text-[#8B4513] cursor-pointer"
                    title="Copier le téléphone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Ville & Campus */}
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-xs pt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                  <span>{PROFILE_DATA.city} · {PROFILE_DATA.university}</span>
                </div>
              </div>

              {/* Réseaux */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-2">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-[11px] font-bold uppercase inline-flex items-center gap-1.5 hover:border-[#8B4513]"
                  title="Consulter le profil GitHub birekeidea-max"
                >
                  <Github className="w-3 h-3 text-[#8B4513]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-[11px] font-bold uppercase inline-flex items-center gap-1.5 hover:border-[#8B4513]"
                  title="Consulter le profil LinkedIn Idea Bireke"
                >
                  <Linkedin className="w-3 h-3 text-[#8B4513]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE_DATA.x}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-[11px] font-bold uppercase inline-flex items-center gap-1.5 hover:border-[#8B4513]"
                  title="Consulter le compte X @IdeaB19613"
                >
                  <Twitter className="w-3 h-3 text-[#8B4513]" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>

          </div>

          {/* Colonne droite : Formulaire qui renvoie directement dans WhatsApp */}
          <div className="lg:col-span-7 bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            
            <div className="space-y-0.5">
              <h3 className="font-bold uppercase text-base text-[#111827] dark:text-[#F4F4F5]">
                Envoyer un message direct
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                Remplissez les champs ci-dessous : votre message sera transmis directement dans WhatsApp à Bireke Idea.
              </p>
            </div>

            <form onSubmit={handleSendViaWhatsApp} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-900 dark:text-gray-100">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Patrick Cishugi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-900 dark:text-gray-100">
                    Votre contact (Téléphone ou Email)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: +243... ou nom@domaine.com"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1 text-gray-900 dark:text-gray-100">
                  Objet de l'échange
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ex: Proposition de projet, stage, collaboration..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1 text-gray-900 dark:text-gray-100">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Écrivez votre message ici..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  Transmission instantanée vers WhatsApp : {PROFILE_DATA.phone}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSendViaEmail}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded font-bold uppercase text-[11px] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    Via E-mail
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white rounded font-bold uppercase text-xs inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Envoyer sur WhatsApp</span>
                  </button>
                </div>
              </div>
            </form>

          </div>

        </div>

        {/* Footer épuré */}
        <footer className="pt-4 border-t border-[#D1D5DB] dark:border-[#3F3F46] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
          <div>
            <span className="font-bold text-[#111827] dark:text-white uppercase">{PROFILE_DATA.name}</span>
            <span> — Étudiant en Sciences Informatiques à l'UCB (Bukavu, RD Congo)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-[#8B4513] transition-colors inline-flex items-center gap-1 cursor-pointer uppercase font-bold"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </footer>

      </div>
    </section>
  );
};
