import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Golden floating particles ── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 2,
  opacity: 0.15 + Math.random() * 0.35,
}));

const Particle = ({ p }) => (
  <motion.div
    className="preloader__particle"
    style={{
      left: `${p.x}%`,
      width: p.size,
      height: p.size,
    }}
    initial={{ y: '100vh', opacity: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, p.opacity, p.opacity, 0],
    }}
    transition={{
      duration: p.duration,
      delay: p.delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

/* ── Perfume bottle outline SVG ── */
const PerfumeBottleSVG = () => (
  <svg
    className="preloader__bottle"
    viewBox="0 0 120 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bottleGrad" x1="0" y1="0" x2="120" y2="280">
        <stop offset="0%" stopColor="#dcc27e" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f0e4c4" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Cap */}
    <motion.rect
      x="42" y="8" width="36" height="22" rx="4"
      stroke="url(#bottleGrad)" strokeWidth="1"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Neck */}
    <motion.path
      d="M48 30 L48 55 Q48 65 38 75 L38 75"
      stroke="url(#bottleGrad)" strokeWidth="1"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.path
      d="M72 30 L72 55 Q72 65 82 75 L82 75"
      stroke="url(#bottleGrad)" strokeWidth="1"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Body */}
    <motion.rect
      x="28" y="75" width="64" height="170" rx="4"
      stroke="url(#bottleGrad)" strokeWidth="1.2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Label diamond */}
    <motion.path
      d="M60 140 L72 160 L60 180 L48 160 Z"
      stroke="url(#bottleGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Base */}
    <motion.rect
      x="24" y="245" width="72" height="6" rx="2"
      stroke="url(#bottleGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
    />
  </svg>
);

/* ── Main Preloader ── */
const Preloader = ({ isLoading }) => {
  const [count, setCount] = useState(0);

  /* Animated counter 0 → 100 */
  useEffect(() => {
    if (!isLoading) return;
    const duration = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading]);

  const brandName = 'Perfumería';
  const accentName = 'The Secret';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Floating particles */}
          <div className="preloader__particles" aria-hidden="true">
            {PARTICLES.map((p) => (
              <Particle key={p.id} p={p} />
            ))}
          </div>

          {/* Center content */}
          <div className="preloader__content">
            {/* Perfume bottle */}
            <motion.div
              className="preloader__bottle-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <PerfumeBottleSVG />
            </motion.div>

            {/* Brand name — letter by letter */}
            <div className="preloader__brand">
              <span className="preloader__brand-main">
                {brandName.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="preloader__brand-accent">
                {accentName.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </div>

            {/* Gold line separator */}
            <motion.div
              className="preloader__line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Tagline */}
            <motion.span
              className="preloader__tagline"
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              Descubre tu esencia
            </motion.span>

            {/* Counter */}
            <motion.div
              className="preloader__counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="preloader__counter-num">{count}</span>
              <span className="preloader__counter-pct">%</span>
            </motion.div>
          </div>

          {/* Progress bar at bottom */}
          <div className="preloader__progress">
            <motion.div
              className="preloader__progress-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
