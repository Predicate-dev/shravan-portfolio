export const resumeData = {
  personal: {
    name: 'Shravan Balaji',
    initials: 'SB',
    title: 'Computer Science and Neuroscience at UC Berkeley',
    positioning: 'Machine learning engineer building search, signal, and systematic data systems.',
    location: 'Berkeley, California',
    email: 'shravanjbalaji@berkeley.edu',
    phone: '+1 (302) 824-6254',
    linkedin: 'https://www.linkedin.com/in/shravan-balaji',
    github: 'https://www.github.com/Predicate-dev',
    resume: `${import.meta.env.BASE_URL}Shravan_Balaji_Resume.pdf`
  },
  hero: {
    roles: [
      'Quantitative Developer Intern',
      'Machine Learning Engineer',
      'Search Infrastructure Builder',
      'Applied AI Researcher'
    ],
    summary:
      'I build ML-backed systems where modeling, infrastructure, and product clarity all matter: real-time search ranking at Amazon, seismic anomaly detection at Berkeley, and systematic data research at Millennium.',
    focus: ['Search and ranking systems', 'Signal quality and anomaly detection', 'Behavioral representation learning'],
    metrics: [
      { value: '3.93', label: 'CS GPA at Berkeley' },
      { value: '~60%', label: 'Search latency reduction' },
      { value: '99%+', label: 'Seismic classifier accuracy' },
      { value: 'Top 15', label: 'Citadel CQL national finish' }
    ]
  },
  education: {
    school: 'University of California, Berkeley',
    degree: 'B.A. Computer Science and Neuroscience',
    location: 'Berkeley, CA',
    graduation: 'Expected May 2027',
    gpa: 'CS GPA: 3.93 / 4.00',
    honors: ["Dean's List"],
    coursework: [
      'Machine Learning',
      'Artificial Intelligence',
      'Optimization Models',
      'Computer Architecture',
      'Probability Theory',
      'Linear Algebra',
      'Multivariable Calculus',
      'Differential Equations'
    ]
  },
  narrative: [
    'My work sits at the intersection of ML research and production engineering. I like systems where the model is not an isolated artifact, but part of a larger loop: data quality, feature freshness, inference latency, evaluation, and the human decision that follows.',
    'Recently, that has meant reducing latency in Amazon Search ranking infrastructure, building seismic data classifiers with real-time monitoring needs, and developing representation learning pipelines for behavioral research.'
  ],
  experience: [
    {
      company: 'Millennium Management',
      role: 'Quantitative Developer Intern',
      location: 'Miami, FL',
      period: 'June 2026 - Present',
      eyebrow: 'Systematic data platform',
      bullets: ['Conducting ML research for a systematic data platform as a Summer 2026 quantitative developer intern.'],
      tech: ['Machine Learning', 'Data Systems', 'Quant Development']
    },
    {
      company: 'Berkeley Brain-AI Resilience Center',
      role: 'Machine Learning Researcher',
      location: 'Berkeley, CA',
      period: 'September 2025 - Present',
      eyebrow: 'Behavioral representation learning',
      bullets: [
        'Developing supervised pose estimation models with DeepLabCut and ResNet architectures to extract high-precision spatiotemporal data from murine behavioral assays.',
        'Architecting an end-to-end ML pipeline integrating Variational Autoencoders and Hidden Markov Models to discover latent behavioral motifs and identify biomarkers for stress resilience.'
      ],
      tech: ['DeepLabCut', 'ResNet', 'VAE', 'HMM', 'Behavior Modeling']
    },
    {
      company: 'Amazon',
      role: 'Software Development Engineer Intern',
      location: 'Palo Alto, CA',
      period: 'May 2025 - August 2025',
      eyebrow: 'Real-time search ranking',
      bullets: [
        "Optimized feature processing for Amazon's real-time search ranking engine, reducing latency by ~60% and improving feature freshness across millions of daily queries.",
        'Developed a data ingestion and attribution pipeline with Scala and Apache Spark, deployed via AWS Lambda to DynamoDB with sub-second delivered latency on average.',
        'Implemented cloud infrastructure with AWS CDK and automated CI/CD using JUnit test suites with over 90% code coverage.'
      ],
      tech: ['Scala', 'Apache Spark', 'AWS Lambda', 'DynamoDB', 'AWS CDK', 'JUnit']
    },
    {
      company: 'Berkeley Seismological Laboratory',
      role: 'Machine Learning Engineer',
      location: 'Berkeley, CA',
      period: 'January 2025 - Present',
      eyebrow: 'Signal quality and monitoring',
      bullets: [
        'Developed and deployed CNN classifiers in PyTorch to automate real-time anomaly detection and filter instrument noise, improving core seismic signal quality by 11% with over 99% classification accuracy.',
        'Implemented high-dimensional DBSCAN clustering over 104,000 power spectral density frequency distribution plots to identify latent structural patterns and anomalies.',
        'Engineered automated seismic visualization workflows with Matplotlib and Seaborn, improving analysis efficiency by 30% and enabling real-time monitoring.'
      ],
      tech: ['PyTorch', 'Scikit-Learn', 'DBSCAN', 'Matplotlib', 'Seaborn']
    },
    {
      company: 'UCSF Health',
      role: 'Machine Learning Researcher',
      location: 'San Francisco, CA',
      period: 'November 2024 - August 2025',
      eyebrow: 'Neuroscience ML',
      bullets: [
        'Trained and evaluated Random Forest classifiers on multi-channel sleep EEG and EMG data from murine behavioral experiments using Scikit-Learn and DeepLabCut.'
      ],
      tech: ['Scikit-Learn', 'DeepLabCut', 'Random Forests', 'EEG', 'EMG']
    }
  ],
  projects: [
    {
      title: 'Voice Trainer',
      category: '1st Place Hackathon',
      summary:
        'A real-time speech coaching engine that measures pacing, volume, pitch variation, and transcript structure with immediate feedback.',
      impact: ['Sub-100ms feedback latency', '1st place, Hiya VoiceAI Hackathon', 'Offline and post-session analysis'],
      tech: ['Python', 'Vosk', 'PyTorch', 'NumPy', 'Whisper'],
      link: 'https://github.com/Predicate-dev/voice-trainer'
    },
    {
      title: 'Search Feature Attribution Pipeline',
      category: 'Amazon Search',
      summary:
        'A data ingestion and attribution system for real-time ranking signals, built for feature freshness and low-latency delivery.',
      impact: ['~60% latency reduction', 'Sub-second delivery', '90%+ test coverage'],
      tech: ['Scala', 'Apache Spark', 'AWS Lambda', 'DynamoDB', 'AWS CDK'],
      link: null
    },
    {
      title: 'Seismic Fault Detection Suite',
      category: 'Research ML',
      summary:
        'A model-driven seismic quality workflow for detecting corrupted traces, clustering spectral behavior, and monitoring data health.',
      impact: ['99%+ classifier accuracy', '104,000 PSD plots clustered', '30% faster analysis'],
      tech: ['PyTorch', 'Scikit-Learn', 'DBSCAN', 'Matplotlib', 'Seaborn'],
      link: null
    },
    {
      title: 'WordNet Graph Explorer',
      category: 'Graph Systems',
      summary:
        'A Java semantic lexicon that models word relationships and meanings through graph data structures with assessment-grade reliability.',
      impact: ['Graph-based semantic model', 'Comprehensive JUnit testing', '95% reliability target'],
      tech: ['Java', 'Graph Algorithms', 'JUnit', 'Git'],
      link: null
    }
  ],
  skills: [
    {
      category: 'Programming',
      items: ['Java', 'Python', 'Scala', 'SQL', 'C', 'C++', 'MATLAB', 'Bash', 'RISC-V', 'TypeScript']
    },
    {
      category: 'Cloud and Data',
      items: ['AWS S3', 'AWS Lambda', 'AWS SQS', 'AWS SNS', 'DynamoDB', 'Apache Spark', 'PostgreSQL', 'MongoDB']
    },
    {
      category: 'ML and Analytics',
      items: ['Pandas', 'Scikit-Learn', 'PyTorch', 'TensorFlow', 'Hugging Face', 'NumPy', 'Matplotlib', 'Seaborn']
    }
  ],
  achievements: [
    'Citadel Collegiate Quant League, Top 15 National',
    'AIME Qualifier, 2x',
    'USNCO National Qualifier, Top 200',
    'USABO Top 225 National',
    'NASA TechRise Winner, Team Leader',
    'Delaware Math League 1st Place, 2x',
    'DelawareLaunch Biotech Pitch Competition 1st Place',
    '1590 SAT and 36 ACT'
  ]
};
