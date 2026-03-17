import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPhone, FiMapPin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_DATA } from '../../../constants/data';

const CONTACT_ITEMS = [
  { icon: FiPhone, value: CONTACT_DATA.phone },
  { icon: FiMapPin, value: CONTACT_DATA.location },
  { icon: FiInstagram, value: CONTACT_DATA.instagram },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const whatsappUrl = `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_DATA.whatsappMessage
  )}`;

  const itemV = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="cta" id="contacto" ref={ref}>
      {/* Decorative background elements */}
      <div className="cta__pattern" aria-hidden="true" />
      <div className="cta__glow" aria-hidden="true" />

      <div className="cta__container">
        <motion.span
          className="cta__label"
          custom={0}
          variants={itemV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className="cta__label-line" />
          Contáctanos
          <span className="cta__label-line" />
        </motion.span>

        <motion.h2
          className="cta__title"
          custom={1}
          variants={itemV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          ¿Listo para encontrar tu{' '}
          <span className="cta__title-accent">fragancia perfecta?</span>
        </motion.h2>

        <motion.p
          className="cta__text"
          custom={2}
          variants={itemV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Escríbenos por WhatsApp y te asesoraremos para encontrar el perfume
          ideal para ti o preparar ese regalo especial.
        </motion.p>

        {/* WhatsApp CTA button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta__button"
          custom={3}
          variants={itemV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="cta__button-bg" />
          <span className="cta__button-content">
            <FaWhatsapp size={24} />
            <span>Escríbenos por WhatsApp</span>
          </span>
        </motion.a>

        {/* Contact info row */}
        <motion.div
          className="cta__info"
          custom={4}
          variants={itemV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {CONTACT_ITEMS.map(({ icon: Icon, value }) => (
            <div key={value} className="cta__info-item">
              <Icon size={16} />
              <span>{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
