import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { ENVASES_ITEMS, CONTACT_DATA } from '../../../constants/data';
import useSound from '../../../hooks/useSound';

// ── Constants ──
const EASE = [0.16, 1, 0.3, 1];
const MARQUEE_COUNT = 3;
const PARTICLE_COUNT = 18;

// Staggered Y offsets for organic floating feel in marquee
const FLOAT_OFFSETS = [0, -8, 4, -12, 6, -4, 10, -6, 2, -10];
const FLOAT_DURATIONS = [5, 5.4, 4.8, 5.6, 5.2, 4.6, 5.8, 5.1, 4.9, 5.3];

// ── Particles (gold dust drifting through the section) ──
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 2,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  duration: 12 + Math.random() * 10,
  opacity: 0.15 + Math.random() * 0.15,
}));

// ── WhatsApp message builder ──
const buildWhatsAppUrl = (item) => {
  const msg = item.soldOut
    ? `¡Hola! Me interesa el envase "${item.name}" (${item.sizes.join(', ')}). ¿Cuándo vuelve a estar disponible?`
    : `¡Hola! Me interesa el envase "${item.name}" (${item.sizes.join(', ')}). ¿Tienen disponibilidad?`;
  return `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

// ────────────────────────────────────────────────────────────
//  MARQUEE BOTTLE — floating bottle in the horizontal strip
// ────────────────────────────────────────────────────────────
const MarqueeBottle = ({ item, index, onSound }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onSound('click');
    window.open(buildWhatsAppUrl(item), '_blank');
  };

  const floatY = FLOAT_OFFSETS[index % FLOAT_OFFSETS.length];
  const floatDur = FLOAT_DURATIONS[index % FLOAT_DURATIONS.length];

  return (
    <motion.div
      ref={ref}
      className={`envases__marquee-item ${hovered ? 'envases__marquee-item--hovered' : ''} ${item.soldOut ? 'envases__marquee-item--sold-out' : ''}`}
      style={{ '--float-y': `${floatY}px`, '--float-dur': `${floatDur}s`, '--float-delay': `${index * 0.6}s` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      onClick={handleClick}
      onMouseEnter={() => { setHovered(true); onSound('hover'); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {item.badge && <span className="envases__marquee-badge">{item.badge}</span>}

      {/* Bottle image — floats freely on dark bg */}
      <div className="envases__marquee-bottle">
        <img src={item.image} alt={item.name} loading="lazy" draggable={false} />
      </div>

      {/* Sold out overlay */}
      {item.soldOut && (
        <div className="envases__marquee-sold">
          <span>Agotado</span>
        </div>
      )}

      {/* Info */}
      <div className="envases__marquee-info">
        <h3 className="envases__marquee-name">{item.name}</h3>
        <div className="envases__marquee-sizes">
          {item.sizes.map((s) => (
            <span key={s} className="envases__marquee-size">{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ────────────────────────────────────────────────────────────
//  SHELF BOTTLE — displayed on gold shelf lines
// ────────────────────────────────────────────────────────────
const shelfVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.04, ease: EASE },
  }),
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25 },
  },
};

const ShelfBottle = ({ item, index, onSound }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onSound('click');
    window.open(buildWhatsAppUrl(item), '_blank');
  };

  return (
    <motion.article
      className={`envases__shelf-item ${hovered ? 'envases__shelf-item--hovered' : ''} ${item.soldOut ? 'envases__shelf-item--sold-out' : ''}`}
      variants={shelfVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      layout
      onClick={handleClick}
      onMouseEnter={() => { setHovered(true); onSound('hover'); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {item.badge && <span className="envases__shelf-badge">{item.badge}</span>}

      {/* Bottle */}
      <div className="envases__shelf-bottle">
        <img src={item.image} alt={item.name} loading="lazy" />
        {/* CSS reflection (mirror image below) */}
        <div className="envases__shelf-reflection" aria-hidden="true">
          <img src={item.image} alt="" loading="lazy" />
        </div>
      </div>

      {/* Sold out */}
      {item.soldOut && (
        <div className="envases__shelf-sold">
          <span>Agotado</span>
        </div>
      )}

      {/* Info */}
      <div className="envases__shelf-info">
        <h3 className="envases__shelf-name">{item.name}</h3>
        <div className="envases__shelf-sizes">
          {item.sizes.map((s) => (
            <span key={s} className="envases__shelf-size">{s}</span>
          ))}
        </div>
      </div>

      {/* Gold shelf line */}
      <div className="envases__shelf-line" />
    </motion.article>
  );
};

// ────────────────────────────────────────────────────────────
//  ARROW SCROLL HOOK
// ────────────────────────────────────────────────────────────
const useArrowScroll = () => {
  const ref = useRef(null);

  const scroll = useCallback((dir) => {
    const el = ref.current;
    if (!el) return;
    const itemWidth = el.querySelector('.envases__marquee-item')?.offsetWidth || 200;
    el.scrollBy({ left: dir * (itemWidth + 32), behavior: 'smooth' });
  }, []);

  return { ref, scrollLeft: () => scroll(-1), scrollRight: () => scroll(1) };
};

// ────────────────────────────────────────────────────────────
//  MAIN ENVASES COMPONENT
// ────────────────────────────────────────────────────────────
const Envases = () => {
  const playSound = useSound();
  const [showAll, setShowAll] = useState(false);
  const { ref: trackRef, scrollLeft: scrollPrev, scrollRight: scrollNext } = useArrowScroll();

  const marqueeItems = useMemo(() => ENVASES_ITEMS.slice(0, MARQUEE_COUNT), []);
  const shelfItems = useMemo(() => ENVASES_ITEMS.slice(MARQUEE_COUNT), []);
  const remaining = ENVASES_ITEMS.length - MARQUEE_COUNT;

  return (
    <section className="envases" id="envases">
      {/* ── Floating gold particles ── */}
      <div className="envases__particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="envases__particle"
            style={{
              '--p-size': `${p.size}px`,
              '--p-left': p.left,
              '--p-delay': `${p.delay}s`,
              '--p-duration': `${p.duration}s`,
              '--p-opacity': p.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Ambient glow pools ── */}
      <div className="envases__bg-glow envases__bg-glow--left" />
      <div className="envases__bg-glow envases__bg-glow--right" />

      {/* ── Noise texture ── */}
      <div className="envases__noise" />

      <div className="envases__container">
        <SectionHeader
          label="Envases Disponibles"
          title="Catálogo de Envases"
          text="Elige el envase perfecto para tu fragancia. Diseños inspirados en las marcas más exclusivas del mundo."
        />

        {/* ── Counter ── */}
        <motion.div
          className="envases__counter"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="envases__counter-num">{ENVASES_ITEMS.length}</span>
          <span className="envases__counter-label">diseños disponibles</span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HORIZONTAL MARQUEE — bottles float in dark theater
          ══════════════════════════════════════════════════════ */}
      <div className="envases__marquee">
        <div className="envases__marquee-track" ref={trackRef}>
          {marqueeItems.map((item, i) => (
            <MarqueeBottle key={item.id} item={item} index={i} onSound={playSound} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SHELF GRID — museum display with gold shelf lines
          ══════════════════════════════════════════════════════ */}
      <div className="envases__container">
        {!showAll && remaining > 0 && (
          <motion.div
            className="envases__expand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              className="envases__expand-btn"
              onClick={() => { setShowAll(true); playSound('click'); }}
              onMouseEnter={() => playSound('hover')}
            >
              <span className="envases__expand-text">
                Ver {remaining} envases más
              </span>
              <span className="envases__expand-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showAll && (
            <motion.div
              className="envases__shelf"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="envases__shelf-grid">
                {shelfItems.map((item, i) => (
                  <ShelfBottle key={item.id} item={item} index={i} onSound={playSound} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Envases;
