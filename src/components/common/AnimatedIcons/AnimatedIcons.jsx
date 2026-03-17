import { motion } from 'framer-motion';

const iconTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 15,
};

const hoverPulse = {
  scale: [1, 1.15, 1],
  transition: { duration: 0.4 },
};

// --- Animated Star / Diamond Icon ---
export const IconStar = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={hoverPulse}
    transition={iconTransition}
  >
    <motion.path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  </motion.svg>
);

// --- Animated Gift Icon ---
export const IconGift = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={hoverPulse}
    transition={iconTransition}
  >
    <motion.rect
      x="3" y="8" width="18" height="4" rx="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.rect
      x="5" y="12" width="14" height="9" rx="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    />
    <motion.line
      x1="12" y1="8" x2="12" y2="21"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    />
    <motion.path
      d="M12 8C12 8 12 4 9 4C7.5 4 6 5 6 6.5C6 8 7.5 8 12 8Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    />
    <motion.path
      d="M12 8C12 8 12 4 15 4C16.5 4 18 5 18 6.5C18 8 16.5 8 12 8Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    />
  </motion.svg>
);

// --- Animated Heart Icon ---
export const IconHeart = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={hoverPulse}
    transition={iconTransition}
  >
    <motion.path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    />
  </motion.svg>
);

// --- Animated Truck / Delivery Icon ---
export const IconDelivery = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ x: [0, 4, 0], transition: { duration: 0.4 } }}
    transition={iconTransition}
  >
    <motion.rect
      x="1" y="3" width="15" height="13" rx="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8 }}
    />
    <motion.polygon
      points="16,8 20,8 23,11 23,16 16,16"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
    <motion.circle
      cx="5.5" cy="18.5" r="2.5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
    />
    <motion.circle
      cx="18.5" cy="18.5" r="2.5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300 }}
    />
  </motion.svg>
);

// --- Animated Droplet / Perfume Icon ---
export const IconDroplet = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
  >
    <motion.path
      d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  </motion.svg>
);

// --- Animated WhatsApp-style Chat Icon ---
export const IconChat = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={hoverPulse}
    transition={iconTransition}
  >
    <motion.path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    />
  </motion.svg>
);
