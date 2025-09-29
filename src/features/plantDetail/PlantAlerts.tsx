import React from "react"
import { motion } from "framer-motion"
import { Bell, AlertTriangle, CheckCircle } from "lucide-react"

interface AlertData {
  plant: string
  time: string
  priority: 'Alta' | 'Media' | 'Baja' | 'Normal'
  soil: string
  icon: React.ComponentType<{ className?: string }>
  message: string
}

interface Plant {
  id: string
  name: string
}

interface PlantAlertsProps {
  plant: Plant
  currentData: {
    soilHumidity: number
    temperature: number
    airHumidity: number
    lightLevel: number
  }
}

const PlantAlerts: React.FC<PlantAlertsProps> = ({ plant, currentData }) => {
  // Generar alertas basadas en los datos actuales
  const alerts: AlertData[] = [
    ...(currentData.soilHumidity < 40 ? [{
      plant: plant.name,
      time: "Ahora",
      priority: "Alta" as const,
      soil: `${currentData.soilHumidity.toFixed(1)}%`,
      icon: AlertTriangle,
      message: "Suelo muy seco - requiere riego inmediato"
    }] : []),
    ...(currentData.temperature > 30 ? [{
      plant: plant.name,
      time: "Hace 5 min",
      priority: "Media" as const,
      soil: `${currentData.temperature.toFixed(1)}°C`,
      icon: AlertTriangle,
      message: "Temperatura alta - considerar ventilación"
    }] : []),
    ...(currentData.airHumidity < 40 ? [{
      plant: plant.name,
      time: "Hace 10 min",
      priority: "Media" as const,
      soil: `${currentData.airHumidity.toFixed(1)}%`,
      icon: AlertTriangle,
      message: "Humedad del aire baja - considerar humidificador"
    }] : []),
    ...(currentData.lightLevel > 1500 ? [{
      plant: plant.name,
      time: "Hace 15 min",
      priority: "Baja" as const,
      soil: `${currentData.lightLevel.toFixed(0)} lux`,
      icon: AlertTriangle,
      message: "Luminosidad muy alta - considerar sombra"
    }] : []),
    // Si no hay alertas, mostrar estado normal
    ...(currentData.soilHumidity >= 40 && currentData.temperature <= 30 && currentData.airHumidity >= 40 && currentData.lightLevel <= 1500 ? [{
      plant: plant.name,
      time: "Siempre",
      priority: "Normal" as const,
      soil: "Óptimo",
      icon: CheckCircle,
      message: "Todas las condiciones están dentro de los parámetros ideales"
    }] : [])
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="mt-8"
    >
      <motion.div 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl p-6 relative overflow-hidden group"
        whileHover={{ 
          scale: 1.01,
          boxShadow: "0 25px 50px rgba(239, 68, 68, 0.1)"
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-orange-500/3 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        {/* Pulsing alert indicator */}
        <motion.div
          className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.h3 
            className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bell className="w-5 h-5 mr-2 text-red-500" />
            </motion.div>
            Alertas del Sistema
          </motion.h3>
          <motion.span 
            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(239, 68, 68, 0)",
                "0 0 10px rgba(239, 68, 68, 0.3)",
                "0 0 0 rgba(239, 68, 68, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {alerts.length} activas
          </motion.span>
        </div>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.02, 
                x: 5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative overflow-hidden group"
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  alert.priority === 'Alta' ? 'bg-gradient-to-r from-red-500/5 to-orange-500/5' :
                  alert.priority === 'Media' ? 'bg-gradient-to-r from-yellow-500/5 to-amber-500/5' :
                  alert.priority === 'Normal' ? 'bg-gradient-to-r from-emerald-500/5 to-green-500/5' :
                  'bg-gradient-to-r from-blue-500/5 to-cyan-500/5'
                }`}
              />
              <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 flex items-center">
                  <motion.div
                    className="relative"
                    animate={alert.priority === 'Alta' ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <alert.icon className={`w-4 h-4 mr-2 ${
                      alert.priority === 'Alta' ? 'text-red-500' :
                      alert.priority === 'Media' ? 'text-yellow-500' :
                      alert.priority === 'Normal' ? 'text-emerald-500' :
                      'text-blue-500'
                    }`} />
                    {/* Pulsing glow effect for high priority alerts */}
                    {alert.priority === 'Alta' && (
                      <motion.div
                        className={`absolute inset-0 w-4 h-4 ${
                          alert.priority === 'Alta' ? 'bg-red-500' :
                          alert.priority === 'Media' ? 'bg-yellow-500' :
                          alert.priority === 'Normal' ? 'bg-emerald-500' :
                          'bg-blue-500'
                        } rounded-full opacity-20`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>
                  {alert.plant}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.priority === 'Alta' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                  alert.priority === 'Media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  alert.priority === 'Normal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {alert.priority}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {alert.message}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {alert.time} • Valor actual: {alert.soil}
              </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PlantAlerts
