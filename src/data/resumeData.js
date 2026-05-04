export const resumeData = {
  personal: {
    name: 'Shravan Balaji',
    title: 'Software Engineer, ML Builder, and Quant Systems Explorer',
    location: 'Berkeley, California',
    email: 'shravanjbalaji@berkeley.edu',
    phone: '+1 (302) 824-6254',
    linkedin: 'https://www.linkedin.com/in/shravan-balaji',
    github: 'https://www.github.com/Predicate-dev'
  },
  hero: {
    tagline: 'Computer Science and Neuroscience at UC Berkeley',
    rotatingTitles: [
      'Machine Learning Engineer',
      'Full-Stack Product Builder',
      'Quantitative Developer',
      'Data Systems Engineer'
    ],
    highlightPills: ['Incoming Quant @ Millennium', 'Amazon Search SDE', 'Berkeley ML Research'],
    summary:
      'I build production-grade software, ML pipelines, and real-time data products that balance research depth with shipping discipline.',
    secondary:
      'My sweet spot is turning technically demanding work into interfaces and systems that feel fast, clear, and trustworthy.',
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
      'Real-time ML and analytics systems',
      'Scalable backend pipelines on cloud infrastructure',
      'Product experiences that turn technical depth into clear user value'
    ]
  },
  about: {
    paragraphs: [
      'I am a Berkeley student working at the intersection of machine learning, distributed systems, and product engineering. My recent work spans large-scale search infrastructure at Amazon, research-grade pose estimation and latent behavior modeling, and production ML workflows for seismic quality analysis.',
      'What excites me most is building tools that feel sharp on the surface because the systems under them are thoughtful, measurable, and robust. I enjoy moving between modeling, backend architecture, experimentation, and polished user-facing experiences.'
    ],
    strengths: [
      {
        title: 'Systems That Scale',
        text: 'I enjoy backend and data-intensive engineering where performance, reliability, and delivery speed all matter.'
      },
      {
        title: 'Research With Product Taste',
        text: 'I am comfortable taking ambiguous ML or analytics work and shaping it into something usable and decision-ready.'
      },
      {
        title: 'Execution With Range',
        text: 'From infrastructure and testing to UX polish, I like shipping the full story instead of only one slice of it.'
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
    note: 'Built with React, Tailwind CSS, and Framer Motion.'
  }
};
