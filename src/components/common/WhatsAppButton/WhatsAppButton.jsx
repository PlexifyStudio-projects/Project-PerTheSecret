import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_DATA } from '../../../constants/data';

const WhatsAppButton = () => {
  const url = `https://wa.me/${CONTACT_DATA.whatsappNumber}?text=${encodeURIComponent(CONTACT_DATA.whatsappMessage)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp />
    </motion.a>
  );
};

export default WhatsAppButton;
