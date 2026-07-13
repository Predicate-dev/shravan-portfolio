import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { resumeData } from './data/resumeData.js';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

const trackedSections = ['home', ...navItems.map((item) => item.id)];

function Reveal({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.22 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ kicker, title, description }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{kicker}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-white sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}

function SignalPanel() {
  const cells = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        height: 22 + ((index * 17) % 70),
        delay: (index % 9) * 0.08,
        active: [2, 5, 9, 14, 19, 23, 30, 37].includes(index)
      })),
    []
  );

  return (
    <div className="relative min-h-[34rem] overflow-hidden border border-white/10 bg-[#07120f] p-5 shadow-[0_30px_120px_rgba(16,185,129,0.18)] sm:p-7">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,184,166,0.12),transparent_38%,rgba(245,158,11,0.08))]" />

      <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="eyebrow text-emerald-200/80">Live Signal Surface</p>
          <h2 className="mt-3 font-display text-2xl text-white">Search, seismic, and behavior data</h2>
        </div>
        <span className="border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
          ML Systems
        </span>
      </div>

      <div className="relative mt-10 grid grid-cols-7 gap-3">
        {cells.map((cell) => (
          <motion.span
            key={cell.id}
            initial={{ opacity: 0.35, scaleY: 0.72 }}
            animate={{ opacity: cell.active ? [0.55, 1, 0.6] : [0.28, 0.62, 0.32], scaleY: [0.74, 1, 0.8] }}
            transition={{ duration: 3.4, repeat: Infinity, delay: cell.delay, ease: 'easeInOut' }}
            className={`block origin-bottom border ${
              cell.active
                ? 'border-emerald-200/40 bg-emerald-300/35 shadow-[0_0_28px_rgba(110,231,183,0.38)]'
                : 'border-white/10 bg-white/[0.055]'
            }`}
            style={{ height: `${cell.height}px` }}
          />
        ))}
      </div>

      <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
        {resumeData.hero.focus.map((item) => (
          <div key={item} className="border border-white/10 bg-black/20 p-4">
            <p className="text-sm leading-6 text-slate-200">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', organization: '', message: '', website: '' });
  const [feedback, setFeedback] = useState('');

  const projectFilters = useMemo(
    () => ['All', ...new Set(resumeData.projects.map((project) => project.category))],
    []
  );
  const filteredProjects =
    selectedProjectFilter === 'All'
      ? resumeData.projects
      : resumeData.projects.filter((project) => project.category === selectedProjectFilter);

  useEffect(() => {
    const sections = trackedSections.map((sectionId) => document.getElementById(sectionId)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-42% 0px -45% 0px', threshold: [0.2, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback('');
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.personal.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${resumeData.personal.email}`;
    }
  };

  const openMailFallback = ({ name, email, organization, message }) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Organization: ${organization || 'Not provided'}`, '', message].join('\n')
    );
    window.location.href = `mailto:${resumeData.personal.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clean = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      organization: formState.organization.trim(),
      message: formState.message.trim(),
      website: formState.website.trim()
    };

    if (!clean.name || !clean.email || !clean.message) {
      setFeedback('Please add your name, email, and message.');
      return;
    }

    if (clean.website) {
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clean)
      });

      if (!response.ok) {
        throw new Error('Contact API unavailable');
      }

      setFeedback('Message sent. Thank you.');
      setFormState({ name: '', email: '', organization: '', message: '', website: '' });
    } catch {
      setFeedback('Opening your email client with a ready-to-send draft.');
      openMailFallback(clean);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="font-display text-lg font-bold tracking-[0.28em] text-white">
            {resumeData.personal.initials}
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={resumeData.personal.resume} target="_blank" rel="noreferrer" className="btn-primary hidden sm:inline-flex">
              Resume
            </a>
            <button
              type="button"
              className="btn-ghost md:hidden"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>

        {mobileMenuOpen ? (
          <div className="border-t border-white/10 bg-ink-soft px-5 py-4 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.18em] text-slate-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main id="main-content">
        <section id="home" className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,150,105,0.16),transparent_32%,rgba(14,165,233,0.08)_65%,rgba(245,158,11,0.08))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:px-8">
            <div>
              <Reveal>
                <p className="eyebrow">Berkeley CS + Neuroscience</p>
                <h1 className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
                  {resumeData.personal.name}
                </h1>
                <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200 sm:text-2xl">
                  {resumeData.personal.positioning}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{resumeData.hero.summary}</p>
              </Reveal>

              <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-3">
                {resumeData.hero.roles.map((role) => (
                  <span key={role} className="chip">
                    {role}
                  </span>
                ))}
              </Reveal>

              <Reveal delay={0.14} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#projects" className="btn-primary">
                  View Work
                </a>
                <a href={resumeData.personal.resume} target="_blank" rel="noreferrer" className="btn-secondary">
                  Download Resume
                </a>
                <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                  LinkedIn
                </a>
              </Reveal>

              <Reveal delay={0.2} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {resumeData.hero.metrics.map((metric) => (
                  <div key={metric.label} className="metric-tile">
                    <p className="font-display text-3xl text-white">{metric.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <SignalPanel />
            </Reveal>
          </div>
        </section>

        <section id="about" className="section-shell">
          <SectionHeader
            kicker="About"
            title="I turn noisy data into reliable ML systems."
            description="My strongest work combines modeling judgment with the infrastructure needed to make that judgment useful in production."
          />

          <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <Reveal className="content-panel p-6 sm:p-8">
              <div className="space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
                {resumeData.narrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="content-panel p-6 sm:p-8">
              <p className="eyebrow text-emerald-200/80">Education</p>
              <h3 className="mt-4 font-display text-3xl text-white">{resumeData.education.school}</h3>
              <p className="mt-4 text-slate-300">{resumeData.education.degree}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                <p>{resumeData.education.gpa}</p>
                <p>{resumeData.education.graduation}</p>
                <p>{resumeData.education.honors.join(', ')}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section-shell bg-ink-soft/55">
          <SectionHeader
            kicker="Experience"
            title="Applied ML across finance, search, neuroscience, and seismic systems."
            description="The through-line is data-heavy engineering: pipelines, classifiers, feature systems, and research workflows built with measurable outcomes."
          />

          <div className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
            <div className="grid gap-5">
              {resumeData.experience.map((item, index) => (
                <Reveal key={`${item.company}-${item.role}`} delay={index * 0.04}>
                  <article className="experience-card">
                    <div className="lg:col-span-4">
                      <p className="eyebrow text-emerald-200/80">{item.eyebrow}</p>
                      <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">{item.company}</h3>
                      <p className="mt-3 text-slate-300">{item.role}</p>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.location} / {item.period}
                      </p>
                    </div>

                    <div className="lg:col-span-8">
                      <div className="space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
                        {item.bullets.map((bullet) => (
                          <p key={bullet}>{bullet}</p>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tech.map((tag) => (
                          <span key={tag} className="chip-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <SectionHeader
            kicker="Projects"
            title="Selected builds with measurable technical outcomes."
            description="A compact view of the systems and research tools that best represent how I think about engineering."
          />

          <Reveal className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-3 px-5 lg:px-8">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedProjectFilter(filter)}
                className={selectedProjectFilter === filter ? 'filter-active' : 'filter-button'}
              >
                {filter}
              </button>
            ))}
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:px-8">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <article className="project-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-emerald-200/80">{project.category}</p>
                      <h3 className="mt-3 font-display text-2xl text-white">{project.title}</h3>
                    </div>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-sm text-emerald-200 hover:text-white">
                        GitHub
                      </a>
                    ) : (
                      <span className="text-sm text-slate-500">Private</span>
                    )}
                  </div>
                  <p className="mt-6 text-base leading-8 text-slate-300">{project.summary}</p>
                  <div className="mt-6 grid gap-2">
                    {project.impact.map((item) => (
                      <p key={item} className="border-l border-emerald-300/30 pl-4 text-sm text-slate-300">
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="chip-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell bg-ink-soft/55">
          <SectionHeader
            kicker="Skills"
            title="A stack for model work, data movement, and deployment."
            description="The toolkit spans programming fundamentals, cloud-backed pipelines, and applied machine learning workflows."
          />

          <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 lg:grid-cols-3 lg:px-8">
            {resumeData.skills.map((group, index) => (
              <Reveal key={group.category} delay={index * 0.06} className="content-panel p-6">
                <p className="eyebrow text-emerald-200/80">{group.category}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-5 max-w-7xl px-5 lg:px-8">
            <div className="content-panel p-6">
              <p className="eyebrow text-amber-200/80">Recognition</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {resumeData.achievements.map((achievement) => (
                  <p key={achievement} className="border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                    {achievement}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section-shell">
          <SectionHeader
            kicker="Contact"
            title="Let us build something rigorous."
            description="Reach out for ML engineering roles, quant development conversations, research collaboration, or technical projects with real data complexity."
          />

          <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <Reveal className="content-panel p-6 sm:p-8">
              <p className="eyebrow text-emerald-200/80">Direct</p>
              <div className="mt-6 space-y-5 text-slate-300">
                <a href={`mailto:${resumeData.personal.email}`} className="block text-lg text-white">
                  {resumeData.personal.email}
                </a>
                <p>{resumeData.personal.phone}</p>
                <p>{resumeData.personal.location}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={resumeData.personal.github} target="_blank" rel="noreferrer" className="btn-ghost">
                  GitHub
                </a>
                <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                  LinkedIn
                </a>
                <button type="button" onClick={copyEmail} className="btn-secondary">
                  {copiedEmail ? 'Copied' : 'Copy Email'}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <form onSubmit={handleSubmit} className="content-panel p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="form-label">Name</span>
                    <input className="field-shell" name="name" value={formState.name} onChange={handleChange} required />
                  </label>
                  <label>
                    <span className="form-label">Email</span>
                    <input className="field-shell" name="email" type="email" value={formState.email} onChange={handleChange} required />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="form-label">Organization</span>
                    <input className="field-shell" name="organization" value={formState.organization} onChange={handleChange} />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="form-label">Message</span>
                    <textarea
                      className="field-shell min-h-[160px] resize-none"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="hidden" aria-hidden="true">
                    Website
                    <input tabIndex={-1} name="website" value={formState.website} onChange={handleChange} />
                  </label>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                  <p className="text-sm text-slate-400" aria-live="polite">
                    {feedback || `Replies go to ${resumeData.personal.email}`}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        <p>
          {resumeData.personal.name} / {resumeData.personal.title}
        </p>
      </footer>
    </div>
  );
}

export default App;
