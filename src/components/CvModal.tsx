import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, MessageCircle, MapPin, Mail, GraduationCap } from 'lucide-react';
import { PROFILE_DATA, EDUCATION_DATA, EXPERIENCES_DATA, SKILL_CATEGORIES_DATA, LANGUAGES_DATA } from '../data/initialData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerToast: (msg: string) => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, triggerToast }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
CURRICULUM VITAE - ${PROFILE_DATA.name}
${PROFILE_DATA.title}
Université : ${EDUCATION_DATA.institution}
Contact : ${PROFILE_DATA.phone} | Email : ${PROFILE_DATA.email} | Ville : ${PROFILE_DATA.city}
GitHub : ${PROFILE_DATA.github} | LinkedIn : ${PROFILE_DATA.linkedin} | X : ${PROFILE_DATA.x}

PROFIL PROFESSIONNEL :
${PROFILE_DATA.shortBio}

FORMATION ACADÉMIQUE :
- ${EDUCATION_DATA.institution} : ${EDUCATION_DATA.degree} (${EDUCATION_DATA.status})
  ${EDUCATION_DATA.description}

COMPÉTENCES CLÉS :
${SKILL_CATEGORIES_DATA.map(c => `- ${c.title} : ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

EXPÉRIENCES & INNOVATIONS :
${EXPERIENCES_DATA.map(e => `- ${e.title} (${e.organization}, ${e.period})\n  ${e.description}`).join('\n')}

LANGUES :
${LANGUAGES_DATA.map(l => `- ${l.name} : ${l.level}`).join('\n')}
    `.trim();

    navigator.clipboard?.writeText(text);
    setCopied(true);
    triggerToast('Résumé du CV copié dans le presse-papier !');
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${PROFILE_DATA.whatsappRaw}?text=${encodeURIComponent("Bonjour Bireke Idea, je souhaite échanger à propos de votre CV.")}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white text-[#111827] border border-[#D1D5DB] rounded-xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        
        {/* Header modale */}
        <div className="p-3 sm:p-4 border-b border-[#D1D5DB] flex items-center justify-between bg-[#F4F4F5]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-[#8B4513] uppercase">
              Curriculum Vitae — {PROFILE_DATA.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-100 text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer"
              title="Imprimer ou enregistrer au format PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#8B4513]" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-100 text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer"
              title="Copier le texte du CV"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#8B4513]" />}
              <span className="hidden sm:inline">Copier le texte</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corps du CV imprimable */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm print:p-0">
          
          {/* En-tête CV */}
          <div className="border-b-2 border-[#8B4513] pb-4 space-y-2 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-[#111827]">
              {PROFILE_DATA.name}
            </h2>
            <p className="font-bold text-[#8B4513] uppercase text-xs sm:text-sm">
              {PROFILE_DATA.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-600">
              <span>{PROFILE_DATA.city}</span>
              <span>·</span>
              <span>{EDUCATION_DATA.institution}</span>
              <span>·</span>
              <span>{PROFILE_DATA.phone}</span>
              <span>·</span>
              <span>{PROFILE_DATA.email}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#8B4513] font-semibold pt-1">
              <a href={PROFILE_DATA.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              <span>·</span>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <span>·</span>
              <a href={PROFILE_DATA.x} target="_blank" rel="noreferrer" className="hover:underline">X (Twitter)</a>
            </div>
          </div>

          {/* Profil */}
          <div className="space-y-1.5">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513] border-b border-gray-200 pb-1">
              Profil & Objectifs
            </h3>
            <p className="leading-relaxed text-gray-700">
              {PROFILE_DATA.shortBio}
            </p>
          </div>

          {/* Formation académique */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513] border-b border-gray-200 pb-1">
              Formation Académique
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-[#111827]">{EDUCATION_DATA.institution}</span>
                <span className="text-xs text-gray-500">{EDUCATION_DATA.status}</span>
              </div>
              <p className="font-semibold text-gray-700">{EDUCATION_DATA.degree}</p>
              <p className="text-gray-600 text-xs leading-relaxed">{EDUCATION_DATA.description}</p>
              <p className="text-gray-600 text-xs italic">{EDUCATION_DATA.complementary}</p>
            </div>
          </div>

          {/* Compétences */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513] border-b border-gray-200 pb-1">
              Compétences Techniques & Domaines d'Intérêt
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SKILL_CATEGORIES_DATA.map((cat, idx) => (
                <div key={idx} className="p-2 border border-gray-200 rounded-md bg-gray-50">
                  <span className="font-bold text-[#8B4513] block uppercase mb-0.5">{cat.title}</span>
                  <p className="text-gray-700">{cat.skills.map(s => s.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expériences & Initiatives */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513] border-b border-gray-200 pb-1">
              Expériences & Initiatives Technologiques
            </h3>
            {EXPERIENCES_DATA.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm">
                  <span className="text-[#111827]">{exp.title}</span>
                  <span className="text-xs text-gray-500">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-[#8B4513]">{exp.organization} — {exp.badge}</p>
                <p className="text-xs text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Langues */}
          <div className="space-y-1.5">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#8B4513] border-b border-gray-200 pb-1">
              Langues
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
              {LANGUAGES_DATA.map((l, idx) => (
                <span key={idx}><strong>{l.name}</strong> ({l.level})</span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer modale */}
        <div className="p-3 bg-[#F4F4F5] border-t border-[#D1D5DB] flex items-center justify-between">
          <button
            onClick={openWhatsApp}
            className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contacter sur WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-xs font-bold rounded-lg cursor-pointer uppercase"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
