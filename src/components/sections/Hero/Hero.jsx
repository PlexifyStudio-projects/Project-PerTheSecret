import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../../common/Button/Button';
import { HERO_DATA } from '../../../constants/data';
import heroFrame from '../../../assets/images/hero-frame.jpg';
import heroBg from '../../../assets/images/hero-bg.jpg';

const EASE = [0.16, 1, 0.3, 1];
const D = 0.6; // base delay after preloader

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const contentOp = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

  return (
    <section className="hero" id="inicio" ref={ref}>
      {/* Background image with parallax zoom */}
      <motion.div className="hero__bg" style={{ scale: bgScale }}>
        <img src={heroBg} alt="" aria-hidden="true" />
        <div className="hero__bg-overlay" />
      </motion.div>

      {/* Main split layout */}
      <div className="hero__container">
        {/* LEFT — Text */}
        <motion.div className="hero__text" style={{ y: contentY, opacity: contentOp }}>
          <motion.div
            className="hero__label"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: D + 0.8, ease: EASE }}
          >
            <span className="hero__label-dot" />
            Perfumería Artesanal · Colombia
          </motion.div>

          <div className="hero__title">
            <motion.span
              className="hero__title-pre"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: D + 1, ease: EASE }}
            >
              Perfumería
            </motion.span>
            <motion.span
              className="hero__title-main"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: D + 1.3, ease: EASE }}
            >
              The Secret
            </motion.span>
          </div>

          <motion.div
            className="hero__line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: D + 2.2, ease: EASE }}
          />

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: D + 2.5, ease: EASE }}
          >
            {HERO_DATA.subtitle}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: D + 2.8, ease: EASE }}
          >
            <Button variant="primary" size="lg" href="#catalogo" arrow>
              {HERO_DATA.ctaPrimary}
            </Button>
            <Button variant="ghost" size="lg" href="#contacto">
              {HERO_DATA.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* RIGHT — Featured image with animated gold frame */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: D + 1, ease: EASE }}
        >
          <div className="hero__frame">
            {/* SVG animated gold border */}
            <motion.svg className="hero__frame-border" viewBox="0 0 400 500" preserveAspectRatio="none">
              <motion.rect
                x="1" y="1" width="398" height="498" rx="0"
                fill="none"
                stroke="url(#heroGold)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: D + 1.2, ease: EASE }}
              />
              <defs>
                <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" />
                  <stop offset="50%" stopColor="#f0e4c4" />
                  <stop offset="100%" stopColor="#c9a84c" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.img
              src={heroFrame}
              alt="Perfumería The Secret"
              className="hero__frame-img"
              initial={{ scale: 1.25 }}
              animate={{
                scale: [1.25, 1, 1.03, 1.01, 1.04, 1.02],
                x: [0, 0, -3, 2, -1, 0],
                y: [0, 0, 2, -2, 1, 0],
              }}
              transition={{
                scale: {
                  duration: 18,
                  delay: D + 1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  times: [0, 0.12, 0.3, 0.5, 0.75, 1],
                },
                x: {
                  duration: 18,
                  delay: D + 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                y: {
                  duration: 18,
                  delay: D + 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: D + 2.8, ease: EASE }}
          >
            <span className="hero__badge-num">500+</span>
            <span className="hero__badge-text">Clientes</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 3.5, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-bar">
          <div className="hero__scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
