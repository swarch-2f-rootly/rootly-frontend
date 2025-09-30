import React from 'react';
import { motion } from 'framer-motion';

const ErrorDisplay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
    >
      <p className="text-red-700 font-medium">Error al cargar la planta</p>
      <p className="text-red-600 text-sm mt-1">Por favor, intenta de nuevo más tarde</p>
    </motion.div>
  );
};

export default ErrorDisplay;