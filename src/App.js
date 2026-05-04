import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IntroLanding } from './components/IntroLanding.jsx';
import { ProjectCard } from './components/ProjectCard.jsx';
import { SectionReveal } from './components/SectionReveal.jsx';
import { TimelineItem } from './components/TimelineItem.jsx';
import { TypingHeadline } from './components/TypingHeadline.jsx';
import { resumeData } from './data/resumeData.js';

const navItems = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

const trackedSections = ['home', ...navItems.map((item) => item.id)];
const projectFilters = ['All', ...new Set(resumeData.projects.map((project) => project.category))];
const experienceThemes = ['Applied ML', 'Inference Pipelines', 'Cloud Deployment', 'Behavior Modeling'];
const introVersion = 'cinematic-ml-intro-v2';
const contactLinks = [
  { label: 'LinkedIn', href: resumeData.personal.linkedin },
  { label: 'GitHub', href: resumeData.personal.github },
  { label: 'Email', href: `mailto:${resumeData.personal.email}` }
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <SectionReveal className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.36em] text-electric/75">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
    </SectionReveal>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.sessionStorage.getItem('portfolioIntroSeen') === introVersion;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    website: ''
  });
  const [feedback, setFeedback] = useState({ type: 'idle', message: '' });

  const filteredProjects =
    selectedProjectFilter === 'All'
      ? resumeData.projects
      : resumeData.projects.filter((project) => project.category === selectedProjectFilter);

  useEffect(() => {
    const sectionElements = trackedSections
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0.15, 0.35, 0.6]
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (introComplete) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [introComplete]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleEnterIntro = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('portfolioIntroSeen', introVersion);
    }

    setIntroComplete(true);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (feedback.message) {
      setFeedback({ type: 'idle', message: '' });
    }

    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleCopyEmail = async () => {
    if (!navigator?.clipboard) {
      setFeedback({
        type: 'error',
        message: 'Clipboard access is not available in this browser.'
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(resumeData.personal.email);
      setCopiedEmail(true);
      setFeedback({
        type: 'success',
        message: 'Email copied. You can paste it anywhere.'
      });
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Copy failed. Please use the email link directly.'
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanName = formState.name.trim();
    const cleanEmail = formState.email.trim();
    const cleanMessage = formState.message.trim();
    const cleanOrganization = formState.organization.trim();
    const cleanWebsite = formState.website.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setFeedback({
        type: 'error',
        message: 'Please add your name, email, and message before sending.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ type: 'idle', message: '' });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          organization: cleanOrganization,
          message: cleanMessage,
          website: cleanWebsite
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || 'Unable to send your message right now. Please try again or email directly.'
        );
      }

      setFeedback({
        type: 'success',
        message: result?.message || `Message sent successfully to ${resumeData.personal.email}.`
      });
      setFormState({
        name: '',
        email: '',
        organization: '',
        message: '',
        website: ''
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to send your message right now. Please email directly instead.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-slate-100">
      <AnimatePresence>{!introComplete ? <IntroLanding onEnter={handleEnterIntro} /> : null}</AnimatePresence>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric via-electric-soft to-emerald"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-hero-mesh" />
      <div className="pointer-events-none fixed left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-electric/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-10rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-emerald/10 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="font-display text-lg tracking-[0.28em] text-white">
            SB
          </a>

          <div className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.2em] transition ${
                    isActive
                      ? 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(125,211,252,0.16)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href={resumeData.personal.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="hidden rounded-full border border-electric/20 bg-electric/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-electric transition hover:border-electric/40 hover:bg-electric/15 sm:inline-flex"
            >
              GitHub
            </motion.a>

            <motion.button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((current) => !current)}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white transition hover:border-electric/30 md:hidden"
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </motion.button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 bg-ink-soft/95 px-6 py-5 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-3">
                <a
                  href="#home"
                  onClick={closeMenu}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.22em] text-white"
                >
                  Home
                </a>

                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.22em] transition ${
                      activeSection === item.id
                        ? 'border-electric/30 bg-electric/10 text-electric-soft'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs uppercase tracking-[0.22em] text-slate-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <motion.main
        id="main-content"
        initial={false}
        animate={introComplete ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0.88, scale: 1.015, filter: 'blur(6px)' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <section
          id="home"
          className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 py-16 sm:py-24 lg:px-8"
        >
          <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <SectionReveal className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
                {resumeData.hero.tagline}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {resumeData.hero.highlightPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <h1 className="mt-8 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                {resumeData.personal.name}
              </h1>

              <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400 sm:text-base">
                {resumeData.personal.title}
              </p>

              <TypingHeadline
                titles={resumeData.hero.rotatingTitles}
                className="mt-5 flex min-h-[3.5rem] items-center font-display text-2xl text-electric sm:min-h-[4rem] sm:text-4xl"
              />

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                {resumeData.hero.summary}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                {resumeData.hero.secondary}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <motion.a
                  href="#projects"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-slate-200"
                >
                  View ML Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-electric/30 hover:bg-electric/10"
                >
                  Start a Conversation
                </motion.a>
                <motion.a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-emerald/30 hover:text-white"
                >
                  View LinkedIn
                </motion.a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald/20 bg-emerald/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-soft">
                  Open to Summer 2026
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                  Berkeley, California
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                  Expected May 2027
                </span>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {resumeData.hero.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="glass-panel rounded-[24px] border border-white/10 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{metric.label}</p>
                    <p className="mt-3 font-display text-2xl text-white">{metric.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {resumeData.hero.focusAreas[index] || resumeData.personal.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="glass-panel section-grid relative overflow-hidden rounded-[32px] border border-white/10 p-6 shadow-glow-blue sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-electric/75">Current Focus</p>
                    <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight text-white">
                      Building machine learning systems that move from research to production cleanly.
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald/20 bg-emerald/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-soft">
                    Summer 2026
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Recent work spans large-scale ranking infrastructure, ML pipelines for research, and model-driven analysis
                  systems that prioritize both speed and clarity.
                </p>

                <div className="mt-8 grid gap-4">
                  {resumeData.hero.sideHighlights.map((highlight) => (
                    <motion.div
                      key={highlight.label}
                      whileHover={{ x: 4 }}
                      className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{highlight.label}</p>
                        <p className="font-display text-xl text-white">{highlight.value}</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{highlight.note}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Education</p>
                    <h3 className="mt-3 font-display text-2xl text-white">{resumeData.education.school}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{resumeData.education.degree}</p>
                    <p className="mt-4 text-sm text-slate-400">{resumeData.education.graduation}</p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Direct Reach</p>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                      <p>{resumeData.personal.email}</p>
                      <p>{resumeData.personal.phone}</p>
                      <p>{resumeData.personal.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Machine learning engineering is strongest when the surrounding system is just as thoughtful as the model."
            description="This section now leads with modeling, ML infrastructure, and research-to-production translation so the positioning is clear before visitors dive deeper."
          />

          <div className="mt-14 grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
            <SectionReveal className="glass-panel rounded-[32px] border border-white/10 p-7 shadow-glow-blue sm:p-8">
              <div className="space-y-6 text-base leading-8 text-slate-300">
                {resumeData.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {resumeData.about.strengths.map((strength) => (
                  <motion.div
                    key={strength.title}
                    whileHover={{ y: -4 }}
                    className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-electric/75">{strength.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{strength.text}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={0.1}>
              <div className="grid gap-6">
                <div className="glass-panel rounded-[28px] border border-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-electric/75">Coursework</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {resumeData.education.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-[28px] border border-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald/75">Honors</p>
                  <div className="mt-4 space-y-3">
                    <p className="font-display text-3xl text-white">{resumeData.education.gpa}</p>
                    {resumeData.education.honors.map((honor) => (
                      <p key={honor} className="text-sm text-slate-300">
                        {honor}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-glow-emerald">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald/75">Achievement Snapshot</p>
                  <div className="mt-4 space-y-3">
                    {resumeData.achievements.slice(0, 3).map((achievement) => (
                      <p key={achievement} className="text-sm leading-7 text-slate-300">
                        {achievement}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Experience"
            title="A timeline centered on applied ML, production data systems, and research-grade modeling."
            description="The story here now reads more clearly as machine learning engineering work across search, research, and deployment-heavy environments."
          />

          <SectionReveal className="mt-10 flex flex-wrap gap-3">
            {experienceThemes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300"
              >
                {theme}
              </span>
            ))}
          </SectionReveal>

          <div className="relative mt-16 space-y-10">
            <div className="timeline-glow absolute bottom-0 left-[12px] top-0 w-px md:left-1/2 md:-translate-x-px" />

            {resumeData.experience.map((item, index) => (
              <TimelineItem
                key={`${item.company}-${item.role}`}
                item={item}
                index={index}
                side={index % 2 === 0 ? 'right' : 'left'}
              />
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title="A toolkit that supports modeling, data pipelines, and production deployment."
            description="The categories are still resume-backed, but the framing is now more explicitly aligned with applied ML engineering and supporting infrastructure work."
          />

          <div className="mt-14 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-6 md:grid-cols-3">
              {resumeData.skills.map((group, index) => (
                <SectionReveal
                  key={group.category}
                  delay={index * 0.08}
                  direction={index === 1 ? 'up' : index === 2 ? 'left' : 'right'}
                  className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-glow-blue"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.26em] text-electric/75">{group.category}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {group.items.length}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal
              direction="left"
              delay={0.1}
              className="glass-panel rounded-[32px] border border-white/10 p-6 shadow-glow-emerald sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-emerald/75">Recognition</p>
              <h3 className="mt-4 font-display text-3xl text-white">
                Analytical range that extends well beyond day-to-day implementation work.
              </h3>
              <div className="mt-8 space-y-4">
                {resumeData.achievements.map((achievement) => (
                  <motion.div
                    key={achievement}
                    whileHover={{ x: 4 }}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm leading-7 text-slate-300">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="A filterable gallery of ML systems, infrastructure work, and product-facing builds."
            description="The projects are still interactive, but now the section reads more clearly as a mix of modeling work, pipeline engineering, and production-ready technical systems."
          />

          <SectionReveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {projectFilters.map((filter) => {
                const isActive = selectedProjectFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedProjectFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                      isActive
                        ? 'border-electric/30 bg-electric/10 text-electric-soft'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-slate-400">
              Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-6 text-sm text-slate-500">
            Hover on desktop or tap on mobile to reveal the build story on each card.
          </SectionReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="A cleaner closing section for ML roles, technical collaboration, and engineering conversations."
            description="The form still stays lightweight, but the section now reads more like a strong endpoint for internships, research collaboration, and machine learning engineering roles."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionReveal className="glass-panel rounded-[32px] border border-white/10 p-7 shadow-glow-blue sm:p-8">
              <p className="text-xs uppercase tracking-[0.26em] text-electric/75">Direct Reach</p>
              <h3 className="mt-4 font-display text-3xl text-white">
                Let&apos;s talk about product engineering, ML, or high-performance systems.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Email is the fastest route for recruiting conversations, internships, collaboration ideas, or technical
                projects that need both system depth and product polish. The form on the right now sends directly to my
                inbox instead of opening a draft.
              </p>

              <div className="mt-8 space-y-5 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Email</p>
                  <a href={`mailto:${resumeData.personal.email}`} className="mt-2 block text-base text-white">
                    {resumeData.personal.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">LinkedIn</p>
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-base text-white"
                  >
                    shravan-balaji
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">GitHub</p>
                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-base text-white"
                  >
                    Predicate-dev
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200 transition hover:border-electric/30 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    copiedEmail
                      ? 'border-emerald/30 bg-emerald/10 text-emerald-soft'
                      : 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-emerald/30 hover:text-white'
                  }`}
                >
                  {copiedEmail ? 'Email Copied' : 'Copy Email'}
                </motion.button>
              </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={0.12}>
              <motion.form
                onSubmit={handleSubmit}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-[32px] border border-white/10 p-7 shadow-glow-emerald sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Name</span>
                    <input
                      className="field-shell"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Email</span>
                    <input
                      className="field-shell"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">
                      Organization
                    </span>
                    <input
                      className="field-shell"
                      type="text"
                      name="organization"
                      autoComplete="organization"
                      value={formState.organization}
                      onChange={handleChange}
                      placeholder="Company or team"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Message</span>
                    <textarea
                      className="field-shell min-h-[170px] resize-none"
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me a bit about the role, project, or idea."
                    />
                  </label>

                  <label className="hidden" aria-hidden="true">
                    <span>Website</span>
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      className="field-shell"
                      type="text"
                      name="website"
                      value={formState.website}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  <div aria-live="polite" className="text-sm">
                    {feedback.message ? (
                      <p className={feedback.type === 'error' ? 'text-rose-300' : 'text-emerald-soft'}>
                        {feedback.message}
                      </p>
                    ) : (
                      <p className="text-slate-500">
                        Delivers directly to {resumeData.personal.email} through the contact API.
                      </p>
                    )}
                  </div>
                </div>
              </motion.form>
            </SectionReveal>
          </div>
        </section>
      </motion.main>

      <footer className="mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-8">
        <div className="glass-panel rounded-[28px] border border-white/10 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-white">{resumeData.personal.name}</p>
              <p className="mt-2 text-sm text-slate-400">{resumeData.footer.note}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-electric/30 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#home"
                className="rounded-full border border-electric/20 bg-electric/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-electric-soft transition hover:border-electric/40"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
