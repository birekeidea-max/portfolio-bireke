import React, { useState, useEffect } from 'react';
import { Camera, Plus, X, Trash2, Calendar, ZoomIn, Upload, Globe, Info, RotateCcw } from 'lucide-react';
import { PhotoItem } from '../types/portfolio';
import { INITIAL_PHOTOS } from '../data/initialData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { processAndUploadImage, fetchSharedPortfolioState, syncPortfolioState } from '../utils/imageUpload';

interface PhotosSectionProps {
  triggerToast: (msg: string) => void;
}

const STORAGE_KEY_PHOTOS = 'bireke_portfolio_photos_v1';

export const PhotosSection: React.FC<PhotosSectionProps> = ({ triggerToast }) => {
  const { isDark } = useTheme();
  const { requireAuth, isAuthenticated } = useAuth();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }),
    imageUrl: ''
  });

  // Chargement automatique des photos publiées pour tous les visiteurs
  useEffect(() => {
    let active = true;
    fetchSharedPortfolioState().then((shared) => {
      if (!active || !shared) return;
      if (Array.isArray(shared.photos) && shared.photos.length > 0) {
        setPhotos(shared.photos);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos));
    } catch {
      // Ignored
    }
  }, [photos]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      triggerToast('Veuillez sélectionner un fichier image valide.');
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await processAndUploadImage(file, 'photo');
      setNewPhoto(prev => ({ ...prev, imageUrl: uploadedUrl }));
      triggerToast('Photo téléchargée depuis votre appareil et optimisée pour tous les visiteurs.');
    } catch {
      triggerToast('Erreur lors du traitement de l\'image.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.imageUrl) {
      triggerToast('Veuillez sélectionner une image depuis vos fichiers ou entrer un lien.');
      return;
    }

    const item: PhotoItem = {
      id: `photo-${Date.now()}`,
      title: newPhoto.title.trim().toUpperCase() || 'ÉVÉNEMENT TECH UCB',
      description: newPhoto.description.trim(),
      date: newPhoto.date,
      imageUrl: newPhoto.imageUrl
    };

    setPhotos(prev => {
      const updated = [item, ...prev];
      syncPortfolioState({ photos: updated });
      return updated;
    });
    setIsModalOpen(false);
    setNewPhoto({
      title: '',
      description: '',
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }),
      imageUrl: ''
    });
    triggerToast('Photo publiée et visible par tous les visiteurs !');
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(() => {
      setPhotos(prev => {
        const updated = prev.filter(p => p.id !== id);
        syncPortfolioState({ photos: updated });
        return updated;
      });
      triggerToast('Photo supprimée de la galerie.');
    });
  };

  return (
    <section id="photos" className="py-6 sm:py-8 border-b transition-colors scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D5DB] dark:border-[#3F3F46] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#8B4513] tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Galerie Personnelle</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#111827] dark:text-[#F4F4F5]">
              Photos & Événements UCB
            </h2>
            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
              Publiez et affichez vos propres photos de projets, concours et ateliers technologiques.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                requireAuth(() => {
                  setPhotos(INITIAL_PHOTOS);
                  syncPortfolioState({ photos: INITIAL_PHOTOS });
                  localStorage.removeItem(STORAGE_KEY_PHOTOS);
                  triggerToast('Photos officielles et projets UCB restaurés !');
                });
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:border-[#8B4513] text-gray-800 dark:text-gray-200 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              title="Restaurer les photos de projets UCB (Accès propriétaire requis)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurer</span>
            </button>
            <button
              onClick={() => requireAuth(() => setIsModalOpen(true))}
              className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              title="Ajouter une photo (Accès propriétaire requis)"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une photo</span>
            </button>
          </div>
        </div>

        {/* Contenu : Liste des photos */}
        {photos.length === 0 ? (
          <div className="bg-white dark:bg-[#27272A] border border-dashed border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] text-[#8B4513] flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                Votre galerie de photos est prête
              </h3>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 max-w-md mx-auto">
                Cliquez ci-dessous pour ajouter vos propres photos d'ateliers, de hackathons ou de réalisations.
              </p>
            </div>
            <button
              onClick={() => requireAuth(() => setIsModalOpen(true))}
              className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Insérer des photos (Accès propriétaire requis)"
            >
              <Upload className="w-4 h-4" />
              <span>Insérer mes propres photos</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="bg-white dark:bg-[#27272A] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl overflow-hidden group cursor-pointer hover:border-[#8B4513] transition-all shadow-xs relative"
              >
                <div className="h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} — Bireke Bashige Idea UCB`}
                    title={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                  <button
                    onClick={(e) => handleDeletePhoto(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 hover:bg-red-600 text-white transition-colors"
                    title="Supprimer cette photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#8B4513] font-bold">
                    <span className="uppercase">{item.title}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.date}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODALE VISIONNEUSE PLEINE TAILLE */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-1 rounded-md bg-black/50 text-white hover:bg-black cursor-pointer z-10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-4 space-y-1 bg-white dark:bg-[#27272A]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-[#8B4513] text-sm">
                    {selectedPhoto.title}
                  </h3>
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{selectedPhoto.date}</span>
                </div>
                {selectedPhoto.description && (
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODALE : AJOUTER UNE NOUVELLE PHOTO */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-base font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                  Ajouter une photo personnelle
                </h3>
                <p className="text-xs text-gray-500">
                  Importez une photo depuis votre appareil pour l'ajouter à votre galerie.
                </p>
              </div>

              {/* Note d'explication Google Indexation */}
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs space-y-1 text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                  <Info className="w-3.5 h-3.5" />
                  <span>Important pour l'indexation Google Images</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Pour que Googlebot indexe vos photos dans son moteur, privilégiez une <strong>URL Web publique</strong> (ex: hébergée sur GitHub, Vercel ou Cloudinary) ou déposez vos fichiers dans le dossier <code>public/images/</code>.
                </p>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-3 text-xs">
                {/* Mode 1: Fichier local depuis l'appareil */}
                <div className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg space-y-1.5">
                  <label className="block font-bold uppercase text-[11px] text-gray-700 dark:text-gray-300">
                    Option A : Téléverser depuis votre appareil
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border file:border-gray-300 file:text-xs file:font-bold file:bg-[#8B4513] file:text-white cursor-pointer"
                  />
                  {isUploadingImage && (
                    <p className="text-[11px] font-bold text-[#8B4513]">
                      Optimisation et enregistrement automatique de l'image...
                    </p>
                  )}
                </div>

                {/* Mode 2: URL Publique */}
                <div className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg space-y-1.5">
                  <label className="block font-bold uppercase text-[11px] text-gray-700 dark:text-gray-300 flex items-center justify-between">
                    <span>Option B : Ou saisir une URL publique</span>
                    <Globe className="w-3 h-3 text-[#8B4513]" />
                  </label>
                  <input
                    type="text"
                    placeholder="https://... ou /images/mon-image.jpg"
                    value={newPhoto.imageUrl.startsWith('data:') ? '' : newPhoto.imageUrl}
                    onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2.5 py-1.5 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                {newPhoto.imageUrl && (
                  <div className="h-32 rounded-lg overflow-hidden border border-gray-300 relative">
                    <img src={newPhoto.imageUrl} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Titre ou Événement *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: DEMO DAY GDG ON CAMPUS UCB"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Description ou Contexte (optionnel)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Présentation de la plateforme AMR Mugote & Fils à l'UCB..."
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-transparent focus:outline-none focus:border-[#8B4513] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-400 font-bold uppercase"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#8B4513] hover:bg-[#70360F] text-white font-bold uppercase rounded shadow-xs"
                  >
                    Publier la photo
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
