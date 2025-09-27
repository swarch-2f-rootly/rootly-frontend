import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import StackCards from '../ui/StackCards'
import { getPlantById } from '../../data/plantsMock'
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
  Activity,
  Sun,
  Image as ImageIcon
} from "lucide-react"

// Importar componentes separados
import ClickSpark from '../ui/ClickSpark'
import TrueFocus from '../ui/TrueFocus'
import CountUp from '../ui/CountUp'
import PlantHeader from './PlantHeader'
import PlantCharts from './PlantCharts'
import PlantAlerts from './PlantAlerts'

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

const PlantDetailPage: React.FC = () => {
  const { plantId } = useParams<{ plantId: string }>()
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [photos, setPhotos] = useState<Array<{ url: string; date: string }>>([]);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos(prev => [
          ...prev,
          { url: ev.target?.result as string, date: new Date().toLocaleString('es-CO') }
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

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
          {/* Plant Header */}
          <PlantHeader plant={plant} />
          {/* Botón para subir foto 
           <div className="flex justify-end mb-4">
            <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow hover:from-emerald-600 hover:to-teal-700 transition-all">
              <ImageIcon className="w-5 h-5" />
              Agregar foto de la planta
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>*/}

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
                        <CountUp
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
                        <CountUp
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
                        <CountUp
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
                        <CountUp
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
          <PlantCharts chartData={chartData} currentData={currentData} />
          <PlantAlerts plant={plant} currentData={currentData} />

          {/* Sección Timeline de evolución de la planta 
          {photos.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-2"><Clock className="w-6 h-6 text-teal-500" /> Evolución de la planta</h3>
              <div className="relative border-l-4 border-emerald-200 ml-6">
                {photos.map((photo, idx) => (
                  <div key={idx} className="mb-10 ml-6 flex items-center group">
                    <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg border-4 border-white">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </span>
                    <div className="bg-white/80 backdrop-blur-md border-2 border-emerald-100 rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center gap-4 w-full hover:scale-105 transition-transform duration-300">
                      <img src={photo.url} alt="Evolución planta" className="w-32 h-32 object-cover rounded-lg border border-emerald-200 shadow" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-slate-500 mb-1"><Clock className="inline w-4 h-4 mr-1 text-emerald-400" />{photo.date}</span>
                        <span className="text-emerald-700 font-semibold">Foto subida</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}*/}
        </div>
      </div>
    </TrueFocus>
  )
}

export default PlantDetailPage
