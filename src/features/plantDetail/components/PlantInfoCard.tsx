import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Leaf, MapPin, Clock } from 'lucide-react';

interface PlantInfoCardProps {
  plant: any;
  isClient: boolean;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ plant, isClient }) => {
  const formatDate = (dateString: string) => {
    if (!isClient) return '--/--/----';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlantAge = (createdAt: string) => {
    if (!isClient) return '0 días';
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return '1 día';
    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 mes' : `${months} meses`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 año' : `${years} años`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-950 dark:to-emerald-900 border-2 border-teal-200 dark:border-teal-800 shadow-xl rounded-xl p-6"
    >
      <h3 className="text-center text-teal-700 dark:text-teal-300 font-semibold mb-4 flex items-center justify-center gap-2">
        <Leaf className="w-5 h-5" />
        Información de la Planta
      </h3>

      <div className="space-y-3">
        {/* Especie */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Especie</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {plant?.species || 'No especificada'}
            </p>
          </div>
        </div>

        {/* Fecha de creación */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fecha de registro</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {plant?.createdAt ? formatDate(plant.createdAt) : 'No disponible'}
            </p>
          </div>
        </div>

        {/* Edad de la planta */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Edad en el sistema</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {plant?.createdAt ? getPlantAge(plant.createdAt) : 'No disponible'}
            </p>
          </div>
        </div>

        {/* Ubicación */}
        {plant?.location && (
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ubicación</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {plant.location}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlantInfoCard;
