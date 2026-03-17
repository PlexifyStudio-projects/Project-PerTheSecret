import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Button from '../Button/Button';
import { NAV_LINKS, CONTACT_DATA } from '../../../constants/data';
import useSound from '../../../hooks/useSound';

// ── TS Monogram SVG (line-draw on hover) ──────────────────────────
const TSMonogram = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.svg
      viewBox="0 0 60 60"
      className="navbar__monogram"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <motion.circle
        cx="30" cy="30" r="28"
        fill="none"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        initial={{ pathLength: 0.7 }}
        animate={{ pathLength: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* T letter */}
      <motion.path
        d="M17 18 H30 M23.5 18 V42"
        fill="none"
        stroke="url(#gold-grad)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.1 : 0 }}
      />
      {/* S letter */}
      <motion.path
        d="M44 22 C44 18 40 16 36 18 C32 20 32 24 36 26 C40 28 42 30 42 34 C42 38 38 40 34 38 C30 36 30 34 30 34"
        fill="none"
        stroke="url(#gold-grad)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.15 : 0 }}
      />
      {/* Decorative dot */}
      <motion.circle
        cx="30" cy="49"
        r="1.2"
        fill="url(#gold-grad)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, delay: hovered ? 0.3 : 0 }}
      />
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="45%" stopColor="#dcc27e" />
          <stop offset="70%" stopColor="#f0e4c4" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// ── Animated SVG icons for each nav link ────────────────────────
const NAV_ICONS = {
  inicio: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L9 3.5L15 9.5" /><path d="M5 8.5V14.5H13V8.5" />
    </svg>
  ),
  nosotros: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69a4 4 0 11-5.66 5.66L9 11l2.66-2.65A4 4 0 0012 2.69z" />
    </svg>
  ),
  catalogo: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="14" height="12" rx="1" /><path d="M6 4V2" /><path d="M12 4V2" /><path d="M2 8h14" />
    </svg>
  ),
  regalos: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="14" height="3" rx="0.5" /><rect x="3.5" y="10" width="11" height="6" rx="0.5" /><path d="M9 7v9" /><path d="M9 7s0-3-2.5-3S4 5.5 4 5.5 5 7 9 7z" /><path d="M9 7s0-3 2.5-3 2.5 1.5 2.5 1.5S13 7 9 7z" />
    </svg>
  ),
  testimonios: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L9 12.3 4.8 14.5l.8-4.7L2.2 6.5l4.7-.7L9 1.5z" />
    </svg>
  ),
  contacto: (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 12.5a2 2 0 01-2 2h-8l-3 3v-12a2 2 0 012-2h9a2 2 0 012 2z" />
    </svg>
  ),
};

// ── Individual animated nav link with icon ────────────────────────
const NavLink = ({ link, onClick, onHoverStart, index }) => {
  const playSound = useSound();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      className="navbar__item"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.6 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={link.href}
        className="navbar__link"
        onClick={onClick}
        onMouseEnter={(e) => {
          setHovered(true);
          playSound('hover');
          onHoverStart?.(e);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.span
          className="navbar__link-icon"
          animate={{
            scale: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 4,
            rotate: hovered ? 0 : -20,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {NAV_ICONS[link.id]}
        </motion.span>
        <span className="navbar__link-text">
          {link.label}
        </span>
      </a>
    </motion.li>
  );
};

// ── Full-screen mobile overlay with staggered letter animations ───
const MobileMenu = ({ isOpen, links, waUrl, onClose }) => {
  const playSound = useSound();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.04, staggerDirection: -1, when: 'afterChildren' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(4px)',
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Split text into letters for stagger
  const SplitText = ({ children, itemIndex }) => {
    const letters = children.split('');
    return (
      <span className="navbar-mobile__split">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            className="navbar-mobile__letter"
            initial={{ opacity: 0, y: 30, rotateX: -60 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: 0.3 + itemIndex * 0.08 + i * 0.025,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: -15,
              transition: { duration: 0.2, delay: i * 0.01 },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="navbar-mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background lines */}
          <div className="navbar-mobile__bg-lines" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="navbar-mobile__bg-line"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          <motion.nav
            className="navbar-mobile__nav"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Label */}
            <motion.span className="navbar-mobile__label" variants={itemVariants}>
              Navegaci&oacute;n
            </motion.span>

            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                className="navbar-mobile__link"
                variants={itemVariants}
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
                whileHover={{ x: 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="navbar-mobile__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <SplitText itemIndex={i}>{link.label}</SplitText>
              </motion.a>
            ))}

            {/* WhatsApp CTA */}
            <motion.div className="navbar-mobile__cta" variants={itemVariants}>
              <a
                href={waUrl}
                className="navbar-mobile__wa-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
              >
                <span className="navbar-mobile__wa-pulse" aria-hidden="true" />
                Escribir por WhatsApp
              </a>
            </motion.div>
          </motion.nav>

          {/* Bottom info */}
          <motion.div
            className="navbar-mobile__footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span>Perfumer&iacute;a The Secret</span>
            <span>Colombia</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ════════════════════════════════════════════════════════════════════
// NAVBAR — Main Component
// ════════════════════════════════════════════════════════════════════
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const playSound = useSound();

  // Mouse magnetic trail
  const mouseX = useMotionValue(0);
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const trailOpacity = useMotionValue(0);
  const smoothOpacity = useSpring(trailOpacity, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      trailOpacity.set(1);
    },
    [mouseX, trailOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    trailOpacity.set(0);
  }, [trailOpacity]);

  const closeMenu = () => setIsMenuOpen(false);

  const waUrl = `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_DATA.whatsappMessage
  )}`;

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.4 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Golden magnetic trail line */}
        <motion.div
          className="navbar__trail"
          style={{ x: trailX, opacity: smoothOpacity }}
          aria-hidden="true"
        />

        <div className="navbar__container">
          {/* Logo with monogram */}
          <a href="#inicio" className="navbar__logo">
            <TSMonogram />
            <div className="navbar__logo-text">
              <span className="navbar__logo-prefix">Perfumer&iacute;a</span>
              <span className="navbar__logo-accent">The Secret</span>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="navbar__menu">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.id}
                link={link}
                index={i}
                onClick={closeMenu}
              />
            ))}

            {/* WhatsApp CTA with pulsing gold glow */}
            <motion.li
              className="navbar__cta"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="navbar__wa-wrapper">
                <span className="navbar__wa-glow" aria-hidden="true" />
                <Button
                  variant="outline"
                  size="sm"
                  href={waUrl}
                  className="navbar__wa-btn"
                  onClick={() => playSound('click')}
                >
                  WhatsApp
                </Button>
              </div>
            </motion.li>
          </ul>

          {/* Hamburger toggle */}
          <button
            className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => {
              setIsMenuOpen((o) => !o);
              playSound('click');
            }}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="navbar__accent-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      </motion.nav>

      {/* Full-screen mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        links={NAV_LINKS}
        waUrl={waUrl}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navbar;
