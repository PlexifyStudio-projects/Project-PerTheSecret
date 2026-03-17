import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { FOOTER_DATA, CONTACT_DATA } from '../../../constants/data';

// ---- Magnetic hover hook ----
const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};

// ---- Magnetic social link ----
const MagneticSocialLink = ({ href, label, children }) => {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.4);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer__social-link"
      aria-label={label}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

// ---- Animated heart ----
const AnimatedHeart = () => (
  <motion.span
    className="footer__heart"
    animate={{
      scale: [1, 1.25, 1, 1.2, 1],
    }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    }}
    aria-hidden="true"
  >
    &#9829;
  </motion.span>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const waUrl = `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(CONTACT_DATA.whatsappMessage)}`;
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: '-80px' });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <footer className="footer">
      {/* Animated gradient line at top */}
      <div className="footer__gradient-line" aria-hidden="true" />

      <div className="footer__container">
        {/* Back to top */}
        <motion.button
          className="footer__back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBackToTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(201, 168, 76, 0.25)' }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Volver arriba"
        >
          <motion.span
            className="footer__back-to-top-arrow"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowUp />
          </motion.span>
        </motion.button>

        {/* Top brand area */}
        <motion.div
          className="footer__top"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="footer__brand">
            Perfumería{' '}
            <span className="footer__brand-accent">The Secret</span>
          </h3>
          <p className="footer__tagline">{FOOTER_DATA.tagline}</p>

          <div className="footer__social">
            <MagneticSocialLink
              href="https://www.instagram.com/perfumeriathesecret"
              label="Instagram"
            >
              <FaInstagram />
            </MagneticSocialLink>
            <MagneticSocialLink href={waUrl} label="WhatsApp">
              <FaWhatsapp />
            </MagneticSocialLink>
            <MagneticSocialLink
              href={`mailto:${CONTACT_DATA.email}`}
              label="Email"
            >
              <FiMail />
            </MagneticSocialLink>
          </div>
        </motion.div>

        {/* Grid columns with stagger */}
        <div className="footer__grid" ref={gridRef}>
          <motion.div
            custom={0}
            variants={columnVariants}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
          >
            <h4 className="footer__col-title">Navegación</h4>
            <ul className="footer__links">
              {FOOTER_DATA.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={1}
            variants={columnVariants}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
          >
            <h4 className="footer__col-title">Servicios</h4>
            <ul className="footer__links">
              {FOOTER_DATA.services.map((s) => (
                <li key={s}>
                  <span className="footer__link">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={2}
            variants={columnVariants}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
          >
            <h4 className="footer__col-title">Horario</h4>
            <ul className="footer__links">
              <li>
                <span className="footer__link">Lunes - Viernes: 9am - 7pm</span>
              </li>
              <li>
                <span className="footer__link">Sábados: 10am - 5pm</span>
              </li>
              <li>
                <span className="footer__link">Domingos: Previa cita</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            custom={3}
            variants={columnVariants}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
          >
            <h4 className="footer__col-title">Contacto</h4>
            <div className="footer__contact-item">
              <FiPhone size={14} />
              <span>{CONTACT_DATA.phone}</span>
            </div>
            <div className="footer__contact-item">
              <FiMail size={14} />
              <span>{CONTACT_DATA.email}</span>
            </div>
            <div className="footer__contact-item">
              <FiMapPin size={14} />
              <span>{CONTACT_DATA.location}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <span>
            &copy; {year} Perfumería The Secret. Todos los derechos reservados.
          </span>
          <span className="footer__made-with">
            Hecho con <AnimatedHeart /> en Colombia
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
