export const resumeData = {
  personal: {
    name: 'Shravan Balaji',
    title: 'Machine Learning Engineer and Applied AI Systems Builder',
    location: 'Berkeley, California',
    email: 'shravanjbalaji@berkeley.edu',
    phone: '+1 (302) 824-6254',
    linkedin: 'https://www.linkedin.com/in/shravan-balaji',
    github: 'https://www.github.com/Predicate-dev'
  },
  intro: {
    eyebrow: 'Machine Learning Engineer',
    headline: ['Research signal.', 'Production discipline.', 'Built to feel clear.'],
    description:
      'I build ML systems that move from experimentation to reliable deployment, with product thinking strong enough to make the work legible.',
    stats: [
      { label: 'Model Accuracy', value: '99%+' },
      { label: 'Latency Improvement', value: '~60%' },
      { label: 'Pipelines Built', value: 'Research to prod' }
    ]
  },
  hero: {
    tagline: 'Machine Learning Engineer at UC Berkeley',
    rotatingTitles: [
      'Machine Learning Engineer',
      'Applied AI Engineer',
      'ML Systems Builder',
      'Research-to-Production Engineer'
    ],
    highlightPills: ['ML Research @ Berkeley', 'PyTorch + Scikit Systems', 'Search + Data Pipelines'],
    summary:
      'I design and ship machine learning systems, model pipelines, and real-time data infrastructure that balance research depth with production rigor.',
    secondary:
      'My edge is taking technically demanding modeling work and turning it into systems that are measurable, scalable, and easy to trust.',
    metrics: [
      { label: 'CS GPA', value: '3.93 / 4.00' },
      { label: 'Search Latency Gain', value: '~60% faster' },
      { label: 'Model Accuracy', value: '99%+' }
    ],
    sideHighlights: [
      {
        label: 'Amazon Search',
        value: '~60% faster',
        note: 'Improved feature freshness and ranking latency at large scale.'
      },
      {
        label: 'Seismic ML',
        value: '99%+ accuracy',
        note: 'Built classifiers for data-quality detection and monitoring.'
      },
      {
        label: 'Behavior Modeling',
        value: 'End-to-end pipeline',
        note: 'Designed latent motif discovery workflows with VAE and HMM models.'
      }
    ],
    focusAreas: [
      'Applied machine learning and behavioral modeling',
      'Real-time inference and data pipeline systems',
      'Cloud-backed platforms that translate technical depth into product value'
    ]
  },
  about: {
    paragraphs: [
      'I am a Berkeley student focused on machine learning engineering across research, infrastructure, and product-facing systems. My recent work spans search infrastructure at Amazon, pose estimation and latent behavior modeling in research settings, and production ML workflows for seismic quality analysis.',
      'What excites me most is building systems where the model work is only one part of the craft. I care just as much about pipelines, deployment, latency, evaluation, and the clarity of the final experience as I do about the modeling itself.'
    ],
    strengths: [
      {
        title: 'Modeling With Rigor',
        text: 'I like ML work that is measurable and grounded, whether that means supervised modeling, latent representation learning, or applied experimentation.'
      },
      {
        title: 'Pipelines That Ship',
        text: 'I build the surrounding system too: ingestion, feature processing, infrastructure, evaluation loops, and deployment paths.'
      },
      {
        title: 'Research to Production',
        text: 'I am especially comfortable translating exploratory ML or analytics work into production-quality systems that people can depend on.'
      }
    ]
  },
  education: {
    school: 'University of California, Berkeley',
    degree: 'Bachelor of Arts in Computer Science and Neuroscience',
    location: 'Berkeley, CA',
    graduation: 'Expected May 2027',
    gpa: '3.93 / 4.00',
    honors: ["Dean's List"],
    coursework: [
      'Machine Learning',
      'Artificial Intelligence',
      'Optimization Models',
      'Computer Architecture',
      'Probability Theory',
      'Linear Algebra'
    ]
  },
  skills: [
    {
      category: 'Languages',
      items: ['Java', 'Python', 'Scala', 'SQL', 'TypeScript', 'C', 'C++', 'MATLAB', 'Bash', 'RISC-V']
    },
    {
      category: 'Frameworks',
      items: ['Apache Spark', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'AWS CDK']
    },
    {
      category: 'Tools',
      items: [
        'AWS S3',
        'AWS Lambda',
        'AWS SQS',
        'AWS SNS',
        'DynamoDB',
        'PostgreSQL',
        'MongoDB',
        'Pandas',
        'NumPy',
        'Git',
        'JUnit',
        'Matplotlib',
        'Seaborn'
      ]
    }
  ],
  experience: [
    {
      company: 'Millennium Management',
      role: 'Incoming Quantitative Developer Intern',
      location: 'Miami, FL',
      period: 'June 2026 - Present',
      bullets: ['Incoming Quantitative Developer Intern for Summer 2026.'],
      tech: ['Python', 'Quantitative Research', 'Data Systems']
    },
    {
      company: 'Berkeley Brain-AI Resilience Center',
      role: 'Machine Learning Researcher',
      location: 'Berkeley, CA',
      period: 'September 2025 - Present',
      bullets: [
        'Developing supervised pose estimation models with DeepLabCut and ResNet architectures to extract high-precision spatiotemporal data from rodent behavioral assays.',
        'Architecting an end-to-end ML pipeline that integrates Variational Autoencoders and Hidden Markov Models to discover latent behavioral motifs and identify biomarkers for stress resilience.'
      ],
      tech: ['DeepLabCut', 'ResNet', 'VAE', 'HMM', 'Behavior Modeling']
    },
    {
      company: 'Amazon Search',
      role: 'Software Development Engineer Intern',
      location: 'Palo Alto, CA',
      period: 'May 2025 - August 2025',
      bullets: [
        'Developed a data ingestion and attribution pipeline with Scala and Apache Spark, deployed through AWS Lambda and DynamoDB with sub-second delivered latency.',
        "Optimized feature processing for Amazon's real-time search ranking engine, reducing latency by roughly 60% and improving data freshness across millions of daily queries.",
        'Implemented cloud infrastructure with AWS CDK and automated CI/CD backed by JUnit suites maintaining at least 90% code coverage.'
      ],
      tech: ['Scala', 'Apache Spark', 'AWS Lambda', 'DynamoDB', 'AWS CDK']
    },
    {
      company: 'Berkeley Seismological Laboratory',
      role: 'Machine Learning Engineer',
      location: 'Berkeley, CA',
      period: 'January 2025 - Present',
      bullets: [
        'Built and deployed CNN classifiers with PyTorch and Scikit-Learn to identify faulty seismological data with over 99% accuracy.',
        'Implemented DBSCAN clustering over 104,000 power spectral density plots to segment seismic behavior into meaningful groups.',
        'Engineered automated visualization workflows with Matplotlib and Seaborn, improving analysis efficiency by 30% and enabling real-time monitoring.'
      ],
      tech: ['PyTorch', 'Scikit-Learn', 'DBSCAN', 'Matplotlib', 'Seaborn']
    }
  ],
  projects: [
    {
      title: 'Voice Trainer',
      category: 'Product Project',
      blurb:
        'A real-time speech coaching system that analyzes pacing, volume, pitch variation, and transcript quality with instant feedback.',
      metrics: ['Sub-100ms feedback', 'Offline speech recognition', 'Post-session review'],
      tech: ['Python', 'NumPy', 'Vosk', 'PyTorch', 'Whisper', 'pyttsx3'],
      challenge: 'Build a speech feedback loop that feels immediate during a live session without sacrificing transcription quality.',
      outcome:
        'Combined low-latency live recognition with deeper post-session analysis to create a modular coaching workflow for speaking performance.',
      link: 'https://github.com/Predicate-dev/voice-trainer'
    },
    {
      title: 'Search Feature Attribution Pipeline',
      category: 'Internship System',
      blurb:
        'A backend data pipeline for real-time ranking features that improved freshness and reduced critical search latency.',
      metrics: ['~60% latency reduction', 'Sub-second delivery', '90%+ test coverage'],
      tech: ['Scala', 'Apache Spark', 'AWS Lambda', 'DynamoDB', 'AWS CDK'],
      challenge:
        'Improve ranking feature delivery speed while keeping ingestion reliable at search-engine scale.',
      outcome:
        'Shipped ingestion, processing, infrastructure, and CI/CD improvements that accelerated feature computation across millions of daily queries.',
      link: null
    },
    {
      title: 'Seismic Fault Detection Suite',
      category: 'Research Platform',
      blurb:
        'A model-driven seismic quality analysis workflow for identifying corrupted traces and monitoring data health in real time.',
      metrics: ['99%+ classifier accuracy', '104k plots clustered', '30% faster analysis'],
      tech: ['PyTorch', 'Scikit-Learn', 'DBSCAN', 'Matplotlib', 'Seaborn'],
      challenge:
        'Increase data quality and observability across noisy seismological inputs used in downstream research workflows.',
      outcome:
        'Delivered classification, clustering, and visualization tooling that improved quality control speed and supported continuous monitoring.',
      link: null
    },
    {
      title: 'WordNet Graph Explorer',
      category: 'Computer Science Project',
      blurb:
        'A semantic lexicon and graph analysis tool for modeling word relationships with strong reliability guarantees.',
      metrics: ['Graph-based architecture', 'JUnit validated', '95% reliability target'],
      tech: ['Java', 'Graph Algorithms', 'JUnit', 'Git'],
      challenge:
        'Represent rich semantic relationships in a way that stays fast to query and easy to validate during assessment.',
      outcome:
        'Built a Java graph model for lexical relationships and backed it with comprehensive testing for consistent behavior under evaluation.',
      link: null
    }
  ],
  achievements: [
    'Citadel Collegiate Quant League, Top 15 National (2025)',
    'American Invitational Mathematics Examination Qualifier (2022 - 2023)',
    'Delaware Mathematics League Individual 1st Place, Regional (2020 and 2023)',
    'United States National Chemistry Olympiad National Qualifier, Top 150 (2022 and 2023)',
    'United States Biology Olympiad Semifinalist, Top 225 (2021 and 2023)',
    'NASA TechRise Winner, Team Leader (2023)'
  ],
  footer: {
    note: 'Built with React, Tailwind CSS, and Framer Motion, with an ML-engineer-first narrative and intro sequence.'
  }
};
