import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { FiGift, FiCheck } from 'react-icons/fi';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { GIFT_BOXES } from '../../../constants/data';

/* ── Decorative gold corner frame ── */
const CornerFrame = ({ position }) => (
  <div className={`gifts__corner gifts__corner--${position}`} aria-hidden="true">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M0 40 L0 0 L40 0"
        stroke="url(#cornerGold)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="cornerGold" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#dcc27e" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* ── Shimmer overlay for hover ── */
const ShimmerOverlay = () => (
  <div className="gifts__shimmer" aria-hidden="true" />
);

/* ── Gold diamond separator ── */
const GoldDiamond = () => (
  <span className="gifts__diamond" aria-hidden="true">
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 0)" fill="#c9a84c" opacity="0.6" />
    </svg>
  </span>
);

/* ── Single Gift Card — Premium Redesign ── */
const GiftCard = ({ box, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const includeVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.06 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <motion.article
      className={`gifts__card ${isActive ? 'gifts__card--active' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner frames */}
      <CornerFrame position="top-left" />
      <CornerFrame position="top-right" />
      <CornerFrame position="bottom-left" />
      <CornerFrame position="bottom-right" />

      <ShimmerOverlay />

      {/* Image area with gradient overlay */}
      <div className="gifts__card-image">
        <motion.img
          src={box.image}
          alt={box.name}
          loading="lazy"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="gifts__card-image-overlay" />

        {/* Floating badge */}
        <motion.div
          className="gifts__card-badge"
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 6, opacity: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <FiGift size={14} />
          <span>Edición Especial</span>
        </motion.div>
      </div>

      {/* Content body */}
      <div className="gifts__card-body">
        <div className="gifts__card-header">
          <GoldDiamond />
          <h3 className="gifts__card-name">{box.name}</h3>
          <GoldDiamond />
        </div>

        <p className="gifts__card-desc">{box.description}</p>

        {/* Premium includes list */}
        <div className="gifts__card-includes">
          <span className="gifts__card-includes-label">Incluye</span>
          <ul className="gifts__card-list">
            <AnimatePresence>
              {box.includes.map((item, i) => (
                <motion.li
                  key={item}
                  className="gifts__card-list-item"
                  custom={i}
                  variants={includeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="gifts__card-list-icon">
                    <FiCheck size={12} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Gold separator line */}
        <motion.div
          className="gifts__card-line"
          animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.article>
  );
};

/* ── Progress Dots with gold fill ── */
const ProgressDots = ({ total, active, onDotClick }) => (
  <div className="gifts__dots">
    {Array.from({ length: total }, (_, i) => (
      <button
        key={i}
        className={`gifts__dot ${i === active ? 'gifts__dot--active' : ''}`}
        onClick={() => onDotClick(i)}
        aria-label={`Ir a caja de regalo ${i + 1}`}
      >
        <span className="gifts__dot-fill" />
      </button>
    ))}
  </div>
);

/* ── Main Section ── */
const GiftBoxes = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* Track mouse for radial gradient background */
  const handleMouseMove = useCallback(
    (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);

      const el = sectionRef.current;
      if (el) {
        el.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }
    },
    [mouseX, mouseY]
  );

  /* Track active card via scroll position */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.offsetWidth || 1;
      const gap = 32;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, GIFT_BOXES.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  /* Scroll to card on dot click */
  const scrollToCard = (i) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.offsetWidth || 0;
    const gap = 32;
    container.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <section
      className="gifts"
      id="regalos"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="gifts__bg-gradient" aria-hidden="true" />
      <div className="gifts__glow" aria-hidden="true" />
      <div className="gifts__glow gifts__glow--right" aria-hidden="true" />

      <div className="gifts__container">
        <SectionHeader
          label="Detalles Especiales"
          title="Cajas de Regalo"
          text="Sorprende a esa persona especial con presentaciones exclusivas, artesanales y llenas de amor."
        />

        <div className="gifts__carousel">
          {GIFT_BOXES.map((box, i) => (
            <GiftCard
              key={box.id}
              box={box}
              index={i}
              isActive={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftBoxes;
