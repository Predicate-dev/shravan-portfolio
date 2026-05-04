import { motion, useReducedMotion } from 'framer-motion';

export function TimelineItem({ item, side = 'right', index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const isLeft = side === 'left';

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, x: isLeft ? -70 : 70, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.25 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      className="relative pl-10 md:pl-0"
    >
      <span className="absolute left-[6px] top-10 h-3.5 w-3.5 rounded-full border border-electric/60 bg-ink shadow-[0_0_25px_rgba(56,189,248,0.55)] md:left-1/2 md:-translate-x-1/2" />

      <div className="md:grid md:grid-cols-2 md:gap-12">
        <div className={isLeft ? 'md:col-start-1' : 'md:col-start-2'}>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.3 }}
            className={`glass-panel rounded-[28px] border border-white/10 p-6 shadow-glow-blue ${
              isLeft ? 'md:mr-12' : 'md:ml-12'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-electric/70">{item.company}</p>
                <h3 className="mt-2 font-display text-2xl text-white">{item.role}</h3>
              </div>
              <div className="text-sm text-slate-400 sm:text-right">
                <p>{item.location}</p>
                <p className="mt-1 text-slate-500">{item.period}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {item.bullets.map((bullet) => (
                <p key={bullet} className="border-l border-white/10 pl-4">
                  {bullet}
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
