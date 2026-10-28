import { PhotoItem, ProjectItem } from '../types/portfolio';

/**
 * Lit, redimensionne et compresse automatiquement une image sélectionnée depuis l'appareil
 * (<input type="file" accept="image/*" />) puis l'envoie au serveur pour qu'elle soit
 * visible par tous les visiteurs du portfolio.
 */
export async function processAndUploadImage(
  file: File,
  prefix = 'publication'
): Promise<string> {
  const compressedDataUrl = await compressImageFile(file, 1200, 0.84);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl: compressedDataUrl, prefix }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.url) {
        return data.url;
      }
    }
  } catch {
    // Fallback sur le DataURL optimisé si hébergement statique
  }

  return compressedDataUrl;
}

function compressImageFile(
  file: File,
  maxDimension = 1200,
  quality = 0.84
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire le fichier image.'));
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new Image();
      img.onerror = () => resolve(result);
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(result);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

export async function syncPortfolioState(payload: {
  projects?: ProjectItem[];
  photos?: PhotoItem[];
  avatarUrl?: string;
}): Promise<void> {
  try {
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Ignoré en mode hors-ligne / statique
  }
}

export async function fetchSharedPortfolioState(): Promise<{
  projects?: ProjectItem[];
  photos?: PhotoItem[];
  avatarUrl?: string;
} | null> {
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Ignoré en mode hors-ligne / statique
  }
  return null;
}
