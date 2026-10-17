import React, { useState } from 'react';
import { ExternalLink, Plus, X, Layers, AlertCircle, CheckCircle, ArrowUpRight, Upload } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  triggerToast: (msg: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  triggerToast
}) => {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    category: 'Développement web & logiciel',
    categoryKey: 'web' as 'web' | 'mobile' | 'ai',
    shortDescription: '',
    problemSolved: '',
    solutionProposed: '',
    technologies: 'React, TypeScript, Tailwind CSS',
    demoUrl: '',
    githubUrl: '',
    status: 'En cours de développement',
    customImage: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProject(prev => ({ ...prev, customImage: event.target?.result as string }));
      triggerToast('Image personnelle chargée.');
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.shortDescription.trim()) {
      triggerToast('Veuillez renseigner le nom et la description du projet.');
      return;
    }

    const techArray = newProject.technologies
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const project: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: newProject.name.toUpperCase(),
      category: newProject.category,
      categoryKey: newProject.categoryKey,
      shortDescription: newProject.shortDescription,
      problemSolved: newProject.problemSolved || 'Problème identifié et traité par cette solution.',
      solutionProposed: newProject.solutionProposed || newProject.shortDescription,
      features: ['Développement modulaire et adapté aux besoins réels.'],
      technologies: techArray.length > 0 ? techArray : ['Web', 'TypeScript'],
      demoUrl: newProject.demoUrl.trim() || undefined,
      githubUrl: newProject.githubUrl.trim() || undefined,
      image: newProject.customImage.trim() || undefined,
      status: newProject.status
    };

    onAddProject(project);
    setIsAddModalOpen(false);
    setNewProject({
      name: '',
      category: 'Développement web & logiciel',
      categoryKey: 'web',
      shortDescription: '',
      problemSolved: '',
      solutionProposed: '',
      technologies: 'React, TypeScript, Tailwind CSS',
      demoUrl: '',
      githubUrl: '',
      status: 'En cours de développement',
      customImage: ''
    });
    triggerToast('Projet enregistré avec succès !');
  };

  return (
    <section id="projets" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête de section compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Réalisations & Projets</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
              Derniers projets
            </h2>
            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
              Solutions logicielles et plateformes conçues pour répondre à des défis réels.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un projet</span>
          </button>
        </div>

        {/* Grille des projets épurés - SANS FAUSSES IMAGES D'IA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[#8B4513] dark:hover:border-[#8B4513] transition-all shadow-xs"
            >
              <div className="space-y-3">
                
                {/* Header de la carte de projet */}
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                    {proj.categoryKey === 'ai' ? 'Intelligence Artificielle' : proj.categoryKey === 'mobile' ? 'Application Mobile' : 'Plateforme Web'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] text-gray-900 dark:text-gray-100 text-[10px] font-semibold border border-gray-200 dark:border-gray-700">
                    {proj.status}
                  </span>
                </div>

                {/* Image du projet avec balises SEO Google */}
                {proj.image && (
                  <div className="h-36 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={proj.image}
                      alt={`${proj.name} — Bireke Bashige Idea UCB`}
                      title={proj.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Titre en majuscules */}
                <h3
                  onClick={() => setSelectedProject(proj)}
                  className="text-base sm:text-lg font-bold text-[#111827] dark:text-[#F4F4F5] hover:text-[#8B4513] cursor-pointer transition-colors uppercase"
                >
                  {proj.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-3">
                  {proj.shortDescription}
                </p>
              </div>

              {/* Technologies et Actions */}
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {proj.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-[#F4F4F5] dark:bg-[#18181B] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="font-bold text-[#8B4513] hover:underline cursor-pointer inline-flex items-center gap-1 uppercase"
                  >
                    <span>Détails</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-[#8B4513] hover:bg-[#70360F] text-white rounded font-bold uppercase inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Visiter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* MODALE DÉTAILS DU PROJET */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl relative">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pr-6">
                <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider block">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                  {selectedProject.name}
                </h3>
              </div>

              {selectedProject.image && (
                <div className="h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.name} — Développé par Bireke Bashige Idea`}
                    title={selectedProject.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 bg-[#F4F4F5] dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 space-y-1">
                  <h4 className="font-bold text-[#8B4513] flex items-center gap-1.5 uppercase">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Problématique résolue</span>
                  </h4>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedProject.problemSolved}</p>
                </div>

                <div className="p-3 bg-[#F4F4F5] dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 space-y-1">
                  <h4 className="font-bold text-[#8B4513] flex items-center gap-1.5 uppercase">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Solution technique</span>
                  </h4>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedProject.solutionProposed}</p>
                </div>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#111827] dark:text-[#F4F4F5] uppercase text-[11px]">
                      Fonctionnalités principales :
                    </h4>
                    <ul className="space-y-1 text-gray-900 dark:text-gray-100">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#8B4513] font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-[#111827] dark:text-[#F4F4F5] uppercase text-[11px] mb-1.5">
                    Technologies :
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-[11px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white rounded text-xs font-bold uppercase inline-flex items-center gap-1.5"
                  >
                    <span>Ouvrir la plateforme</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-xs font-bold uppercase cursor-pointer"
                >
                  Fermer
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODALE : AJOUTER UN PROJET PERSONNEL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl relative">
              
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                  Ajouter un projet
                </h3>
                <p className="text-xs text-gray-500">
                  Enregistrez votre projet avec vos propres informations et capture.
                </p>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: PORTAIL ÉTUDIANT UCB"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                      Catégorie
                    </label>
                    <select
                      value={newProject.categoryKey}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        const labels: Record<string, string> = {
                          web: 'Développement Web & Plateformes',
                          mobile: 'Application Mobile (Flutter)',
                          ai: 'Intelligence Artificielle & Données'
                        };
                        setNewProject({ ...newProject, categoryKey: val, category: labels[val] });
                      }}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2.5 py-2 bg-white dark:bg-[#18181B] focus:outline-none focus:border-[#8B4513]"
                    >
                      <option value="web">Plateforme Web</option>
                      <option value="mobile">Application Mobile</option>
                      <option value="ai">Intelligence Artificielle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                      Statut
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Déployé / En cours"
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent focus:outline-none focus:border-[#8B4513]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Description courte *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brève description de ce que fait la solution..."
                    value={newProject.shortDescription}
                    onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent focus:outline-none focus:border-[#8B4513] resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Technologies (séparées par virgules)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Flutter, Dart, Firebase ou React, TypeScript"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Lien de démonstration (optionnel)
                  </label>
                  <input
                    type="url"
                    placeholder="https://monprojet.com"
                    value={newProject.demoUrl}
                    onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                {/* Upload d'image personnelle pour ce projet */}
                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Votre image / capture (optionnelle)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-gray-300 file:text-xs file:font-bold file:bg-gray-100 dark:file:bg-gray-800 dark:file:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-400 font-bold uppercase"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#8B4513] hover:bg-[#70360F] text-white font-bold uppercase rounded shadow-xs"
                  >
                    Enregistrer le projet
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
