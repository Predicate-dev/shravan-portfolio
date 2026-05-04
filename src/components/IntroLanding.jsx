import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { resumeData } from '../data/resumeData.js';

const introScenes = [
  {
    id: 'signal',
    label: 'Observe',
    watermark: 'Signal',
    title: ['From noisy signal', 'to useful structure.'],
    description:
      'I like machine learning work that starts with ambiguity and turns into something measurable, legible, and ready to build on.',
    chips: ['Pose estimation', 'Data quality', 'Ranking signals']
  },
  {
    id: 'model',
    label: 'Model',
    watermark: 'Model',
    title: ['Research-grade ML,', 'engineered to ship.'],
    description:
      'My work spans modeling, data systems, evaluation, and infrastructure, because a strong model is only part of a strong ML product.',
    chips: ['PyTorch', 'Scikit-Learn', 'Apache Spark']
  },
  {
    id: 'system',
    label: 'Deploy',
    watermark: 'System',
    title: ['Built for production,', 'not just the notebook.'],
    description:
      'This portfolio is a quick way to see how I build ML systems that move from experimentation to reliable deployment with product clarity.',
    chips: ['Inference', 'Monitoring', 'Cloud delivery']
  }
];

const constellationNodes = [
  { x: 12, y: 24, size: 10, delay: 0.05 },
  { x: 28, y: 42, size: 14, delay: 0.16 },
  { x: 48, y: 20, size: 12, delay: 0.24 },
  { x: 65, y: 46, size: 18, delay: 0.36 },
  { x: 82, y: 26, size: 10, delay: 0.15 },
  { x: 22, y: 74, size: 12, delay: 0.42 },
  { x: 54, y: 72, size: 14, delay: 0.3 },
  { x: 76, y: 68, size: 12, delay: 0.5 }
];

const constellationLinks = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [5, 6],
  [6, 7],
  [2, 6],
  [3, 7]
];

const pipelineStages = [
  { name: 'Raw Inputs', metric: 'Streaming + batch' },
  { name: 'Features', metric: 'Freshness + quality' },
  { name: 'Models', metric: 'Fit + validate' },
  { name: 'Inference', metric: 'Latency aware' }
];

const orbitLabels = ['Evaluate', 'Deploy', 'Observe', 'Iterate'];

function SignalVisual({ shouldReduceMotion }) {
  return (
    <div className="relative h-[25rem] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,8,22,0.86))] shadow-glow-blue sm:h-[28rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(52,211,153,0.12),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {constellationLinks.map(([fromIndex, toIndex], index) => {
          const from = constellationNodes[fromIndex];
          const to = constellationNodes[toIndex];

          return (
            <motion.path
              key={`${fromIndex}-${toIndex}`}
              d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.9, delay: 0.18 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              stroke="rgba(125, 211, 252, 0.7)"
              strokeWidth="0.4"
              fill="none"
            />
          );
        })}
      </svg>

      {constellationNodes.map((node) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.4 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: [0.35, 0.95, 0.4], scale: [0.9, 1.25, 0.92], y: [0, -6, 0] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.25 }
              : { duration: 4.4 + node.delay * 2, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }
          }
          className="absolute rounded-full bg-electric shadow-[0_0_34px_rgba(56,189,248,0.85)]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`
          }}
        />
      ))}

      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-300">
        Behavioral signal map
      </div>
      <div className="absolute bottom-5 right-5 max-w-[12rem] rounded-[22px] border border-white/10 bg-black/35 p-4 text-sm leading-6 text-slate-300 backdrop-blur-md">
        Robust systems start by separating pattern from noise.
      </div>
    </div>
  );
}

