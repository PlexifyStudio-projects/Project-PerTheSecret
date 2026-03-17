import { useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const trailX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });
  const trailY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });
  const isDesktop = useRef(window.matchMedia('(min-width: 1025px)').matches);

  const onMouseMove = useCallback((e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  }, [x, y]);

  useEffect(() => {
    if (!isDesktop.current) return;
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  if (!isDesktop.current) return null;

  return (
    <motion.div
      className="cursor-glow"
      style={{ x: trailX, y: trailY }}
    />
  );
};

export default CustomCursor;
