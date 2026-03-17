import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Spray mist particles ── */
const MIST = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: 42 + Math.random() * 16,
  size: 1.5 + Math.random() * 3,
  dur: 2.5 + Math.random() * 3,
  delay: 0.5 + Math.random() * 2,
  drift: -25 + Math.random() * 50,
}));

/* ── Animated stroke helper ── */
const Draw = ({ d, delay = 0, dur = 1.2, sw = 1, opacity = 1 }) => (
  <motion.path
    d={d}
    stroke="url(#goldLine)"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    opacity={opacity}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity }}
    transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

const DrawRect = ({ x, y, w, h, rx = 0, delay = 0, dur = 1, sw = 1, opacity = 1 }) => (
  <motion.rect
    x={x} y={y} width={w} height={h} rx={rx}
    stroke="url(#goldLine)"
    strokeWidth={sw}
    fill="none"
    opacity={opacity}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity }}
    transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

const DrawLine = ({ x1, y1, x2, y2, delay = 0, dur = 0.8, sw = 0.5, opacity = 0.3 }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke="url(#goldLine)"
    strokeWidth={sw}
    opacity={opacity}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

const DrawCircle = ({ cx, cy, r, delay = 0, dur = 0.8, sw = 0.5, opacity = 0.3 }) => (
  <motion.circle
    cx={cx} cy={cy} r={r}
    stroke="url(#goldLine)"
    strokeWidth={sw}
    fill="none"
    opacity={opacity}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

/* ── Luxury Perfume Bottle — Detailed Line Art ── */
const PerfumeBottle = () => (
  <svg
    className="preloader__bottle"
    viewBox="0 0 200 440"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldLine" x1="0" y1="0" x2="200" y2="440" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f0e4c4" />
        <stop offset="40%" stopColor="#c9a84c" />
        <stop offset="70%" stopColor="#dcc27e" />
        <stop offset="100%" stopColor="#f0e4c4" />
      </linearGradient>
    </defs>

    {/* ═══ SPRAY NOZZLE ═══ */}
    <DrawRect x={88} y={4} w={24} h={14} rx={3} delay={0.1} dur={0.6} sw={0.8} opacity={0.6} />
    <DrawLine x1={95} y1={8} x2={105} y2={8} delay={0.2} dur={0.4} sw={0.4} opacity={0.3} />
    <DrawLine x1={95} y1={12} x2={105} y2={12} delay={0.25} dur={0.4} sw={0.4} opacity={0.2} />

    {/* ═══ CAP — faceted luxury cap ═══ */}
    {/* Outer cap */}
    <DrawRect x={72} y={18} w={56} h={38} rx={4} delay={0.2} dur={0.8} sw={1.2} />
    {/* Cap inner frame */}
    <DrawRect x={78} y={23} w={44} h={28} rx={2} delay={0.4} dur={0.6} sw={0.5} opacity={0.35} />
    {/* Cap horizontal lines (ridges) */}
    <DrawLine x1={78} y1={30} x2={122} y2={30} delay={0.5} dur={0.4} opacity={0.2} />
    <DrawLine x1={78} y1={37} x2={122} y2={37} delay={0.55} dur={0.4} opacity={0.2} />
    <DrawLine x1={78} y1={44} x2={122} y2={44} delay={0.6} dur={0.4} opacity={0.15} />
    {/* Cap vertical center line */}
    <DrawLine x1={100} y1={23} x2={100} y2={51} delay={0.5} dur={0.5} opacity={0.15} />

    {/* ═══ NECK — elegant tapered ═══ */}
    <Draw d="M82 56 L82 80 Q82 95 68 108" delay={0.6} dur={0.7} sw={0.8} opacity={0.7} />
    <Draw d="M118 56 L118 80 Q118 95 132 108" delay={0.6} dur={0.7} sw={0.8} opacity={0.7} />
    {/* Neck ring detail */}
    <DrawRect x={80} y={58} w={40} h={4} rx={1} delay={0.65} dur={0.4} sw={0.5} opacity={0.4} />
    {/* Inner neck lines */}
    <DrawLine x1={90} y1={65} x2={90} y2={90} delay={0.7} dur={0.5} opacity={0.15} />
    <DrawLine x1={110} y1={65} x2={110} y2={90} delay={0.7} dur={0.5} opacity={0.15} />

    {/* ═══ SHOULDERS ═══ */}
    <Draw d="M68 108 L50 125" delay={0.9} dur={0.5} sw={0.8} opacity={0.6} />
    <Draw d="M132 108 L150 125" delay={0.9} dur={0.5} sw={0.8} opacity={0.6} />
    {/* Shoulder accent lines */}
    <DrawLine x1={60} y1={115} x2={55} y2={120} delay={1} dur={0.3} opacity={0.2} />
    <DrawLine x1={140} y1={115} x2={145} y2={120} delay={1} dur={0.3} opacity={0.2} />

    {/* ═══ BODY — main rectangle ═══ */}
    <DrawRect x={42} y={125} w={116} h={260} rx={5} delay={0.9} dur={1.5} sw={1.2} />

    {/* Body inner border (double line luxury) */}
    <DrawRect x={48} y={131} w={104} h={248} rx={3} delay={1.2} dur={1.2} sw={0.4} opacity={0.2} />

    {/* ═══ LABEL AREA ═══ */}
    {/* Label outer frame */}
    <DrawRect x={56} y={165} w={88} h={140} rx={2} delay={1.4} dur={1} sw={0.6} opacity={0.35} />
    {/* Label inner frame */}
    <DrawRect x={62} y={172} w={76} h={126} rx={1} delay={1.5} dur={0.8} sw={0.3} opacity={0.2} />

    {/* ── Diamond logo ── */}
    <Draw d="M100 195 L118 225 L100 255 L82 225 Z" delay={1.6} dur={1} sw={0.7} opacity={0.5} />
    {/* Inner diamond */}
    <Draw d="M100 205 L112 225 L100 245 L88 225 Z" delay={1.8} dur={0.8} sw={0.4} opacity={0.25} />
    {/* Diamond center dot */}
    <DrawCircle cx={100} cy={225} r={3} delay={2} dur={0.5} sw={0.5} opacity={0.35} />

    {/* Label horizontal lines */}
    <DrawLine x1={68} y1={185} x2={132} y2={185} delay={1.5} dur={0.6} opacity={0.15} />
    <DrawLine x1={68} y1={265} x2={132} y2={265} delay={1.7} dur={0.6} opacity={0.15} />
    {/* Label decorative lines top */}
    <DrawLine x1={85} y1={178} x2={115} y2={178} delay={1.55} dur={0.4} opacity={0.2} />
    {/* Label decorative lines bottom */}
    <DrawLine x1={80} y1={278} x2={120} y2={278} delay={1.75} dur={0.4} opacity={0.2} />

    {/* ═══ BODY DETAIL LINES ═══ */}
    {/* Vertical edge reflections */}
    <DrawLine x1={54} y1={135} x2={54} y2={375} delay={1.3} dur={1} opacity={0.12} />
    <DrawLine x1={146} y1={135} x2={146} y2={375} delay={1.3} dur={1} opacity={0.08} />

    {/* Horizontal body lines */}
    <DrawLine x1={48} y1={155} x2={152} y2={155} delay={1.35} dur={0.6} opacity={0.1} />
    <DrawLine x1={48} y1={315} x2={152} y2={315} delay={1.6} dur={0.6} opacity={0.1} />
    <DrawLine x1={48} y1={350} x2={152} y2={350} delay={1.7} dur={0.6} opacity={0.08} />

    {/* ═══ BASE ═══ */}
    <DrawRect x={38} y={385} w={124} h={10} rx={2} delay={1.8} dur={0.6} sw={0.8} opacity={0.5} />
    {/* Base bottom line */}
    <DrawLine x1={45} y1={398} x2={155} y2={398} delay={1.9} dur={0.5} opacity={0.3} />
    {/* Base feet details */}
    <DrawRect x={50} y={395} w={100} h={4} rx={1} delay={1.9} dur={0.4} sw={0.3} opacity={0.15} />

    {/* ═══ DECORATIVE CIRCLES (behind bottle) ═══ */}
    <DrawCircle cx={100} cy={250} r={140} delay={0.8} dur={2} sw={0.3} opacity={0.06} />
    <DrawCircle cx={100} cy={250} r={180} delay={1} dur={2.2} sw={0.2} opacity={0.04} />

    {/* ═══ SPRAY PARTICLES ═══ */}
    {[...Array(8)].map((_, i) => {
      const cx = 85 + Math.random() * 30;
      const endY = -15 - Math.random() * 50;
      return (
        <motion.circle
          key={i}
          cx={cx} cy={0} r={1 + Math.random() * 1.5}
          fill="#c9a84c"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0, 0.4, 0], y: endY, x: -10 + Math.random() * 20 }}
          transition={{
            duration: 2,
            delay: 2.2 + i * 0.12,
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
        />
      );
    })}
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Mist particles across screen */}
          <div className="preloader__mist" aria-hidden="true">
            {MIST.map((m) => (
              <motion.div
                key={m.id}
                className="preloader__mist-dot"
                style={{ left: `${m.x}%`, width: m.size, height: m.size }}
                initial={{ y: '90vh', x: 0, opacity: 0 }}
                animate={{ y: '-10vh', x: m.drift, opacity: [0, 0.3, 0.12, 0] }}
                transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>

          {/* Ambient glow */}
          <motion.div
            className="preloader__glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            aria-hidden="true"
          />

          {/* ── Two-column layout ── */}
          <div className="preloader__layout">
            {/* Left: Bottle */}
            <motion.div
              className="preloader__bottle-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <PerfumeBottle />
            </motion.div>

            {/* Right: Brand text */}
            <div className="preloader__text-col">
              {/* Accent line */}
              <motion.div
                className="preloader__accent-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.span
                className="preloader__label"
                initial={{ opacity: 0, y: 10, letterSpacing: '0.6em' }}
                animate={{ opacity: 0.5, y: 0, letterSpacing: '0.35em' }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Perfumería
              </motion.span>

              <div className="preloader__title">
                <motion.span
                  className="preloader__title-text"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  The Secret
                </motion.span>
                <motion.div
                  className="preloader__shimmer"
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 1.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Ornament */}
              <div className="preloader__ornament">
                <motion.div
                  className="preloader__ornament-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="preloader__ornament-diamond"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                />
                <motion.div
                  className="preloader__ornament-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <motion.span
                className="preloader__tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                Descubre tu esencia
              </motion.span>
            </div>
          </div>

          {/* Counter */}
          <motion.div
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
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
