import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Floating gold particles ── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: 35 + Math.random() * 30, // concentrate near center
  size: 1.5 + Math.random() * 3,
  duration: 2.5 + Math.random() * 3.5,
  delay: Math.random() * 2.5,
  opacity: 0.2 + Math.random() * 0.4,
  drift: -15 + Math.random() * 30, // horizontal drift
}));

const Particle = ({ p }) => (
  <motion.div
    className="preloader__particle"
    style={{ left: `${p.x}%`, width: p.size, height: p.size }}
    initial={{ y: '80vh', x: 0, opacity: 0 }}
    animate={{
      y: '-20vh',
      x: p.drift,
      opacity: [0, p.opacity, p.opacity * 0.6, 0],
    }}
    transition={{
      duration: p.duration,
      delay: p.delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

/* ── Perfume bottle SVG with shimmer ── */
const PerfumeBottleSVG = () => (
  <svg
    className="preloader__bottle"
    viewBox="0 0 120 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bGrad" x1="0" y1="0" x2="120" y2="280">
        <stop offset="0%" stopColor="#f0e4c4" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#dcc27e" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="bShimmer" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0e4c4" stopOpacity="0" />
        <stop offset="40%" stopColor="#f0e4c4" stopOpacity="0.25" />
        <stop offset="60%" stopColor="#f0e4c4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#f0e4c4" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Spray nozzle */}
    <motion.rect
      x="52" y="2" width="16" height="8" rx="2"
      stroke="url(#bGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Cap */}
    <motion.rect
      x="42" y="10" width="36" height="20" rx="3"
      stroke="url(#bGrad)" strokeWidth="1"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Neck left */}
    <motion.path
      d="M48 30 L48 55 Q48 68 36 78"
      stroke="url(#bGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Neck right */}
    <motion.path
      d="M72 30 L72 55 Q72 68 84 78"
      stroke="url(#bGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Body */}
    <motion.rect
      x="28" y="78" width="64" height="165" rx="3"
      stroke="url(#bGrad)" strokeWidth="1.2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Inner label frame */}
    <motion.rect
      x="38" y="110" width="44" height="100" rx="1"
      stroke="url(#bGrad)" strokeWidth="0.4" opacity="0.4"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Label diamond */}
    <motion.path
      d="M60 135 L72 155 L60 175 L48 155 Z"
      stroke="url(#bGrad)" strokeWidth="0.7"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Liquid level */}
    <motion.line
      x1="30" y1="200" x2="90" y2="200"
      stroke="url(#bGrad)" strokeWidth="0.4" opacity="0.3"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
    />
    {/* Base */}
    <motion.rect
      x="24" y="243" width="72" height="5" rx="1.5"
      stroke="url(#bGrad)" strokeWidth="0.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Reflection line */}
    <motion.line
      x1="38" y1="85" x2="38" y2="235"
      stroke="url(#bGrad)" strokeWidth="0.3" opacity="0.2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
    />
    {/* Shimmer sweep */}
    <motion.rect
      x="28" y="0" width="64" height="280"
      fill="url(#bShimmer)"
      initial={{ y: 280 }}
      animate={{ y: -280 }}
      transition={{ duration: 2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
    />
  </svg>
);

/* ── Corner accent decorations ── */
const Corner = ({ position }) => (
  <motion.div
    className={`preloader__corner preloader__corner--${position}`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
  />
);

/* ── Main Preloader ── */
const Preloader = ({ isLoading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const duration = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
          }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Particles */}
          <div className="preloader__particles" aria-hidden="true">
            {PARTICLES.map((p) => (
              <Particle key={p.id} p={p} />
            ))}
          </div>

          {/* Corner accents */}
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          {/* Center content */}
          <div className="preloader__content">
            {/* Pulsing glow behind bottle */}
            <motion.div
              className="preloader__glow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.6, 0.3, 0.6],
                scale: [0.6, 1.1, 0.9, 1.1],
              }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
              aria-hidden="true"
            />

            {/* Perfume bottle */}
            <motion.div
              className="preloader__bottle-wrap"
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PerfumeBottleSVG />
            </motion.div>

            {/* Brand name */}
            <div className="preloader__brand">
              <span className="preloader__brand-main">
                {brandName.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: 'inline-block',
                      whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="preloader__brand-accent">
                {accentName.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: 'inline-block',
                      whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </div>

            {/* Ornamental lines */}
            <div className="preloader__ornament">
              <motion.div
                className="preloader__ornament-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="preloader__ornament-diamond"
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="preloader__ornament-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Tagline */}
            <motion.span
              className="preloader__tagline"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Descubre tu esencia
            </motion.span>
          </div>

          {/* Counter — bottom left */}
          <motion.div
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="preloader__counter-num">{count}</span>
            <span className="preloader__counter-pct">%</span>
          </motion.div>

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
