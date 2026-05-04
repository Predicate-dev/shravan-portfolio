import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function TypingHeadline({
  titles,
  className = '',
  typeSpeed = 85,
  deleteSpeed = 45,
  pauseMs = 1500
}) {
  const shouldReduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const longestTitle = titles?.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    titles?.[0] || ''
  );

  useEffect(() => {
    if (!titles?.length || shouldReduceMotion) {
      return undefined;
    }

    const currentTitle = titles[titleIndex % titles.length];
    let timeoutId;

    if (!isDeleting && displayed === currentTitle) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((current) => (current + 1) % titles.length);
    } else {
      timeoutId = window.setTimeout(() => {
        const nextLength = displayed.length + (isDeleting ? -1 : 1);
        setDisplayed(currentTitle.slice(0, nextLength));
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [deleteSpeed, displayed, isDeleting, pauseMs, shouldReduceMotion, titleIndex, titles, typeSpeed]);

  if (shouldReduceMotion) {
    return <div className={className}>{titles?.[0] || ''}</div>;
  }

  return (
    <div className={`relative inline-flex ${className}`} aria-label={titles?.[titleIndex % titles.length] || ''}>
      <span className="invisible">{longestTitle}</span>
      <span className="absolute inset-y-0 left-0 inline-flex items-center whitespace-nowrap">
        <span>{displayed}</span>
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          className="ml-1 text-electric"
        >
          |
        </motion.span>
      </span>
    </div>
  );
}
