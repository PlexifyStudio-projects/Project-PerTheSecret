import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Mist particles (perfume spray effect) ── */
const MIST = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 40 + Math.random() * 20,
  size: 2 + Math.random() * 4,
  dur: 3 + Math.random() * 3,
  delay: Math.random() * 3,
  drift: -20 + Math.random() * 40,
}));

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
          {/* Ambient mist particles */}
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
                  opacity: [0, 0.3, 0.15, 0],
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

          {/* Radial ambient glow */}
          <motion.div
            className="preloader__ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            aria-hidden="true"
          />

          {/* ── Main content ── */}
          <div className="preloader__center">
            {/* Top thin line */}
            <motion.div
              className="preloader__accent-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* "PERFUMERÍA" — spaced uppercase */}
            <motion.div
              className="preloader__label"
              initial={{ opacity: 0, y: 15, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Perfumería
            </motion.div>

            {/* "The Secret" — hero display */}
            <div className="preloader__title">
              <motion.span
                className="preloader__title-text"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                The Secret
              </motion.span>
              {/* Golden shimmer sweep */}
              <motion.div
                className="preloader__shimmer"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Ornamental divider */}
            <div className="preloader__divider">
              <motion.div
                className="preloader__divider-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="preloader__divider-dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              />
              <motion.div
                className="preloader__divider-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Tagline */}
            <motion.span
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Descubre tu esencia
            </motion.span>
          </div>

          {/* Counter — bottom right */}
          <motion.div
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="preloader__counter-num">{count}</span>
          </motion.div>

          {/* Progress bar */}
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
