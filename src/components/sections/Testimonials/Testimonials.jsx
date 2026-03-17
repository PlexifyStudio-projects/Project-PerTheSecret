import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { TESTIMONIALS } from '../../../constants/data';

const AUTO_PLAY_MS = 5000;
const GAP = 24;

/* ── Gold gradient star ── */
const Star = ({ i }) => (
  <svg className="testi__star" viewBox="0 0 20 20" fill="none">
    <defs>
      <linearGradient id={`sG${i}`} x1="0" y1="0" x2="20" y2="20">
        <stop offset="0%" stopColor="#dcc27e" />
        <stop offset="50%" stopColor="#c9a84c" />
        <stop offset="100%" stopColor="#f0e4c4" />
      </linearGradient>
    </defs>
    <path
      d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z"
      fill={`url(#sG${i})`}
    />
  </svg>
);

/* ── Main Testimonials Section ── */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(400);
  const [vpW, setVpW] = useState(1200);
  const viewportRef = useRef(null);
  const x = useMotionValue(0);
  const total = TESTIMONIALS.length;
  const step = cardW + GAP;

  /* Responsive card width */
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vpWidth = viewportRef.current?.clientWidth || vw;
      setVpW(vpWidth);
      if (vw < 640) setCardW(vpWidth - 48);
      else if (vw < 1024) setCardW(340);
      else setCardW(400);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Animate track to center active card */
  const animateToCard = useCallback(
    (idx) => {
      const target = vpW / 2 - idx * step - cardW / 2;
      animate(x, target, { type: 'spring', stiffness: 100, damping: 22 });
    },
    [x, vpW, step, cardW]
  );

  useEffect(() => {
    animateToCard(active);
  }, [active, animateToCard]);

  /* Navigation */
  const goTo = useCallback(
    (idx) => setActive(((idx % total) + total) % total),
    [total]
  );
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(t);
  }, [paused, goNext]);

  /* Drag snap */
  const handleDragEnd = useCallback(
    (_, info) => {
      const currentX = x.get();
      const center = vpW / 2 - cardW / 2;
      const rawIdx = Math.round((center - currentX) / step);
      const snapped = Math.max(0, Math.min(total - 1, rawIdx));
      setActive(snapped);
    },
    [x, vpW, cardW, step, total]
  );

  return (
    <section
      className="testi"
      id="testimonios"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testi__bg-glow" aria-hidden="true" />
      <div className="testi__bg-glow testi__bg-glow--right" aria-hidden="true" />

      <div className="testi__container">
        <SectionHeader
          label="Lo Que Dicen"
          title="Nuestros Clientes"
          text="La satisfacción de nuestros clientes es nuestra mejor carta de presentación."
        />

        {/* Counter */}
        <motion.div
          className="testi__counter"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="testi__counter-number">{total}</span>
          <span className="testi__counter-text">opiniones de clientes satisfechos</span>
        </motion.div>

        {/* ── Carousel ── */}
        <div className="testi__carousel">
          <div className="testi__viewport" ref={viewportRef}>
            <motion.div
              className="testi__track"
              style={{ x, gap: `${GAP}px` }}
              drag="x"
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
            >
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === active;
                const dist = Math.abs(i - active);

                return (
                  <motion.div
                    key={t.id}
                    className={`testi__card ${isActive ? 'testi__card--active' : ''}`}
                    style={{ width: cardW, flexShrink: 0 }}
                    animate={{
                      scale: isActive ? 1 : Math.max(0.82, 1 - dist * 0.06),
                      opacity: isActive ? 1 : Math.max(0.35, 1 - dist * 0.22),
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => !isActive && goTo(i)}
                  >
                    {/* Product image */}
                    {t.image && (
                      <div className="testi__card-image">
                        <img src={t.image} alt="" loading="lazy" draggable={false} />
                        <div className="testi__card-image-overlay" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="testi__card-body">
                      <span className="testi__card-quote" aria-hidden="true">
                        {'\u201C'}
                      </span>

                      <div className="testi__stars">
                        {Array.from({ length: t.stars }, (_, si) => (
                          <Star key={si} i={si} />
                        ))}
                      </div>

                      <blockquote className="testi__card-text">{t.text}</blockquote>

                      <div className="testi__card-author">
                        <div className="testi__card-avatar">{t.author.charAt(0)}</div>
                        <div className="testi__card-info">
                          <span className="testi__author-name">{t.author}</span>
                          <span className="testi__card-role">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            className="testi__nav testi__nav--left"
            onClick={goPrev}
            aria-label="Testimonios anteriores"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            className="testi__nav testi__nav--right"
            onClick={goNext}
            aria-label="Siguientes testimonios"
          >
            <FiChevronRight size={22} />
          </button>
        </div>

        {/* ── Controls ── */}
        <div className="testi__controls">
          {/* Active counter */}
          <div className="testi__active-count">
            <span className="testi__active-count-current">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="testi__active-count-sep">/</span>
            <span className="testi__active-count-total">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="testi__progress">
            <motion.div
              className="testi__progress-fill"
              key={`${active}-${paused}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? undefined : 1 }}
              transition={{ duration: AUTO_PLAY_MS / 1000, ease: 'linear' }}
            />
          </div>

          {/* Dot indicators */}
          <div className="testi__indicators">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testi__indicator ${i === active ? 'testi__indicator--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
