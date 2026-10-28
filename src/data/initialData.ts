import {
  ProjectItem,
  SkillCategoryGroup,
  ExperienceItem,
  EducationItem,
  LanguageItem,
  PhotoItem
} from '../types/portfolio';

export const PROFILE_DATA = {
  name: 'BIREKE BASHIGE IDEA',
  title: 'DÉVELOPPEUR FULL-STACK | ADMINISTRATION RÉSEAU & CISCO CCNA | EXPERT IT POLYVALENT',
  catchphrase: 'Maîtriser l\'ensemble de la chaîne informatique — du développement logiciel Full-Stack et de l\'IA à l\'administration des infrastructures et des réseaux.',
  shortBio: 'En plus de mes compétences de Développeur Full-Stack, j\'ai franchi une étape décisive dans mon parcours technologique en me spécialisant dans l\'administration réseau. Je finalise actuellement ma préparation pour l\'obtention de la certification Cisco CCNA (Cisco Certified Network Associate). Cette transition stratégique me permet de maîtriser l\'ensemble de la chaîne informatique — du développement logiciel à la gestion des infrastructures et des réseaux — afin de m\'affirmer en tant qu\'Expert IT polyvalent.',
  aboutMeParagraphs: [
    'En plus de mes compétences de Développeur Full-Stack, j\'ai franchi une étape décisive dans mon parcours technologique en me spécialisant dans l\'administration réseau. Je finalise actuellement ma préparation pour l\'obtention de la certification Cisco CCNA (Cisco Certified Network Associate). Cette transition stratégique me permet de maîtriser l\'ensemble de la chaîne informatique — du développement logiciel à la gestion des infrastructures et des réseaux — afin de m\'affirmer en tant qu\'Expert IT polyvalent.',
    'Développeur Informatique passionné, je continue d\'élargir mes compétences techniques. En complément de mes projets de développement web et logiciel, je suis actuellement en préparation active de la certification Cisco CCNA (Cisco Certified Network Associate). Cette étape clé, sur le point d\'être finalisée, renforce mes connaissances en réseaux et infrastructures informatiques pour me propulser vers un profil complet d\'expert IT.',
    'Bireke Bashige Idea est un développeur informatique basé à Bukavu (Sud-Kivu, République Démocratique du Congo), actuellement en formation en Systèmes Informatiques au sein de la prestigieuse Université Catholique de Bukavu (UCB). Acteur engagé de l\'écosystème technologique des Grands Lacs, il combine une solide assise en génie logiciel avec une spécialisation pointue en architectures logicielles modernes, Cloud Computing, administration réseau et télécommunications.',
    'Sur le plan applicatif et algorithmique, Bireke Bashige Idea conçoit et déploie des solutions numériques à fort impact socio-économique. Son expertise technique englobe le développement Web & Mobile Full-Stack (React, TypeScript, Node.js, Flutter), l\'Intelligence Artificielle appliquée (intégration des modèles Google Gemini API, expérimentations des modèles ouverts Gemma, apprentissage automatique avec scikit-learn) et l\'intégration de solutions de paiement Mobile Money africaines telles que FlexPay et CinetPay (M-Pesa, Airtel Money, Orange Money).',
    'Reconnu pour sa participation active aux initiatives d\'innovation de pointe, Bireke Bashige Idea s\'est illustré au sein de l\'AI4EAC Innovation Challenge, des hackathons internationaux Major League Hacking (MLH) sur Devpost et des activités d\'incubation du Google Developer Groups (GDG) On Campus UCB. Ses réalisations phares incluent SGESC (Système de Gestion des Écoles Secondaires au Congo), la plateforme maritime AMR MUGOTE, l\'assistant agronomique Gemma Kivu Agro, le système de Diagnostic de Plats Congolais par IA et la solution CampusTel.'
  ],
  interests: [
    'Spécialisation en Administration Réseau & Certification Cisco CCNA (Expert IT polyvalent)',
    'Gestion des infrastructures et des réseaux (Routage, Commutation, TCP/IP, VLANs, Sécurité)',
    'Développement Web & Mobile Full-Stack (React, TypeScript, Node.js, Flutter)',
    'Intelligence Artificielle appliquée (Google Gemini API, modèles Gemma)',
    'Machine Learning & Data Science (scikit-learn, classification, vision)',
    'Intégration de passerelles Mobile Money (FlexPay, CinetPay, M-Pesa, Airtel)',
    'Architectures Cloud Computing & Déploiement distribué',
    'Participation aux hackathons internationaux (MLH Devpost, AI4EAC, GDG UCB)'
  ],
  email: 'birekeidea@gmail.com',
  phone: '+243 999 428 6469',
  whatsappRaw: '2439994286469',
  city: 'Bukavu, Sud-Kivu, RD Congo',
  university: 'Université Catholique de Bukavu (UCB)',
  avatar: '/images/bireke-idea-profile.jpg', // Image publique crawlable par Googlebot et modifiable à tout moment
  github: 'https://github.com/birekeidea-max',
  linkedin: 'https://www.linkedin.com/in/idea-bireke-bashige-1084a833b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  x: 'https://x.com/IdeaB19613'
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'sgesc',
    name: 'SGESC — SYSTÈME DE GESTION DES ÉCOLES SECONDAIRES AU CONGO',
    category: 'Génie logiciel, gestion scolaire & transformation numérique',
    categoryKey: 'web',
    shortDescription: 'Solution numérique complète de gouvernance scolaire conçue pour numériser la gestion administrative, académique et financière des établissements secondaires en RDC.',
    problemSolved: 'La gestion manuscrite sur papier des effectifs, bulletins, présences et frais scolaires engendre des pertes de données, des retards de consolidation et une opacité administrative dans les écoles de l\'Est de la RDC.',
    solutionProposed: 'SGESC centralise la gestion des promotions, l\'édition automatisée des palmarès et bulletins de notes, la gestion des effectifs et le suivi financier avec possibilité d\'intégration Mobile Money.',
    features: [
      'Gestion centralisée des effectifs d\'élèves, promotions et inscriptions annuelles.',
      'Calcul automatique des moyennes, classements et génération des bulletins.',
      'Suivi des frais de scolarité et états financiers avec reçus numériques.',
      'Gestion des rôles et accès sécurisés (Direction, Enseignants, Comptabilité).'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Mobile Money'],
    image: '/images/sgesc-systeme-ecoles.jpg',
    demoUrl: 'https://gestion-ecoles.vercel.app/',
    status: 'Plateforme déployée & Opérationnelle',
    note: 'Projet conçu pour répondre aux standards du système éducatif congolais.'
  },
  {
    id: 'amr-mugote',
    name: 'AMR MUGOTE & FILS',
    category: 'Développement web, billetterie maritime & transport lacustre',
    categoryKey: 'web',
    shortDescription: 'Plateforme moderne de billetterie électronique conçue pour digitaliser et sécuriser la réservation des traversées maritimes sur le lac Kivu entre Bukavu et Goma.',
    problemSolved: 'Les files d\'attente physiques aux ports, les surréservations et la lenteur du contrôle manuel des titres d\'embarquement des passagers entre Bukavu et Goma.',
    solutionProposed: 'AMR Mugote offre une billetterie en ligne fluide avec choix de classe, génération de e-billet sécurisé muni d\'un identifiant unique et synchronisation des manifests passagers.',
    features: [
      'Consultation des horaires de traversée maritime sur le lac Kivu en temps réel.',
      'Réservation en ligne multi-classes avec intégration des paiements mobiles.',
      'Génération instantanée de billets électroniques munis de codes de contrôle.',
      'Dashboard d\'administration portuaire pour le pointage et la gestion des passagers.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'FlexPay'],
    image: '/images/amr-mugote-reservation.jpg',
    demoUrl: 'https://amr-mugote.gdgocucbukavu.dev/',
    status: 'Plateforme en ligne & Démo active',
    note: 'Présenté aux initiatives d\'innovation et Demo Day du GDG On Campus UCB.'
  },
  {
    id: 'gemma-kivu-agro',
    name: 'GEMMA KIVU AGRO',
    category: 'Intelligence artificielle, agronomie & modèles ouverts Gemma',
    categoryKey: 'ai',
    shortDescription: 'Solution d\'assistance agronomique intelligente exploitant les modèles d\'IA Google Gemma pour accompagner les agriculteurs du Kivu dans le diagnostic des maladies végétales.',
    problemSolved: 'Le manque critique d\'agronomes spécialisés sur le terrain face aux ravageurs et maladies des cultures vivrières (flétrissement bactérien du bananier, mosaïque du manioc).',
    solutionProposed: 'Assistant IA conversationnel et diagnostique adapté aux contextes agricoles locaux du Sud-Kivu, vulgarisant les protocoles de remédiation en français et swahili.',
    features: [
      'Exploitation des modèles ouverts légers Google Gemma pour le raisonnement agricole.',
      'Fiches de diagnostic rapide des pathologies du bananier, manioc et caféier.',
      'Recommandations de traitement agronomique préventif et curatif adaptées au sol volcanique.',
      'Interface allégée optimisée pour les zones à faible connectivité internet.'
    ],
    technologies: ['Intelligence Artificielle', 'Google Gemma', 'Python', 'scikit-learn', 'React'],
    image: '/images/gemma-kivu-agro.jpg',
    demoUrl: 'https://gemma-kivu-agro-app.vercel.app/',
    status: 'Projet d\'innovation IA & Recherche appliquée'
  },
  {
    id: 'diagnostic-plats-congolais',
    name: 'DIAGNOSTIC DE PLATS CONGOLAIS',
    category: 'Intelligence artificielle, vision par ordinateur & gastronomie',
    categoryKey: 'ai',
    shortDescription: 'Application d\'IA dédiée à la reconnaissance visuelle, à l\'analyse nutritionnelle et à la valorisation culturelle des mets traditionnels congolais.',
    problemSolved: 'L\'absence de bases de données et d\'outils d\'IA entraînés sur le patrimoine culinaire d\'Afrique centrale, limitant le suivi nutritionnel moderne des régimes locaux.',
    solutionProposed: 'Modèle de classification d\'images et d\'apprentissage automatique capable d\'identifier les plats typiques (Pondu, Fufu, Sombe, Poissons du Lac Kivu) et d\'estimer leurs valeurs nutritives.',
    features: [
      'Reconnaissance automatique de plats traditionnels congolais par vision IA.',
      'Estimation des apports nutritionnels (protéines, glucides, micronutriments).',
      'Documentation des ingrédients locaux et variantes régionales de préparation.',
      'Interface interactive rapide utilisable sur mobile et web.'
    ],
    technologies: ['Intelligence Artificielle', 'Gemini API', 'scikit-learn', 'Python', 'React'],
    status: 'En développement actif & Prototype fonctionnel'
  },
  {
    id: 'campustel',
    name: 'CAMPUSTEL',
    category: 'Réseaux, télécommunications & services connectés universitaires',
    categoryKey: 'mobile',
    shortDescription: 'Système innovant de télécommunications et d\'annuaire interconnecté destiné à fluidifier les communications et les services au sein des campus universitaires.',
    problemSolved: 'La dispersion des flux de communication entre étudiants, facultés et administration, et la dépendance aux forfaits data coûteux en milieu universitaire.',
    solutionProposed: 'Plateforme CampusTel combinant VoIP interne sur réseau campus, annuaire académique vérifié et messagerie instantanée locale sécurisée.',
    features: [
      'Annuaire interconnecté des facultés, services académiques et associations étudiantes.',
      'Intégration d\'architectures réseau VoIP adaptées aux campus universitaires.',
      'Portail d\'alertes et de notifications académiques officielles en temps réel.',
      'Conception multiplateforme accessible sur smartphone et desktop.'
    ],
    technologies: ['Flutter', 'Dart', 'Réseaux IP', 'WebRTC', 'Node.js', 'Systèmes Informatiques'],
    status: 'Phase de recherche et prototype expérimental'
  }
];

export const SKILL_CATEGORIES_DATA: SkillCategoryGroup[] = [
  {
    title: 'DÉVELOPPEMENT WEB',
    subtitle: 'Technologies maîtrisées et déployées dans les réalisations',
    skills: [
      { name: 'React', status: 'Pratiqué', description: 'Conception d\'interfaces modulaires, gestion de l\'état réactif et interfaces réactives' },
      { name: 'TypeScript', status: 'Pratiqué', description: 'Typage statique strict garantissant la fiabilité et la clarté du code' },
      { name: 'Node.js', status: 'Pratiqué', description: 'Environnements d\'exécution serveur asynchrones et modulaires' },
      { name: 'Express', status: 'Pratiqué', description: 'Architecture et développement d\'APIs RESTful fiables' }
    ]
  },
  {
    title: 'DÉVELOPPEMENT LOGICIEL & MOBILE',
    subtitle: 'Technologies d\'intérêt et projets mobiles',
    skills: [
      { name: 'Flutter', status: 'En cours d\'apprentissage', description: 'Conception d\'applications mobiles multiplateformes pour Android et iOS' },
      { name: 'Dart', status: 'En cours d\'apprentissage', description: 'Programmation orientée objet et logique réactive' }
    ]
  },
  {
    title: 'BASES DE DONNÉES',
    subtitle: 'Stockage et gestion de données',
    skills: [
      { name: 'MongoDB', status: 'Pratiqué', description: 'Modélisation NoSQL documentaire, indexation et requêtes web' }
    ]
  },
  {
    title: 'INTELLIGENCE ARTIFICIELLE & MACHINE LEARNING',
    subtitle: 'Modèles fondationnels, open-source et apprentissage statistique',
    skills: [
      { name: 'Google Gemini API', status: 'Pratiqué', description: 'Intégration d\'IA multimodale avancée, génération de contenu et raisonnement structuré' },
      { name: 'Modèles Gemma', status: 'Exploration active', description: 'Expérimentation sur les LLM légers open-weights de Google pour applications agricoles et locales' },
      { name: 'scikit-learn & Python', status: 'Pratiqué', description: 'Classification, prétraitement de données, modèles prédictifs et vision par ordinateur' }
    ]
  },
  {
    title: 'FINTECH & PAIEMENTS MOBILE MONEY',
    subtitle: 'Intégration des canaux de transactions sécurisées en RDC & Afrique',
    skills: [
      { name: 'FlexPay', status: 'Pratiqué', description: 'Intégration de passerelle de paiement multi-opérateurs (M-Pesa, Airtel Money, Orange Money)' },
      { name: 'CinetPay', status: 'Pratiqué', description: 'Déploiement de solutions de checkout en ligne et encaissements automatisés' }
    ]
  },
  {
    title: 'CLOUD COMPUTING & DÉPLOIEMENT',
    subtitle: 'Infrastructures cloud, CI/CD et hébergement moderne',
    skills: [
      { name: 'Cloud Computing & Vercel', status: 'Pratiqué', description: 'Déploiement continu, fonctions serverless et monitoring d\'applications' },
      { name: 'Architectures RESTful', status: 'Pratiqué', description: 'Conception d\'APIs modulaires sécurisées et gestion de microservices légers' }
    ]
  },
  {
    title: 'ADMINISTRATION RÉSEAU, INFRASTRUCTURES IT & CISCO CCNA',
    subtitle: 'Maîtrise de la chaîne informatique : gestion des infrastructures, réseaux et certification Cisco CCNA',
    skills: [
      { name: 'Cisco CCNA (Cisco Certified Network Associate)', status: 'En préparation active', description: 'Finalisation de la certification Cisco CCNA : routage, commutation, adressage IPv4/IPv6, VLANs et sécurité des infrastructures IT' },
      { name: 'Administration Réseau & Gestion des Infrastructures', status: 'Pratiqué', description: 'Spécialisation stratégique en administration réseau, supervision des équipements, protocoles TCP/IP et architectures d\'entreprise' },
      { name: 'Télécommunications & VoIP (CampusTel)', status: 'Pratiqué', description: 'Infrastructures de communication interconnectées, transmission IP et services réseaux universitaires' }
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-ai4eac',
    title: 'CHALLENGE D\'INNOVATION EN INTELLIGENCE ARTIFICIELLE',
    organization: 'AI4EAC INNOVATION CHALLENGE',
    period: '2025 - 2026',
    badge: 'Compétition Régionale IA',
    description: 'Participation à la compétition technologique AI4EAC pour concevoir des solutions basées sur l\'intelligence artificielle répondant aux défis de l\'Afrique de l\'Est.',
    highlights: [
      'Pitch et modélisation de solutions prédictives pour les enjeux régionaux.',
      'Collaboration interdisciplinaire et mise à l\'épreuve d\'architectures IA concrètes.',
      'Échanges avec des mentors et chercheurs de renommée régionale.'
    ]
  },
  {
    id: 'exp-mlh',
    title: 'HACKATHONS MONDIAUX & HACKER COMMUNITY',
    organization: 'MAJOR LEAGUE HACKING (MLH) DEVPOST',
    period: 'En cours',
    badge: 'Hackathons Internationaux',
    description: 'Immersion dans les hackathons technologiques mondiaux pour prototyper en un temps record des solutions logicielles innovantes.',
    highlights: [
      'Participation à des challenges techniques Devpost axés sur l\'IA et le cloud.',
      'Intégration d\'APIs modernes et bibliothèques logicielles open-source.',
      'Collaboration et émulation avec la communauté mondiale de hackers.'
    ]
  },
  {
    id: 'exp-gdg',
    title: 'PARTICIPATION AUX INITIATIVES D\'INNOVATION & DEMO DAY',
    organization: 'GOOGLE DEVELOPER GROUPS (GDG) ON CAMPUS UCB',
    period: 'En cours',
    badge: 'Communauté & Incubation',
    description: 'Participation active aux ateliers, activités communautaires et programmes d\'incubation technologique de l\'Université Catholique de Bukavu.',
    highlights: [
      'Présentation et développement de la plateforme maritime AMR MUGOTE au Demo Day.',
      'Ateliers et échanges techniques avec les étudiants développeurs de l\'UCB.',
      'Promotion des technologies Google (Flutter, Gemini, Firebase).'
    ]
  },
  {
    id: 'exp-gemma',
    title: 'ACTIVITÉS D\'INNOVATION AUTOUR DE L\'IA ET GEMMA',
    organization: 'INITIATIVES GEMMA & COMMUNAUTÉ TECH',
    period: 'En cours',
    badge: 'Intelligence Artificielle',
    description: 'Exploration concrète de l\'intelligence artificielle pour apporter des réponses aux défis du Sud-Kivu.',
    highlights: [
      'Conception de Gemma Kivu Agro destiné au diagnostic agricole.',
      'Expérimentation des capacités d\'assistance des modèles ouverts Gemma.',
      'Veille technologique continue sur le machine learning appliqué.'
    ]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: 'UNIVERSITÉ CATHOLIQUE DE BUKAVU (UCB)',
  degree: 'Systèmes Informatiques (Développement Full-Stack & Administration Réseau)',
  status: 'Étudiant en cours de formation & Spécialisation Cisco CCNA',
  description: 'Formation universitaire d\'excellence axée sur l\'ingénierie des systèmes informatiques, l\'algorithmique, le génie logiciel, le Cloud, l\'administration des réseaux et les bases de données.',
  complementary: 'En plus de mes compétences de Développeur Full-Stack, j\'ai franchi une étape décisive dans mon parcours technologique en me spécialisant dans l\'administration réseau. Je finalise actuellement ma préparation pour l\'obtention de la certification Cisco CCNA (Cisco Certified Network Associate). Cette transition stratégique me permet de maîtriser l\'ensemble de la chaîne informatique — du développement logiciel à la gestion des infrastructures et des réseaux — afin de m\'affirmer en tant qu\'Expert IT polyvalent.'
};

export const LANGUAGES_DATA: LanguageItem[] = [
  { name: 'FRANÇAIS', level: 'Langue d\'instruction & professionnelle' },
  { name: 'ANGLAIS', level: 'Lecture technique & communication' },
  { name: 'SWAHILI', level: 'Langue courante' },
  { name: 'LINGALA', level: 'Notions de base' },
  { name: 'LATIN', level: 'Notions de base' }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-sgesc',
    title: 'SGESC — SYSTÈME DE GESTION SCOLAIRE EN RDC',
    description: 'Interface logicielle de gouvernance scolaire et académique pour les écoles secondaires en RDC conçue par Bireke Idea.',
    date: 'Octobre 2026',
    imageUrl: '/images/sgesc-systeme-ecoles.jpg'
  },
  {
    id: 'photo-amr-mugote',
    title: 'AMR MUGOTE & FILS — BILLETTERIE LAC KIVU',
    description: 'Plateforme de réservation et billetterie maritime électronique sur le lac Kivu développée par Bireke Idea.',
    date: 'Septembre 2026',
    imageUrl: '/images/amr-mugote-reservation.jpg'
  },
  {
    id: 'photo-gemma-agro',
    title: 'GEMMA-KIVU AGRO — ASSISTANT IA AGRICOLE',
    description: 'Solution d\'intelligence artificielle d\'assistance agronomique et de diagnostic des cultures au Sud-Kivu.',
    date: 'Août 2026',
    imageUrl: '/images/gemma-kivu-agro.jpg'
  },
  {
    id: 'photo-ucb-campus',
    title: 'UCB BUKAVU — ATELIERS TECH & HACKATHONS',
    description: 'Sessions d\'innovation, hackathons MLH et incubateur technologique à l\'Université Catholique de Bukavu.',
    date: '2026',
    imageUrl: '/images/ucb-bukavu-tech.jpg'
  }
];
