/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PhotosSection } from './components/PhotosSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { PROJECTS_DATA, PROFILE_DATA } from './data/initialData';
import { ProjectItem } from './types/portfolio';

const STORAGE_KEY_PROJECTS = 'bireke_idea_portfolio_projects_clean_v5';

const PortfolioContent: React.FC = () => {
  const { isDark } = useTheme();
  const [isCvOpen, setIsCvOpen] = useState(false);

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      return saved ? JSON.parse(saved) : PROJECTS_DATA;
    } catch {
      return PROJECTS_DATA;
    }
  });

  const [toastMessage, setToastMessage] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [projects]);

  const handleAddProject = (newProject: ProjectItem) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const openWhatsAppDirect = () => {
    const msg = encodeURIComponent("Bonjour Bireke Idea, je vous contacte depuis votre portfolio.");
    window.open(`https://wa.me/${PROFILE_DATA.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-150 ${
        isDark ? 'bg-[#18181B] text-[#F4F4F5]' : 'bg-[#F4F4F5] text-[#111827]'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 border bg-white dark:bg-[#27272A] border-[#8B4513] text-[#111827] dark:text-[#F4F4F5] animate-in fade-in slide-in-from-bottom-3 duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0" />
          <span className="text-xs font-bold uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Barre de navigation épurée */}
      <Navbar onOpenCv={() => setIsCvOpen(true)} />

      {/* Contenu ordonné selon les consignes strictes */}
      <main className="space-y-0">
        {/* Photo de profil qui commence en premier, puis descriptif */}
        <HeroSection
          onOpenCv={() => setIsCvOpen(true)}
          triggerToast={triggerToast}
        />

        <AboutSection />
        <SkillsSection />
        <ProjectsSection
          projects={projects}
          onAddProject={handleAddProject}
          triggerToast={triggerToast}
        />
        <PhotosSection triggerToast={triggerToast} />
        <ExperiencesSection />
        <EducationSection />
        <ContactSection triggerToast={triggerToast} />
      </main>

      {/* Modale Curriculum Vitae */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        triggerToast={triggerToast}
      />

      {/* Bouton Flottant WhatsApp Direct */}
      <button
        onClick={openWhatsAppDirect}
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-full bg-[#8B4513] hover:bg-[#70360F] text-white shadow-lg cursor-pointer flex items-center gap-2 transition-transform hover:scale-105"
        title="Discuter directement sur WhatsApp avec Bireke Idea"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">WhatsApp Direct</span>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
