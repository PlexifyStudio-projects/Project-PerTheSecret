import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { FiShoppingBag, FiDroplet } from 'react-icons/fi';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import Button from '../../common/Button/Button';
import { CATALOG_FILTERS, CATALOG_ITEMS, CONTACT_DATA } from '../../../constants/data';
import useSound from '../../../hooks/useSound';

const EASE = [0.16, 1, 0.3, 1];

/* ── Helpers ── */
const buildWhatsAppURL = (msg) =>
  `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(msg)}`;

const getStaggerDelay = (indexInGrid) => {
  const row = Math.floor(indexInGrid / 4);
  const col = indexInGrid % 4;
  return row * 0.12 + col * 0.05;
};

/* ── Magnetic Filter Pill (kept from original) ── */
const FilterPill = ({ filters, active, onChange, onSound, totalCount, filteredCount }) => {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const measure = useCallback(() => {
    const btn = buttonRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;
    const cR = container.getBoundingClientRect();
    const bR = btn.getBoundingClientRect();
    setPillStyle({ left: bR.left - cR.left, width: bR.width });
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <motion.div
      className="catalog__filters"
      ref={containerRef}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="catalog__pill"
        animate={{ left: pillStyle.left, width: pillStyle.width }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      />
      {filters.map((f) => (
        <button
          key={f.id}
          ref={(el) => { buttonRefs.current[f.id] = el; }}
          className={`catalog__filter ${active === f.id ? 'catalog__filter--active' : ''}`}
          onClick={() => { onChange(f.id); onSound('click'); }}
          onMouseEnter={() => onSound('hover')}
        >
          {f.label}
        </button>
      ))}
      <span className="catalog__count">
        {active === 'todos'
          ? `${totalCount} fragancias`
          : `${filteredCount} fragancias`}
      </span>
    </motion.div>
  );
};

/* ── Featured Spotlight Hero ── */
const FeaturedSpotlight = ({ item, onSound }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageYSmooth = useSpring(imageY, { stiffness: 80, damping: 30 });

  const handleOrder = () => {
    onSound('click');
    const msg = `¡Hola! Me interesa el perfume "${item.name}" (${item.size}). ¿Podrían darme más información?`;
    window.open(buildWhatsAppURL(msg), '_blank');
  };

  const notes = item.notes ? item.notes.split(' · ') : [];

  return (
    <motion.div
      className="catalog__spotlight"
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* Image side */}
      <div className="catalog__spotlight-image">
        <motion.div className="catalog__spotlight-image-inner" style={{ y: imageYSmooth }}>
          <img src={item.image} alt={item.name} loading="lazy" />
        </motion.div>
        <div className="catalog__spotlight-image-overlay" />
        {item.badge && (
          <motion.span
            className="catalog__spotlight-badge"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {item.badge}
          </motion.span>
        )}
      </div>

      {/* Gold diagonal slash */}
      <div className="catalog__spotlight-slash" />

      {/* Content side */}
      <div className="catalog__spotlight-content">
        <motion.span
          className="catalog__spotlight-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {item.category}
        </motion.span>

        <motion.h3
          className="catalog__spotlight-name"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          {item.name}
        </motion.h3>

        <motion.p
          className="catalog__spotlight-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {item.description}
        </motion.p>

        {/* Fragrance notes — vertical stagger */}
        {notes.length > 0 && (
          <div className="catalog__spotlight-notes">
            <span className="catalog__spotlight-notes-label">Notas de fragancia</span>
            {notes.map((note, i) => (
              <motion.div
                key={note}
                className="catalog__spotlight-note"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE }}
              >
                <FiDroplet size={11} />
                <span>{note}</span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="catalog__spotlight-meta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="catalog__spotlight-size">{item.size}</span>
          <span className="catalog__spotlight-price">{item.price}</span>
        </motion.div>

        <motion.div
          className="catalog__spotlight-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        >
          <Button variant="primary" onClick={handleOrder} arrow>
            Pedir por WhatsApp
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Bento Card with Cursor-Tracking Glow ── */
const BentoCard = ({ item, gridIndex, onSound }) => {
  const cardRef = useRef(null);
  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.5);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--glow-x', `${x}px`);
    el.style.setProperty('--glow-y', `${y}px`);
    glowX.set(x / rect.width);
    glowY.set(y / rect.height);
  }, [glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--glow-x', `50%`);
    el.style.setProperty('--glow-y', `50%`);
  }, []);

  const handleOrder = () => {
    onSound('click');
    const msg = `¡Hola! Me interesa el perfume "${item.name}" (${item.size}). ¿Podrían darme más información?`;
    window.open(buildWhatsAppURL(msg), '_blank');
  };

  const delay = getStaggerDelay(gridIndex);

  return (
    <motion.article
      ref={cardRef}
      className="catalog__bento-card"
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onSound('hover')}
    >
      {/* Cursor-tracking glow */}
      <div className="catalog__bento-glow" />

      {/* Image */}
      <div className="catalog__bento-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <div className="catalog__bento-image-overlay" />
        {item.badge && <span className="catalog__bento-badge">{item.badge}</span>}
        {item.size && <span className="catalog__bento-size">{item.size}</span>}
      </div>

      {/* Content */}
      <div className="catalog__bento-body">
        <span className="catalog__bento-category">{item.category}</span>
        <h3 className="catalog__bento-name">{item.name}</h3>
        <p className="catalog__bento-desc">{item.description}</p>

        {item.notes && (
          <div className="catalog__bento-notes">
            <FiDroplet size={11} />
            <span>{item.notes}</span>
          </div>
        )}

        <div className="catalog__bento-footer">
          <span className="catalog__bento-price">{item.price}</span>
          <button
            className="catalog__bento-whatsapp"
            onClick={handleOrder}
            aria-label={`Pedir ${item.name}`}
          >
            <FiShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Hover CTA overlay */}
      <div className="catalog__bento-cta">
        <Button variant="primary" size="sm" onClick={handleOrder} arrow>
          Pedir por WhatsApp
        </Button>
      </div>
    </motion.article>
  );
};

/* ── Main Catalog ── */
const Catalog = () => {
  const [filter, setFilter] = useState('todos');
  const playSound = useSound();

  const filtered = useMemo(() =>
    filter === 'todos'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === filter),
    [filter]
  );

  // Pull first badge item as the spotlight hero
  const spotlightItem = useMemo(
    () => filtered.find((item) => item.badge),
    [filtered]
  );

  const gridItems = useMemo(() =>
    filtered.filter((item) => item !== spotlightItem),
    [filtered, spotlightItem]
  );

  return (
    <section className="catalog" id="catalogo">
      {/* Ambient background glows */}
      <div className="catalog__bg-glow catalog__bg-glow--1" />
      <div className="catalog__bg-glow catalog__bg-glow--2" />

      <div className="catalog__container">
        <SectionHeader
          label="Nuestras Fragancias"
          title="Catálogo de Perfumes"
          text="Descubre nuestra colección inspirada en las marcas más exclusivas. Cada fragancia es una obra maestra."
        />

        <FilterPill
          filters={CATALOG_FILTERS}
          active={filter}
          onChange={setFilter}
          onSound={playSound}
          totalCount={CATALOG_ITEMS.length}
          filteredCount={filtered.length}
        />

        {/* Featured Spotlight Hero */}
        <AnimatePresence mode="wait">
          {spotlightItem && (
            <FeaturedSpotlight
              key={`spotlight-${spotlightItem.id}`}
              item={spotlightItem}
              onSound={playSound}
            />
          )}
        </AnimatePresence>

        {/* Bento Grid */}
        <motion.div className="catalog__bento" layout>
          <AnimatePresence mode="popLayout">
            {gridItems.map((item, i) => (
              <BentoCard
                key={item.id}
                item={item}
                gridIndex={i}
                onSound={playSound}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="catalog__bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="catalog__bottom-text">
            ¿No encuentras lo que buscas? Tenemos más de 100 fragancias disponibles.
          </p>
          <Button
            variant="outline"
            href={buildWhatsAppURL('¡Hola! Me gustaría ver el catálogo completo de fragancias.')}
            arrow
          >
            Ver Catálogo Completo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Catalog;
