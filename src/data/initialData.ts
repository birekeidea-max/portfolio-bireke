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
  title: 'DÉVELOPPEUR LOGICIEL & WEB | FLUTTER | PASSIONNÉ PAR L\'IA ET LES NOUVELLES TECHNOLOGIES',
  catchphrase: 'Je transforme les idées en solutions numériques innovantes pour répondre aux défis du monde réel.',
  shortBio: 'Étudiant en Sciences informatiques à l\'Université Catholique de Bukavu (UCB), je conçois des applications, des plateformes web et des solutions logicielles durables. Mon parcours intègre également l\'intelligence artificielle, le machine learning et les réseaux informatiques. Mon engagement est de mettre la technologie au service des personnes et de ma communauté.',
  aboutMeParagraphs: [
    'Actuellement étudiant en Sciences informatiques à l\'Université Catholique de Bukavu (UCB), je m\'investis avec rigueur et passion dans la conception, la réalisation et le déploiement de solutions logicielles adaptées à des besoins concrets.',
    'Mon parcours comprend le développement de plateformes web complètes, l\'exploration active du développement mobile avec Flutter, ainsi que l\'approfondissement régulier de l\'intelligence artificielle et du machine learning à travers des ateliers et des activités pratiques.',
    'Désireux d\'élargir constamment mon champ d\'expertise, j\'étudie également les réseaux informatiques et les télécommunications, un domaine complémentaire et stratégique au génie logiciel.',
    'Au-delà du code, je suis animé par une ambition claire : transformer les idées en solutions numériques utiles, accessibles et adaptées aux réalités de mon environnement.'
  ],
  interests: [
    'Conception et architecture de logiciels modulaires',
    'Développement d\'applications web et plateformes collaboratives',
    'Développement d\'applications mobiles multiplateformes avec Flutter',
    'Intelligence artificielle appliquée et exploration des modèles Gemma',
    'Fondements du Machine Learning et traitement des données',
    'Réseaux informatiques et infrastructures de télécommunications',
    'Transformation numérique de l\'éducation et de l\'agriculture au Kivu',
    'Collaboration au sein d\'initiatives d\'innovation technologique'
  ],
  email: 'birekeidea@gmail.com',
  phone: '+243 999 428 6469',
  whatsappRaw: '2439994286469',
  city: 'Bukavu, Sud-Kivu, RD Congo',
  university: 'Université Catholique de Bukavu (UCB)',
  avatar: '', // Aucune fausse image d'IA : l'utilisateur insère la sienne !
  github: 'https://github.com/birekeidea-max',
  linkedin: 'https://www.linkedin.com/in/idea-bireke-bashige-1084a833b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  x: 'https://x.com/IdeaB19613'
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'amr-mugote',
    name: 'AMR MUGOTE & FILS',
    category: 'Développement web, transport et transformation numérique',
    categoryKey: 'web',
    shortDescription: 'Une plateforme de billetterie électronique conçue pour moderniser la réservation des voyages sur le lac Kivu entre Bukavu et Goma.',
    problemSolved: 'La réservation traditionnelle des billets de transport lacustre entraîne des files d\'attente physiques et complique le suivi administratif des passagers et des places disponibles.',
    solutionProposed: 'AMR Mugote & Fils offre une interface web épurée permettant aux passagers de consulter les horaires, réserver leurs places et obtenir un billet électronique sécurisé.',
    features: [
      'Consultation des horaires de traversée sur le lac Kivu en temps réel.',
      'Réservation de billets en ligne adaptée aux usagers.',
      'Sélection des classes de voyage selon les disponibilités.',
      'Génération de billets électroniques munis de codes de vérification.',
      'Interface d\'administration pour la gestion des passagers et traversées.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    demoUrl: 'https://amr-mugote.gdgocucbukavu.dev/',
    status: 'Plateforme en ligne & Démo active',
    note: 'Projet présenté dans le cadre des activités d\'innovation et Demo Day.'
  },
  {
    id: 'gestion-ecoles',
    name: 'GESTION DES ÉCOLES',
    category: 'Développement web et transformation numérique éducative',
    categoryKey: 'web',
    shortDescription: 'Une solution numérique conçue pour moderniser le système scolaire, automatiser le suivi des élèves et simplifier la gestion administrative.',
    problemSolved: 'Le manque de centralisation des registres scolaires papier génère des pertes de données, des lenteurs administratives et une difficulté de suivi des frais scolaires.',
    solutionProposed: 'Plateforme centralisée permettant d\'enregistrer les promotions, de gérer les fiches d\'élèves et d\'assurer la traçabilité des opérations académiques.',
    features: [
      'Centralisation sécurisée des dossiers scolaires et notes des élèves.',
      'Gestion des effectifs par classe et année scolaire.',
      'Suivi de la situation administrative et académique en temps réel.',
      'Interface épurée et intuitive adaptée au personnel administratif.'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web'],
    demoUrl: 'https://gestion-ecoles.vercel.app/',
    status: 'Plateforme déployée'
  },
  {
    id: 'gemma-kivu-agro',
    name: 'GEMMA-KIVU AGRO',
    category: 'Intelligence artificielle, agriculture et innovation locale',
    categoryKey: 'ai',
    shortDescription: 'Projet d\'intelligence artificielle explorant l\'accompagnement des agriculteurs du Kivu face aux maladies des cultures vivrières.',
    problemSolved: 'L\'accès limité aux connaissances agronomiques spécialisées ralentit le diagnostic précoce des maladies végétales comme celles affectant les bananiers au Kivu.',
    solutionProposed: 'Assistant intelligent basé sur les modèles ouverts Gemma, vulgarisant les pratiques de traitement agricole dans un langage accessible.',
    features: [
      'Exploration des modèles ouverts Gemma pour l\'analyse de contextes agronomiques.',
      'Fiches de diagnostic pour les maladies courantes du bananier.',
      'Assistance interactive et conseils préventifs pour les exploitants.',
      'Conception pensée pour les conditions et contraintes du terrain au Sud-Kivu.'
    ],
    technologies: ['Intelligence Artificielle', 'Modèles Gemma', 'Machine Learning', 'Web'],
    demoUrl: 'https://gemma-kivu-agro-app.vercel.app/',
    status: 'Projet d\'innovation & Exploration IA'
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
    subtitle: 'Exploration active des modèles ouverts',
    skills: [
      { name: 'IA Générative', status: 'Exploration active', description: 'Compréhension et intégration de modèles conversationnels' },
      { name: 'Modèles Gemma', status: 'Exploration active', description: 'Expérimentation sur les modèles légers Google pour cas d\'usage agricoles' },
      { name: 'Machine Learning', status: 'En cours d\'apprentissage', description: 'Ateliers pratiques, traitement de données et apprentissage supervisé' }
    ]
  },
  {
    title: 'RÉSEAUX & TÉLÉCOMMUNICATIONS',
    subtitle: 'Domaines d\'études complémentaires au génie logiciel',
    skills: [
      { name: 'Réseaux informatiques', status: 'En cours d\'apprentissage', description: 'Étude des protocoles TCP/IP, topologies, routage et commutation' },
      { name: 'Télécommunications', status: 'En cours d\'apprentissage', description: 'Infrastructures de communication, transmission et réseaux sans fil' }
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-gdg',
    title: 'PARTICIPATION AUX INITIATIVES D\'INNOVATION & DEMO DAY',
    organization: 'GOOGLE DEVELOPER GROUPS (GDG) ON CAMPUS UCB',
    period: 'En cours',
    badge: 'Communauté & Incubation',
    description: 'Participation active aux ateliers, activités communautaires et programmes d\'incubation technologique de l\'Université Catholique de Bukavu.',
    highlights: [
      'Présentation et développement du projet de billetterie lacustre AMR Mugote & Fils au Demo Day.',
      'Partage d\'expériences techniques avec les étudiants développeurs de l\'UCB.',
      'Collaboration autour de solutions numériques répondant aux besoins de la région.'
    ]
  },
  {
    id: 'exp-gemma',
    title: 'ACTIVITÉS D\'INNOVATION AUTOUR DE L\'IA ET GEMMA',
    organization: 'INITIATIVES GEMMA & COMMUNAUTÉ TECH',
    period: 'En cours',
    badge: 'Intelligence Artificielle',
    description: 'Exploration concrète de l\'intelligence artificielle pour apporter des réponses aux défis de la région du Kivu.',
    highlights: [
      'Conception du projet Gemma-Kivu Agro destiné à vulgariser l\'information agricole.',
      'Expérimentation des capacités d\'assistance des modèles ouverts Gemma.',
      'Veille technologique continue sur le machine learning appliqué.'
    ]
  },
  {
    id: 'exp-mlh',
    title: 'PARTICIPATION AUX INITIATIVES ET HACKATHONS',
    organization: 'MAJOR LEAGUE HACKING (MLH)',
    period: 'En cours',
    badge: 'Hackathons Internationaux',
    description: 'Immersion dans les hackathons technologiques pour développer ses compétences de résolution rapide de problèmes en équipe.',
    highlights: [
      'Participation à des sessions collaboratives et challenges techniques.',
      'Découverte d\'outils et bibliothèques logicielles open-source modernes.',
      'Échanges avec la communauté mondiale de développeurs.'
    ]
  },
  {
    id: 'exp-workshops',
    title: 'ATELIERS PRATIQUES EN IA & MACHINE LEARNING',
    organization: 'FORMATIONS CONTINUES & ATELIERS TECHNIQUES',
    period: 'En cours',
    badge: 'Formation Continue',
    description: 'Approfondissement des notions théoriques et des implémentations de l\'intelligence artificielle.',
    highlights: [
      'Ateliers axés sur l\'analyse des données et la construction de modèles.',
      'Étude continue des architectures logicielles et modèles de langage.',
      'Orientation vers des applications concrètes pour la communauté.'
    ]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: 'UNIVERSITÉ CATHOLIQUE DE BUKAVU (UCB)',
  degree: 'Sciences Informatiques',
  status: 'Étudiant en cours de formation',
  description: 'Formation universitaire complète axée sur les fondements de l\'informatique, l\'algorithmique, le génie logiciel, les systèmes et les bases de données.',
  complementary: 'Apprentissage autodidacte régulier et participation à des ateliers techniques en réseaux informatiques, télécommunications, Flutter et intelligence artificielle.'
};

export const LANGUAGES_DATA: LanguageItem[] = [
  { name: 'FRANÇAIS', level: 'Langue d\'instruction & professionnelle' },
  { name: 'ANGLAIS', level: 'Lecture technique & communication' },
  { name: 'SWAHILI', level: 'Langue courante' },
  { name: 'LINGALA', level: 'Notions de base' },
  { name: 'LATIN', level: 'Notions de base' }
];

export const INITIAL_PHOTOS: PhotoItem[] = [];
