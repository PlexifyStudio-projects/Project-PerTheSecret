import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Mist particles ── */
const MIST = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 38 + Math.random() * 24,
  size: 2 + Math.random() * 3.5,
  dur: 3 + Math.random() * 3,
  delay: Math.random() * 2.5,
  drift: -15 + Math.random() * 30,
}));

/* ── Premium Perfume Bottle ── */
const PerfumeBottle = () => (
  <svg
    className="preloader__bottle"
    viewBox="0 0 140 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      {/* Glass body gradient */}
      <linearGradient id="pGlass" x1="0" y1="0" x2="140" y2="320" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2a2520" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#1a1714" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#0d0b09" />
      </linearGradient>
      {/* Gold liquid gradient */}
      <linearGradient id="pLiquid" x1="0" y1="200" x2="0" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.15" />
        <stop offset="50%" stopColor="#dcc27e" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#b8942f" stopOpacity="0.35" />
      </linearGradient>
      {/* Reflection highlight */}
      <linearGradient id="pReflect" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="40%" stopColor="#fff" stopOpacity="0.06" />
        <stop offset="60%" stopColor="#fff" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      {/* Gold stroke */}
      <linearGradient id="pStroke" x1="0" y1="0" x2="140" y2="320" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f0e4c4" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#dcc27e" stopOpacity="0.15" />
      </linearGradient>
      {/* Cap metallic */}
      <linearGradient id="pCap" x1="50" y1="8" x2="90" y2="35" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#dcc27e" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#a88a2e" stopOpacity="0.15" />
      </linearGradient>
      {/* Shimmer sweep */}
      <linearGradient id="pSweep" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0e4c4" stopOpacity="0" />
        <stop offset="45%" stopColor="#f0e4c4" stopOpacity="0.12" />
        <stop offset="55%" stopColor="#f0e4c4" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#f0e4c4" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* ── Cap ── */}
    <motion.g
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spray top */}
      <rect x="60" y="2" width="20" height="8" rx="2" fill="url(#pCap)" stroke="url(#pStroke)" strokeWidth="0.5" />
      {/* Cap body */}
      <rect x="48" y="10" width="44" height="25" rx="3" fill="url(#pCap)" stroke="url(#pStroke)" strokeWidth="0.6" />
      {/* Cap highlight */}
      <rect x="55" y="13" width="4" height="18" rx="1" fill="rgba(255,255,255,0.04)" />
    </motion.g>

    {/* ── Neck ── */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <path
        d="M55 35 L55 60 Q55 72 42 82 L42 85 L98 85 L98 82 Q85 72 85 60 L85 35"
        fill="url(#pGlass)" stroke="url(#pStroke)" strokeWidth="0.6"
      />
      {/* Neck highlight */}
      <line x1="62" y1="38" x2="62" y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    </motion.g>

    {/* ── Body ── */}
    <motion.g
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: '70px 200px' }}
    >
      {/* Main body shape */}
      <rect x="32" y="85" width="76" height="195" rx="4" fill="url(#pGlass)" stroke="url(#pStroke)" strokeWidth="0.8" />

      {/* Liquid fill */}
      <motion.rect
        x="33" y="200" width="74" height="79" rx="3"
        fill="url(#pLiquid)"
        initial={{ height: 0, y: 279 }}
        animate={{ height: 79, y: 200 }}
        transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Liquid surface line */}
      <motion.line
        x1="34" y1="200" x2="106" y2="200"
        stroke="#c9a84c" strokeWidth="0.4" opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* Label area */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <rect x="44" y="120" width="52" height="70" rx="1" fill="none" stroke="url(#pStroke)" strokeWidth="0.3" opacity="0.3" />
        {/* Diamond logo */}
        <path d="M70 138 L80 155 L70 172 L60 155 Z" fill="none" stroke="url(#pStroke)" strokeWidth="0.5" opacity="0.4" />
        {/* Inner diamond */}
        <path d="M70 145 L75 155 L70 165 L65 155 Z" fill="rgba(201,168,76,0.06)" stroke="none" />
      </motion.g>

      {/* Left edge reflection */}
      <rect x="38" y="90" width="6" height="185" rx="2" fill="url(#pReflect)" />

      {/* Right subtle reflection */}
      <rect x="96" y="100" width="3" height="160" rx="1" fill="rgba(255,255,255,0.015)" />
    </motion.g>

    {/* ── Base ── */}
    <motion.rect
      x="28" y="280" width="84" height="6" rx="2"
      fill="url(#pGlass)" stroke="url(#pStroke)" strokeWidth="0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />

    {/* ── Shimmer sweep over entire bottle ── */}
    <motion.rect
      x="32" y="0" width="76" height="320"
      fill="url(#pSweep)"
      initial={{ y: 350 }}
      animate={{ y: -350 }}
      transition={{ duration: 2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
    />

    {/* ── Spray mist particles ── */}
    {[...Array(6)].map((_, i) => (
      <motion.circle
        key={i}
        cx={62 + Math.random() * 16}
        cy={-5}
        r={1 + Math.random() * 1.5}
        fill="#c9a84c"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 0.35, 0], y: [-5, -35 - Math.random() * 20] }}
        transition={{
          duration: 2,
          delay: 2.2 + i * 0.15,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    ))}
  </svg>
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
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Mist particles */}
          <div className="preloader__mist" aria-hidden="true">
            {MIST.map((m) => (
              <motion.div
                key={m.id}
                className="preloader__mist-dot"
                style={{ left: `${m.x}%`, width: m.size, height: m.size }}
                initial={{ y: '90vh', x: 0, opacity: 0 }}
                animate={{
                  y: '-10vh',
                  x: m.drift,
                  opacity: [0, 0.25, 0.1, 0],
                }}
                transition={{
                  duration: m.dur,
                  delay: m.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Ambient glow */}
          <motion.div
            className="preloader__ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.25, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            aria-hidden="true"
          />

          {/* ── Center layout ── */}
          <div className="preloader__center">
            {/* Bottle */}
            <motion.div
              className="preloader__bottle-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PerfumeBottle />
            </motion.div>

            {/* Brand */}
            <div className="preloader__brand">
              {/* "PERFUMERÍA" */}
              <motion.span
                className="preloader__brand-label"
                initial={{ opacity: 0, y: 12, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Perfumería
              </motion.span>

              {/* "The Secret" */}
              <div className="preloader__brand-title">
                <motion.span
                  className="preloader__brand-title-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  The Secret
                </motion.span>
                <motion.div
                  className="preloader__brand-shimmer"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="preloader__divider">
              <motion.div
                className="preloader__divider-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="preloader__divider-dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              />
              <motion.div
                className="preloader__divider-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Tagline */}
            <motion.span
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Descubre tu esencia
            </motion.span>
          </div>

          {/* Counter */}
          <motion.div
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="preloader__counter-num">{count}</span>
          </motion.div>

          {/* Progress */}
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
