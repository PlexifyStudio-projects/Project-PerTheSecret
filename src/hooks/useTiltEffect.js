import { useRef, useCallback } from 'react';

const useTiltEffect = (maxTilt = 8) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;

    element.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
};

export default useTiltEffect;
