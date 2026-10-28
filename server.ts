import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PHOTOS, PROFILE_DATA, PROJECTS_DATA } from './src/data/initialData';

const PORT = 3000;
const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, 'data');
const STORE_FILE = path.join(DATA_DIR, 'portfolio-store.json');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

interface PortfolioStore {
  projects: typeof PROJECTS_DATA;
  photos: typeof INITIAL_PHOTOS;
  avatarUrl: string;
}

function loadStore(): PortfolioStore {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : PROJECTS_DATA,
        photos: Array.isArray(parsed.photos) && parsed.photos.length > 0 ? parsed.photos : INITIAL_PHOTOS,
        avatarUrl: parsed.avatarUrl || PROFILE_DATA.avatar || '/images/bireke-idea-profile.jpg',
      };
    }
  } catch (err) {
    console.warn('Error reading portfolio store:', err);
  }
  return {
    projects: PROJECTS_DATA,
    photos: INITIAL_PHOTOS,
    avatarUrl: PROFILE_DATA.avatar || '/images/bireke-idea-profile.jpg',
  };
}

function saveStore(store: PortfolioStore) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing portfolio store:', err);
  }
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '25mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  // GET shared portfolio data for all visitors
  app.get('/api/portfolio', (_req, res) => {
    const store = loadStore();
    res.json(store);
  });

  // POST upload image from device -> saves to public/uploads and returns public URL
  app.post('/api/upload', (req, res) => {
    try {
      const { dataUrl, prefix = 'pub' } = req.body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Invalid image data' });
        return;
      }

      const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!matches) {
        res.json({ url: dataUrl });
        return;
      }

      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1].replace(/[^a-z0-9]/gi, '');
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const safePrefix = String(prefix).replace(/[^a-z0-9_-]/gi, '').toLowerCase() || 'img';
      const filename = `${safePrefix}-${Date.now()}.${ext || 'jpg'}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      fs.writeFileSync(filePath, buffer);
      const publicUrl = `/uploads/${filename}`;
      res.json({ url: publicUrl, dataUrl });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed' });
    }
  });

  // POST update shared portfolio state (projects, photos, avatarUrl) for all visitors
  app.post('/api/portfolio', (req, res) => {
    const current = loadStore();
    const { projects, photos, avatarUrl } = req.body;

    const updated: PortfolioStore = {
      projects: Array.isArray(projects) ? projects : current.projects,
      photos: Array.isArray(photos) ? photos : current.photos,
      avatarUrl: typeof avatarUrl === 'string' && avatarUrl.trim() ? avatarUrl : current.avatarUrl,
    };

    saveStore(updated);
    res.json(updated);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(ROOT_DIR, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