function PipelineVisual({ shouldReduceMotion }) {
  return (
    <div className="relative h-[25rem] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(6,8,22,0.88))] shadow-glow-emerald sm:h-[28rem]">
      <div className="absolute inset-x-[12%] top-[12%] h-[76%] rounded-[32px] border border-white/6" />
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-electric to-emerald"
      />

      {pipelineStages.map((stage, index) => {
        const offset = index % 2 === 0 ? '-translate-x-[62%]' : '-translate-x-[38%]';

        return (
          <motion.div
            key={stage.name}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, x: index % 2 === 0 ? -18 : 18 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.72, delay: 0.16 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-1/2 w-[78%] max-w-[18rem] ${offset} rounded-[24px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md`}
            style={{ top: `${14 + index * 18}%` }}
          >
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Stage {index + 1}</p>
            <h3 className="mt-3 font-display text-2xl text-white">{stage.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{stage.metric}</p>
          </motion.div>
        );
      })}

      <div className="absolute bottom-5 left-5 rounded-[22px] border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-slate-300 backdrop-blur-md">
        End-to-end thinking matters: data, features, models, and delivery.
      </div>
    </div>
  );
}

function SystemVisual({ shouldReduceMotion }) {
  return (
    <div className="relative h-[25rem] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(6,8,22,0.9))] shadow-glow-blue sm:h-[28rem]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.86 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: [0.98, 1.02, 0.99] }}
        transition={shouldReduceMotion ? { duration: 0.25 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/15"
      >
        <div className="absolute inset-[12%] rounded-full border border-white/10" />
        <div className="absolute inset-[28%] rounded-full border border-emerald/20" />
      </motion.div>

      {orbitLabels.map((label, index) => {
        const positions = [
          'left-1/2 top-[8%] -translate-x-1/2',
          'right-[10%] top-1/2 -translate-y-1/2',
          'left-1/2 bottom-[8%] -translate-x-1/2',
          'left-[10%] top-1/2 -translate-y-1/2'
        ];

        return (
          <motion.div
            key={label}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.7], scale: [0.96, 1.05, 0.98] }}
            transition={
              shouldReduceMotion
                ? { duration: 0.25 }
                : { duration: 4.8, repeat: Infinity, delay: index * 0.24, ease: 'easeInOut' }
            }
            className={`absolute ${positions[index]} rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-200 backdrop-blur-md`}
          >
            {label}
          </motion.div>
        );
      })}

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 w-[78%] max-w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl"
      >
        <p className="text-[11px] uppercase tracking-[0.28em] text-electric-soft">Portfolio Entry</p>
        <h3 className="mt-4 font-display text-3xl text-white">{resumeData.personal.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{resumeData.personal.title}</p>
      </motion.div>
    </div>
  );
}

function IntroVisual({ sceneIndex, shouldReduceMotion }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={introScenes[sceneIndex].id}
        initial={shouldReduceMotion ? false : { opacity: 0, x: 30, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30, scale: 0.98 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {sceneIndex === 0 ? <SignalVisual shouldReduceMotion={shouldReduceMotion} /> : null}
        {sceneIndex === 1 ? <PipelineVisual shouldReduceMotion={shouldReduceMotion} /> : null}
        {sceneIndex === 2 ? <SystemVisual shouldReduceMotion={shouldReduceMotion} /> : null}
      </motion.div>
    </AnimatePresence>
  );
}

export function IntroLanding({ onEnter }) {
  const shouldReduceMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [manualControl, setManualControl] = useState(false);
  const currentScene = introScenes[sceneIndex];
  const isFinalScene = sceneIndex === introScenes.length - 1;

  useEffect(() => {
    if (shouldReduceMotion || manualControl || isFinalScene) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSceneIndex((current) => Math.min(current + 1, introScenes.length - 1));
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isFinalScene, manualControl, sceneIndex, shouldReduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        onEnter();
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        onEnter();
        return;
      }

      if (event.key === 'ArrowRight') {
        setManualControl(true);
        setSceneIndex((current) => Math.min(current + 1, introScenes.length - 1));
      }

      if (event.key === 'ArrowLeft') {
        setManualControl(true);
        setSceneIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter]);

  const handleAdvance = () => {
    if (isFinalScene) {
      onEnter();
      return;
    }

    setManualControl(true);
    setSceneIndex((current) => Math.min(current + 1, introScenes.length - 1));
  };

  const handleSelectScene = (nextSceneIndex) => {
    setManualControl(true);
    setSceneIndex(nextSceneIndex);
  };

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-heading"
      aria-describedby="intro-description"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] overflow-hidden bg-[#030611]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(52,211,153,0.16),transparent_22%),radial-gradient(circle_at_50%_90%,rgba(15,23,42,0.9),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <AnimatePresence mode="wait">
        <motion.span
          key={currentScene.watermark}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-6%] top-[18%] font-display text-[6rem] uppercase leading-none text-white/[0.04] sm:text-[8rem] lg:text-[14rem]"
        >
          {currentScene.watermark}
        </motion.span>
      </AnimatePresence>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl tracking-[0.28em] text-white">SB</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              Machine Learning Engineer
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-200 transition hover:border-electric/30 hover:bg-electric/10"
          >
            Skip
          </button>
        </div>

        <div className="grid flex-1 gap-12 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              {introScenes.map((scene, index) => {
                const isActive = index === sceneIndex;

                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectScene(index)}
                    className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
                      isActive
                        ? 'border-electric/30 bg-electric/10 text-electric-soft'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {scene.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <p className="text-xs uppercase tracking-[0.42em] text-electric-soft">{currentScene.label}</p>

                <div className="mt-6 space-y-2">
                  {currentScene.title.map((line, index) => (
                    <h1
                      key={line}
                      id={index === 0 ? 'intro-heading' : undefined}
                      className="font-display text-5xl leading-[0.94] text-white sm:text-6xl lg:text-7xl"
                    >
                      {line}
                    </h1>
                  ))}
                </div>

                <p
                  id="intro-description"
                  className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
                >
                  {currentScene.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {currentScene.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <motion.button
                type="button"
                onClick={handleAdvance}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition hover:bg-slate-200"
              >
                {isFinalScene ? 'Enter Portfolio' : 'Next Scene'}
              </motion.button>
              <motion.button
                type="button"
                onClick={onEnter}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-200 transition hover:border-electric/30 hover:bg-electric/10"
              >
                Enter Now
              </motion.button>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              Arrow keys move between scenes. Enter or Escape opens the portfolio.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {resumeData.intro.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.72 + index * 0.08 }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                  <p className="mt-3 font-display text-2xl text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <IntroVisual sceneIndex={sceneIndex} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
