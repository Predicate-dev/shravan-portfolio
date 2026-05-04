import { motion, useReducedMotion } from 'framer-motion';

const offsets = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 }
};

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.75,
  once = true
}) {
  const shouldReduceMotion = useReducedMotion();
  const initial = offsets[direction] || offsets.up;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, ...initial },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once, amount: 0.25 },
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      };

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
