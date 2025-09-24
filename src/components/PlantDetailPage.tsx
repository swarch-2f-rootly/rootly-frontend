import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import StackCards from './StackCards'
import { getPlantById } from '../data/plantsMock'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Droplets,
  Thermometer,
  Wind,
  MapPin,
  Clock,
  Cpu,
  Leaf,
  Play,
  Pause,
  ArrowLeft,
  Plus,
  Activity,
  Sun,
  Bell,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

interface PlantData {
  soilHumidity: number
  airHumidity: number
  temperature: number
  lightLevel: number
  timestamp: string
  date: string
  location: string
  sensorId: string
}

interface AlertData {
  plant: string
  time: string
  priority: 'Alta' | 'Media' | 'Baja' | 'Normal'
  soil: string
  icon: React.ComponentType<{ className?: string }>
  message: string
}

// Componente ClickSpark personalizado
const ClickSpark: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  count?: number;
  duration?: number;
}> = ({ children, color = "#10B981", size = 20, count = 8, duration = 600 }) => {
  const [sparks, setSparks] = React.useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newSparks = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      angle: (360 / count) * i,
    }));
    
    setSparks(newSparks);
    
    setTimeout(() => {
      setSparks([]);
    }, duration);
  };

  return (
    <div onClick={handleClick} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            scale: 1,
            opacity: 1 
          }}
          animate={{ 
            x: Math.cos(spark.angle * Math.PI / 180) * 100,
            y: Math.sin(spark.angle * Math.PI / 180) * 100,
            scale: 0,
            opacity: 0 
          }}
          transition={{ 
            duration: duration / 1000,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Componente TrueFocus personalizado
const TrueFocus: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  opacity?: number;
  blur?: number;
}> = ({ children, color = "#10B981", size = 200, opacity = 0.1, blur = 40 }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
      <motion.div
        style={{
          position: 'fixed',
          top: position.y - size / 2,
          left: position.x - size / 2,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      {children}
    </div>
  );
};

// Componente CountUp personalizado
const CountUpComponent: React.FC<{
  end: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}> = ({ end, suffix = "", decimals = 0, className = "" }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const count = useMotionValue(0);
  const springCount = useSpring(count, { duration: 2000 });

  React.useEffect(() => {
    springCount.set(end);
  }, [springCount, end]);

  React.useEffect(() => {
    const unsubscribe = springCount.on("change", (latest: number) => {
      setDisplayValue(Number(latest));
    });
    return unsubscribe;
  }, [springCount]);

  return (
    <motion.span className={className}>
      {displayValue.toFixed(decimals)}{suffix}
    </motion.span>
  );
};

const PlantDetailPage: React.FC = () => {
  const { plantId } = useParams<{ plantId: string }>()
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Encontrar la planta por ID
  const plant = getPlantById(parseInt(plantId || "1"))
  
  const [currentData, setCurrentData] = useState<PlantData>({
    soilHumidity: plant?.soilHumidity || 65,
    airHumidity: plant?.humidity || 72,
    temperature: plant?.temperature || 24.5,
    lightLevel: plant?.lightLevel || 850,
    timestamp: "",
    date: "",
    location: plant?.location || "Región Central",
    sensorId: plant?.sensor || "ESP8266-001"
  })

  // Inicializar datos de tiempo solo en el cliente
  useEffect(() => {
    setIsClient(true)
    const now = new Date()
    setCurrentData(prev => ({
      ...prev,
      timestamp: now.toLocaleTimeString('es-ES'),
      date: now.toLocaleDateString('es-ES')
    }))
  }, [])

  // Simular datos en tiempo real
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setCurrentData(prev => ({
        ...prev,
        soilHumidity: Math.max(30, Math.min(90, prev.soilHumidity + (Math.random() - 0.5) * 10)),
        airHumidity: Math.max(40, Math.min(85, prev.airHumidity + (Math.random() - 0.5) * 8)),
        temperature: Math.max(18, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        lightLevel: Math.max(0, Math.min(2000, prev.lightLevel + (Math.random() - 0.5) * 200)),
        timestamp: new Date().toLocaleTimeString('es-ES'),
        date: new Date().toLocaleDateString('es-ES')
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  // Datos mock para gráficos específicos de esta planta
  const chartData = [
    { time: '00:00', temperature: currentData.temperature - 2, humidity: currentData.airHumidity + 3, soilHumidity: currentData.soilHumidity - 2, lightLevel: 0 },
    { time: '04:00', temperature: currentData.temperature - 3, humidity: currentData.airHumidity + 5, soilHumidity: currentData.soilHumidity - 1, lightLevel: 50 },
    { time: '08:00', temperature: currentData.temperature - 1, humidity: currentData.airHumidity + 2, soilHumidity: currentData.soilHumidity + 1, lightLevel: currentData.lightLevel * 0.8 },
    { time: '12:00', temperature: currentData.temperature + 4, humidity: currentData.airHumidity - 10, soilHumidity: currentData.soilHumidity - 5, lightLevel: currentData.lightLevel * 1.5 },
    { time: '16:00', temperature: currentData.temperature + 2, humidity: currentData.airHumidity - 7, soilHumidity: currentData.soilHumidity - 3, lightLevel: currentData.lightLevel * 1.2 },
    { time: '20:00', temperature: currentData.temperature - 1, humidity: currentData.airHumidity + 1, soilHumidity: currentData.soilHumidity + 2, lightLevel: currentData.lightLevel * 0.4 },
    { time: '24:00', temperature: currentData.temperature - 2, humidity: currentData.airHumidity + 3, soilHumidity: currentData.soilHumidity + 1, lightLevel: 0 }
  ]

  const getStatusColor = (value: number, type: 'humidity' | 'temperature' | 'light') => {
    if (type === 'humidity') {
      if (value < 40) return 'text-red-600 bg-red-50 dark:bg-red-950'
      if (value > 80) return 'text-orange-600 bg-orange-50 dark:bg-orange-950'
      return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
    }
    if (type === 'temperature') {
      if (value < 20) return 'text-blue-600 bg-blue-50 dark:bg-blue-950'
      if (value > 30) return 'text-red-600 bg-red-50 dark:bg-red-950'
      return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
    }
    if (type === 'light') {
      if (value < 200) return 'text-slate-600 bg-slate-50 dark:bg-slate-950'
      if (value < 500) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950'
      if (value > 1500) return 'text-orange-600 bg-orange-50 dark:bg-orange-950'
      return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
    }
    return 'text-slate-600 bg-slate-50 dark:bg-slate-950'
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
            Planta no encontrada
          </h2>
          <Link
            to="/monitoring"
            className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la lista
          </Link>
        </div>
      </div>
    )
  }

  return (
    <TrueFocus
      color="#10B981"
      size={200}
      opacity={0.1}
      blur={40}
    >
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Navigation Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <ClickSpark>
              <Link
                to="/monitoring"
                className="inline-flex items-center px-4 py-2 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-2xl font-normal transition-all duration-300 text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la Lista
              </Link>
            </ClickSpark>

            <ClickSpark>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl rounded-2xl font-normal transition-all duration-300 text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Planta
              </button>
            </ClickSpark>
          </motion.div>

          {/* Plant Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center space-y-4 mb-16"
          >
            <motion.div 
              className="w-20 h-20 rounded-xl overflow-hidden shadow-lg relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <img 
                src={plant.image} 
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </motion.div>
            <div className="text-center">
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                {plant.name}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 blur-lg -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.h1>
              <motion.p 
                className="text-slate-600 dark:text-slate-400 font-mono text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block mt-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
              >
                🔗 {plant.sensor}
              </motion.p>
            </div>
          </motion.div>

          {/* Main Monitoring Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Plant Visual and Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Plant Status Card */}
              <TrueFocus color="rgba(16, 185, 129, 0.2)" opacity={0.2}>
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
                            src={plant.image} 
                            alt={plant.name}
                            className="w-full h-full object-cover"
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
                          plant.statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                          plant.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          <Activity className="w-3 h-3 mr-1" />
                          {isMonitoring ? 'Activa' : 'Inactiva'}
                        </span>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Última actualización: {isClient ? currentData.timestamp : "--:--:--"}
                          </p>
                          <div className="flex items-center justify-center space-x-2">
                            <Cpu className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                              {currentData.sensorId}
                            </p>
                          </div>
                        </div>
                        
                        {/* Control Button */}
                        <ClickSpark>
                          <button
                            onClick={() => setIsMonitoring(!isMonitoring)}
                            className={`${isMonitoring
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-emerald-500 hover:bg-emerald-600'
                            } text-white shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-normal flex items-center gap-2 text-sm`}
                          >
                            {isMonitoring ? (
                              <>
                                <Pause className="w-4 h-4" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Iniciar
                              </>
                            )}
                          </button>
                        </ClickSpark>
                      </div>
                    </div>
                  </div>
                </div>
              </TrueFocus>

              {/* Info Cards Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex justify-center"
              >
                {isClient && (
                  <StackCards
                    randomRotation={true}
                    sensitivity={150}
                    cardDimensions={{ width: 260, height: 160 }}
                    sendToBackOnClick={false}
                    cardsData={[
                      {
                        id: 1,
                        icon: <MapPin className="w-8 h-8" />,
                        title: "Ubicación",
                        content: currentData.location,
                        color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
                      },
                      {
                        id: 2,
                        icon: <Clock className="w-8 h-8" />,
                        title: "Fecha",
                        content: currentData.date,
                        color: "bg-gradient-to-br from-teal-500 to-teal-600"
                      }
                    ]}
                    animationConfig={{ stiffness: 260, damping: 20 }}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Sensors Data */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Temperature Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 ${getStatusColor(currentData.temperature, 'temperature').includes('emerald') ? 'border-emerald-200 dark:border-emerald-800' : 'border-orange-200 dark:border-orange-800'} shadow-xl rounded-xl`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(currentData.temperature, 'temperature')}`}>
                          <Thermometer className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Temperatura</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Ambiente</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <CountUpComponent
                          end={currentData.temperature}
                          suffix="°C"
                          decimals={1}
                          className="text-4xl font-bold text-slate-800 dark:text-slate-200"
                        />
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentData.temperature, 'temperature')}`}>
                          {currentData.temperature < 20 ? 'Baja' : currentData.temperature > 30 ? 'Alta' : 'Óptima'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Soil Humidity Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 ${getStatusColor(currentData.soilHumidity, 'humidity').includes('emerald') ? 'border-emerald-200 dark:border-emerald-800' : 'border-orange-200 dark:border-orange-800'} shadow-xl rounded-xl`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(currentData.soilHumidity, 'humidity')}`}>
                          <Droplets className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Humedad del Suelo</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Substrato</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <CountUpComponent
                          end={currentData.soilHumidity}
                          suffix="%"
                          className="text-4xl font-bold text-slate-800 dark:text-slate-200"
                        />
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentData.soilHumidity, 'humidity')}`}>
                          {currentData.soilHumidity < 40 ? 'Seco' : currentData.soilHumidity > 80 ? 'Húmedo' : 'Óptimo'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Air Humidity Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 ${getStatusColor(currentData.airHumidity, 'humidity').includes('emerald') ? 'border-emerald-200 dark:border-emerald-800' : 'border-orange-200 dark:border-orange-800'} shadow-xl rounded-xl`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(currentData.airHumidity, 'humidity')}`}>
                          <Wind className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Humedad del Aire</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Ambiente</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <CountUpComponent
                          end={currentData.airHumidity}
                          suffix="%"
                          className="text-4xl font-bold text-slate-800 dark:text-slate-200"
                        />
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentData.airHumidity, 'humidity')}`}>
                          {currentData.airHumidity < 40 ? 'Baja' : currentData.airHumidity > 80 ? 'Alta' : 'Óptima'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Light Level Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 ${getStatusColor(currentData.lightLevel, 'light').includes('emerald') ? 'border-emerald-200 dark:border-emerald-800' : 'border-orange-200 dark:border-orange-800'} shadow-xl rounded-xl`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(currentData.lightLevel, 'light')}`}>
                          <Sun className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Luminosidad</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Lux</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <CountUpComponent
                          end={currentData.lightLevel}
                          suffix=" lux"
                          className="text-4xl font-bold text-slate-800 dark:text-slate-200"
                        />
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentData.lightLevel, 'light')}`}>
                          {currentData.lightLevel < 200 ? 'Muy Baja' : currentData.lightLevel < 500 ? 'Baja' : currentData.lightLevel > 1500 ? 'Muy Alta' : 'Óptima'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Charts and Alerts Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  Análisis Detallado
                </motion.h2>
              </motion.div>
              
              <motion.p 
                className="text-slate-600 dark:text-slate-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Monitoreo en tiempo real de todos los parámetros
              </motion.p>
               
              {/* Decorative animated elements */}
              <motion.div
                className="flex justify-center items-center space-x-3 mt-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <motion.div 
                  className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div 
                  className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Temperature Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.15)"
                }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Floating particles */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Temperatura</h3>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{currentData.temperature.toFixed(1)}°C</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={[15, 35]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '8px'
                      }}
                      formatter={(value) => [`${value}°C`, 'Temperatura']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Humidity Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: -5,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Floating water drops */}
                <motion.div
                  className="absolute top-4 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.div
                  className="absolute top-6 right-6 w-1 h-1 bg-cyan-400 rounded-full opacity-50"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Humedad</h3>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{currentData.airHumidity.toFixed(1)}%</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={[30, 90]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '8px'
                      }}
                      formatter={(value) => [`${value}%`, 'Humedad']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Light Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(234, 179, 8, 0.15)"
                }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Floating light particles */}
                <motion.div
                  className="absolute top-4 right-4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-80"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-5 right-8 w-1 h-1 bg-orange-400 rounded-full opacity-60"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.6, 0.9, 0.6],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-7 right-5 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-40"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Luminosidad</h3>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{currentData.lightLevel.toFixed(0)} lux</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 2000]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '8px'
                      }}
                      formatter={(value) => [`${value} lux`, 'Luminosidad']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lightLevel" 
                      stroke="#eab308" 
                      strokeWidth={3}
                      dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#eab308', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </motion.div>

          {/* Alertas Section */}
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
                  {plant.alerts} activas
                </motion.span>
              </div>
              <div className="space-y-4">
                {/* Generar alertas basadas en los datos actuales */}
                {((): AlertData[] => [
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
                ])().map((alert, index) => (
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
        </div>
      </div>
    </TrueFocus>
  )
}

export default PlantDetailPage
