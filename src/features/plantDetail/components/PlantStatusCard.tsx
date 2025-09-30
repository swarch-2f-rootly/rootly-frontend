import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Pause } from 'lucide-react';
import { getPlantImageUrl } from '../../plants/api/plantApi';
import ClickSpark from '../../ui/ClickSpark';

interface PlantStatusCardProps {
  plant: any;
  isMonitoring: boolean;
  hasMicrocontroller: boolean;
  currentData: any;
  isClient: boolean;
  onToggleMonitoring: () => void;
}

const PlantStatusCard: React.FC<PlantStatusCardProps> = ({
  plant,
  isMonitoring,
  hasMicrocontroller,
  currentData,
  isClient,
  onToggleMonitoring,
}) => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-800 shadow-xl rounded-xl">
      <div className="p-6">
        <h3 className="text-center text-emerald-700 dark:text-emerald-300 font-semibold mb-4">
          Estado de la Planta
        </h3>
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            animate={isMonitoring ? {
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            } : {}}
            transition={{
              duration: 4,
              repeat: isMonitoring ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl organic-shape overflow-hidden">
              <img
                src={getPlantImageUrl(plant)}
                alt={plant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80') {
                    target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80';
                  }
                }}
              />
            </div>
            {isMonitoring && (
              <motion.div
                className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </motion.div>

          <div className="text-center space-y-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              hasMicrocontroller
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              <Activity className="w-3 h-3 mr-1" />
              {hasMicrocontroller ? 'Activa' : 'Sin Hardware'}
            </span>

            {!hasMicrocontroller && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <p className="text-sm text-amber-800 font-medium">
                  ⚠️ Falta implementación física
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Asigna un microcontrolador para recibir datos reales
                </p>
              </motion.div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Última actualización: {isClient ? currentData.timestamp : "--:--:--"}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Cpu className={`w-4 h-4 ${hasMicrocontroller ? 'text-slate-500' : 'text-amber-500'}`} />
                <p className={`text-sm font-mono ${
                  hasMicrocontroller
                    ? 'text-slate-600 dark:text-slate-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {currentData.sensorId}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ClickSpark>
                <button
                  onClick={onToggleMonitoring}
                  disabled={!hasMicrocontroller}
                  className={`${isMonitoring
                    ? 'bg-red-500 hover:bg-red-600'
                    : hasMicrocontroller
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-slate-400 cursor-not-allowed'
                  } text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-2xl font-medium flex items-center gap-2 text-sm ${!hasMicrocontroller ? 'opacity-60' : ''}`}
                >
                  {isMonitoring ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pausar Monitoreo
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      {hasMicrocontroller ? 'Monitorear en Tiempo Real' : 'Sin Hardware'}
                    </>
                  )}
                </button>
              </ClickSpark>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantStatusCard;