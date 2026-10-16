import React, { useState, useEffect } from 'react';
import { Camera, Plus, X, Trash2, Calendar, ZoomIn, Upload } from 'lucide-react';
import { PhotoItem } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';

interface PhotosSectionProps {
  triggerToast: (msg: string) => void;
}

const STORAGE_KEY_PHOTOS = 'bireke_portfolio_photos_v1';

export const PhotosSection: React.FC<PhotosSectionProps> = ({ triggerToast }) => {
  const { isDark } = useTheme();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTOS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }),
    imageUrl: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos));
    } catch {
      // Ignored
    }
  }, [photos]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewPhoto(prev => ({ ...prev, imageUrl: event.target?.result as string }));
      triggerToast('Photo importée depuis votre appareil.');
    };
    reader.readAsDataURL(file);
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

    setPhotos(prev => [item, ...prev]);
    setIsModalOpen(false);
    setNewPhoto({
      title: '',
      description: '',
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }),
      imageUrl: ''
    });
    triggerToast('Photo ajoutée à votre galerie !');
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.filter(p => p.id !== id));
    triggerToast('Photo supprimée de la galerie.');
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
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Publiez et affichez vos propres photos de projets, concours et ateliers technologiques.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une photo</span>
          </button>
        </div>

        {/* Contenu : Si pas encore de photo */}
        {photos.length === 0 ? (
          <div className="bg-white dark:bg-[#27272A] border border-dashed border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] text-[#8B4513] flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase text-[#111827] dark:text-[#F4F4F5]">
                Votre galerie de photos est prête
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Aucune image générée automatiquement par IA n'est insérée. Cliquez sur le bouton ci-dessous pour ajouter vos vraies photos d'ateliers, de hackathons ou de réalisations.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white text-xs font-bold rounded-lg uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                    alt={item.title}
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
                    <span className="text-gray-500 font-normal">{item.date}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
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
                  <span className="text-xs text-gray-500">{selectedPhoto.date}</span>
                </div>
                {selectedPhoto.description && (
                  <p className="text-xs text-gray-700 dark:text-gray-300">
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

              <form onSubmit={handleAddPhoto} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">
                    Sélectionner l'image depuis votre appareil *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border file:border-gray-300 file:text-xs file:font-bold file:bg-[#8B4513] file:text-white cursor-pointer"
                  />
                </div>

                {newPhoto.imageUrl && (
                  <div className="h-32 rounded-lg overflow-hidden border border-gray-300">
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
