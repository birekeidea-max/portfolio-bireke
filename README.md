# 🎓 Portfolio Professionnel — BIREKE BASHIGE IDEA

> **Développeur Logiciel & Web | Flutter | Passionné par l'IA & les Nouvelles Technologies**  
> *Étudiant en Sciences Informatiques à l'Université Catholique de Bukavu (UCB)*  
> 📍 Bukavu, Sud-Kivu, République Démocratique du Congo

---

## 📌 Présentation

Bienvenue sur le dépôt officiel du portfolio de **BIREKE BASHIGE IDEA**.  
Cette application web moderne, épurée et performante a été conçue pour valoriser mon parcours académique, mes compétences techniques, mes réalisations logicielles concrètes ainsi que mes engagements communautaires dans l'écosystème technologique africain et international.

L'objectif central est de **transformer les idées en solutions numériques concrètes, utiles et accessibles**, adaptées aux besoins de notre communauté et aux exigences de l'industrie technologique mondiale.

---

## 🛠️ Stack Technologique du Projet

- **Frontend :** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool :** [Vite](https://vitejs.dev/)
- **Styles & UI :** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typographie :** *Times New Roman*, interligne 1.6, hiérarchie éditoriale rigoureuse
- **Palette Visuelle :** 
  - Fond mat reposant : `#F4F4F5` (mode clair) / `#0F172A` (mode sombre)
  - Cartes et panneaux : `#FFFFFF` / `#182234`
  - Couleur d'accentuation : Chocolat noble (`#8B4513` / `#A0522D`)
  - Textes haute lisibilité : Noir mat (`#111827`) et gris (`#4B5563`)
- **Icônes :** [Lucide React](https://lucide.dev/)
- **Déploiement :** Prêt pour Vercel, Netlify, Cloud Run ou tout hébergeur statique/Node

---

## 🌟 Fonctionnalités Clés du Portfolio

1. **En-tête & Profil :**
   - Mise en avant directe de la photo de profil personnelle avec bordure chocolat.
   - Présentation claire des domaines d'expertise et de la vision logicielle.
   - Bouton de redirection directe vers **WhatsApp** (`+243 999 428 6469`).
   - Bouton d'accès et de téléchargement/impression du **CV complet**.

2. **Section Projets Phares & Réalisations :**
   - **SGESC (Système de Gestion des Écoles Secondaires au Congo)** : Solution logicielle de numérisation administrative, académique et financière du secondaire en RDC.
   - **AMR MUGOTE & FILS** : Plateforme de billetterie électronique pour la traversée lacustre Bukavu - Goma (Lac Kivu) avec intégration Mobile Money.
   - **Gemma Kivu Agro** : Assistant agronomique intelligent basé sur les modèles ouverts Google Gemma au service des agriculteurs du Kivu.
   - **Diagnostic de Plats Congolais** : Application d'IA (vision & scikit-learn) pour la reconnaissance nutritionnelle et culinaire des mets congolais.
   - **CampusTel** : Architecture réseau et télécom interconnectant étudiants, facultés et services sur campus universitaire.
   - Filtrage par catégorie (*Web*, *Mobile*, *IA*, *Tous*) et fiches techniques détaillées.

3. **Optimisation pour Moteurs Génératifs (GEO) :**
   - Intégration de balises sémantiques et de structured data **Schema.org JSON-LD** (`ProfilePage`, `Person`, `FAQPage`) pour l'extraction naturelle par les modèles d'IA (ChatGPT, Gemini, Perplexity, Claude).

3. **Galerie Photos Personnalisée :**
   - Espace dédié à la publication de photos réelles (événements universitaires, hackathons, ateliers GDG, sessions de code).
   - Aucun contenu fictif ou généré par IA : gestion 100% entre les mains de l'utilisateur avec import local direct.

4. **Curriculum Vitae Intégré (Modal & Impression) :**
   - Visualisation détaillée du parcours : formations, expériences, technologies maîtrisées, langues.
   - Boutons pour imprimer directement en format PDF (`Ctrl+P` / impression optimisée) ou copier la synthèse textuelle.

5. **Prise de Contact Intelligente :**
   - Envoi de message direct vers WhatsApp avec message pré-formaté.
   - Bouton flottant permanent d'accès rapide.
   - Liens officiels vers **GitHub**, **LinkedIn**, **X (Twitter)** et **Email**.

---

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Installation

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/birekeidea-max/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application s'ouvre sur `http://localhost:3000`.

4. **Compiler pour la production :**
   ```bash
   npm run build
   ```
   Les fichiers optimisés et minifiés sont générés dans le dossier `dist/`.

5. **Vérifier le typage et le code :**
   ```bash
   npm run lint
   ```

---

## 🌐 Déploiement sur Vercel

Le projet inclut un fichier `.npmrc` configuré (`legacy-peer-deps=true`) pour assurer une installation fluide sans conflits de dépendances paires.

1. Connectez votre compte GitHub sur [Vercel](https://vercel.com).
2. Importez le dépôt du portfolio.
3. Conservez les réglages par défaut :
   - **Framework Preset :** Vite
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`
4. Cliquez sur **Deploy**.

---

## 📂 Structure du Répertoire

```text
├── index.html              # Point d'entrée HTML & métadonnées SEO
├── package.json            # Dépendances & scripts npm
├── .npmrc                  # Configuration npm (compatibilité CI/CD)
├── vite.config.ts          # Configuration Vite & Tailwind
├── src/
│   ├── App.tsx             # Composant racine assemblant toutes les sections
│   ├── main.tsx            # Montage React dans le DOM
│   ├── index.css           # Définition des variables Tailwind, polices et styles
│   ├── context/
│   │   └── ThemeContext.tsx # Gestion du thème sombre / clair
│   ├── types/
│   │   └── portfolio.ts    # Typage TypeScript des projets, compétences et médias
│   ├── data/
│   │   └── initialData.ts  # Données du profil, projets, formations et coordonnées
│   └── components/
│       ├── Navbar.tsx             # Barre de navigation responsive & commutateur de thème
│       ├── HeroSection.tsx        # En-tête avec photo, bio, liens et boutons d'action
│       ├── AboutSection.tsx       # Parcours détaillé & vision technologique
│       ├── SkillsSection.tsx      # Grille des compétences techniques et méthodologiques
│       ├── ProjectsSection.tsx    # Présentation des projets avec fiches détaillées
│       ├── ExperiencesSection.tsx # Hackathons, incubations (GDG, Gemma, MLH)
│       ├── EducationSection.tsx   # Diplômes (UCB) & compétences linguistiques
│       ├── PhotosSection.tsx      # Galerie de photos réelles
│       ├── CvModal.tsx            # Fenêtre modale du CV imprimable en PDF
│       └── ContactSection.tsx     # Formulaire et passerelle directe WhatsApp
```

---

## 📬 Me Contacter

- **WhatsApp :** [+243 999 428 6469](https://wa.me/2439994286469)
- **Email :** [birekeidea@gmail.com](mailto:birekeidea@gmail.com)
- **GitHub :** [@birekeidea-max](https://github.com/birekeidea-max)
- **LinkedIn :** [Idea Bireke Bashige](https://www.linkedin.com/in/idea-bireke-bashige-1084a833b?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **X (Twitter) :** [@IdeaB19613](https://x.com/IdeaB19613)

---

## 📄 Licence

Projet développé avec passion par **BIREKE BASHIGE IDEA**.  
Tous droits réservés © 2026.
