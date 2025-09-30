import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center py-12"
    >
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
        <span className="text-emerald-700 font-medium">Cargando planta...</span>
      </div>
    </motion.div>
  );
};

export const PlantNotFound: React.FC = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 p-6 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
            Planta no encontrada
          </h2>
          <a
            href="/monitoring"
            className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            Volver a la lista
          </a>
        </div>
      </div>
    );
  };
  

export default LoadingIndicator;