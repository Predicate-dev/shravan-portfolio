import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export function ProjectCard({ project, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped((current) => !current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.01 }
          : { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      className="card-perspective h-[360px]"
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        onClick={toggleCard}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleCard();
          }
        }}
        onMouseEnter={() => {
          if (!shouldReduceMotion) {
            setIsFlipped(true);
          }
        }}
        onMouseLeave={() => {
          if (!shouldReduceMotion) {
            setIsFlipped(false);
          }
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: shouldReduceMotion ? 0 : isFlipped ? -6 : 0
        }}
        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card-3d relative h-full w-full rounded-[30px] text-left outline-none focus-visible:ring-2 focus-visible:ring-electric/60"
      >
        <div className="card-face glass-panel section-grid absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-glow-blue">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald/70">{project.category}</p>
              <h3 className="mt-3 font-display text-2xl text-white">{project.title}</h3>
            </div>
            <span className="rounded-full border border-electric/20 bg-electric/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-electric">
              Flip
            </span>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-300">{project.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
              >
                {metric}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            {project.tech.slice(0, 4).map((tool) => (
              <div
                key={tool}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300"
              >
                <span>{tool}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-500">
            Hover or tap to see the build story
          </p>
        </div>

        <div className="card-face card-back glass-panel absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-glow-emerald">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald/60 to-transparent" />

          <p className="text-xs uppercase tracking-[0.3em] text-electric/70">Build Story</p>
          <h3 className="mt-3 font-display text-2xl text-white">{project.title}</h3>

          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Challenge</p>
              <p className="mt-2">{project.challenge}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outcome</p>
              <p className="mt-2">{project.outcome}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-soft"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Selected work</span>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-emerald/40 hover:text-emerald-soft"
                onClick={(event) => event.stopPropagation()}
              >
                View Repo
              </a>
            ) : (
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                Private build
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
