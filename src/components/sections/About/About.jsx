import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiGift, FiHeart, FiTruck } from 'react-icons/fi';
import { ABOUT_SLIDES } from '../../../constants/data';
import useSound from '../../../hooks/useSound';

const ICON_MAP = {
  star: FiStar,
  gift: FiGift,
  heart: FiHeart,
  truck: FiTruck,
};

const EASE = [0.16, 1, 0.3, 1];

const textVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, filter: 'blur(4px)', transition: { duration: 0.35 } }),
};

const imageVariants = {
  enter: { opacity: 0, scale: 1.1 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
};

const featureVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE },
  }),
};

const About = () => {
  const [[index, direction], setIndex] = useState([0, 1]);
  const playSound = useSound();
  const slide = ABOUT_SLIDES[index];
  const total = ABOUT_SLIDES.length;

  const go = useCallback((dir) => {
    playSound('click');
    setIndex(([prev]) => [(prev + dir + total) % total, dir]);
  }, [total, playSound]);

  return (
    <section className="about" id="nosotros">
      <div className="about__container">
        {/* ── Image side with arrows ── */}
        <div className="about__visual">
          <div className="about__image-box">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={index}
                src={slide.image}
                alt={slide.titleAccent}
                className="about__image"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>

            {/* Navigation arrows on the image */}
            <div className="about__arrows">
              <button className="about__arrow" onClick={() => go(-1)} aria-label="Anterior">
                <FiChevronLeft size={20} />
              </button>
              <button className="about__arrow" onClick={() => go(1)} aria-label="Siguiente">
                <FiChevronRight size={20} />
              </button>
            </div>

            {/* Slide counter */}
            <div className="about__counter">
              <span className="about__counter-current">{String(index + 1).padStart(2, '0')}</span>
              <span className="about__counter-sep">/</span>
              <span className="about__counter-total">{String(total).padStart(2, '0')}</span>
            </div>

            {/* Progress dots */}
            <div className="about__dots">
              {ABOUT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`about__dot ${i === index ? 'about__dot--active' : ''}`}
                  onClick={() => { playSound('click'); setIndex([i, i > index ? 1 : -1]); }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Floating stat badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`stat-${index}`}
              className="about__stat"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="about__stat-number">{slide.stat.number}</span>
              <span className="about__stat-label">{slide.stat.label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Content side ── */}
        <div className="about__content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`content-${index}`}
              variants={textVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span className="about__label">
                <span className="about__label-line" />
                {slide.label}
                <span className="about__label-line" />
              </span>

              <h2 className="about__title">
                {slide.title}{' '}
                <span className="about__title-accent">{slide.titleAccent}</span>
              </h2>

              <p className="about__text">{slide.text}</p>

              <div className="about__divider" />

              <div className="about__features">
                {slide.features.map((feat, i) => {
                  const Icon = ICON_MAP[feat.icon];
                  return (
                    <motion.div
                      key={feat.text}
                      className="about__feature"
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                    >
                      <div className="about__feature-icon">
                        <Icon size={18} />
                      </div>
                      <span className="about__feature-text">{feat.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default About;
