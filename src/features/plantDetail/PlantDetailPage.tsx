import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { usePlant, useDeletePlant, usePlantDevices } from '../plants/api/plantApi'
import { usePlantChartData } from '../../lib/graphql/hooks'
import { useRealtimeMonitoring, useLatestMeasurement } from '../../lib/graphql/realtime-queries'
import {
  Droplets,
  Thermometer,
  Wind,
  Sun,
} from "lucide-react"

// Importar componentes separados
import TrueFocus from '../ui/TrueFocus'
import ConfirmModal from '../../components/ui/ConfirmModal'
import PlantCharts from './PlantCharts'
// import PlantAlerts from './PlantAlerts' // Commented for future use
import PlantDevicesManager from '../devices/components/PlantDevicesManager'
import PlantStatusCard from "./components/PlantStatusCard"
import SensorDataCard from "./components/SensorDataCard"
import Header from "./components/Header"
import LoadingIndicator, { PlantNotFound } from "./components/LoadingIndicator"
import ErrorDisplay from "./components/ErrorDisplay"
import MetricDetailsModal from './components/MetricDetailsModal'
import PlantInfoCard from './components/PlantInfoCard'

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
  const navigate = useNavigate()
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  // Estado para modales de métricas
  const [openModal, setOpenModal] = useState<'temperature' | 'air_humidity' | 'soil_humidity' | 'light_intensity' | null>(null)

  // Obtener la planta desde la API
  const { data: plant, isLoading, error } = usePlant(plantId || '')
  const { data: plantDevices = [] } = usePlantDevices(plantId || '')
  const deletePlantMutation = useDeletePlant()

  // Buscar el microcontrolador asignado a esta planta
  const microcontroller = plantDevices.find(device => device.category === 'microcontroller')
  const controllerId = microcontroller?.name || '' // Usar el nombre del microcontrolador como controllerId

  // Obtener datos analíticos desde GraphQL usando el controllerId del microcontrolador
  const { 
    currentData: analyticsData, 
    isLoading: analyticsLoading, 
    error: analyticsError, 
    hasData,
    allMetrics,
    getMetricAverage,
    hasTemperature,
    hasHumidity,
    hasSoilHumidity,
    hasLight
  } = usePlantChartData(controllerId)

  // Hook para datos históricos y gráficas (siempre habilitado si hay controllerId para mostrar gráficas)
  const {
    chartData: historicalChartData,
  } = useRealtimeMonitoring(
    controllerId, 
    ['temperature', 'air_humidity', 'soil_humidity', 'light_intensity'], 
    !!controllerId, // Habilitado si hay controllerId
    24 // Últimas 24 horas
  )

  // Hook para monitoreo en tiempo real - UNA llamada con polling cada 3 segundos
  // El backend devuelve la última medición disponible (cualquier tipo de métrica)
  const { 
    data: latestMeasurementData, 
    isLoading: isLoadingLatest,
    error: latestError 
  } = useLatestMeasurement(
    controllerId,
    isMonitoring && !!controllerId,
    3000 // Polling cada 3 segundos
  )

  // Estado para acumular las métricas recibidas del polling
  const [realtimeMetrics, setRealtimeMetrics] = useState<{
    temperature?: number
    airHumidity?: number
    soilHumidity?: number
    lightLevel?: number
  }>({})

  const handleDeletePlant = async () => {
    if (!plant) return

    try {
      await deletePlantMutation.mutateAsync(plant.id)
      navigate('/monitoring')
    } catch (error) {
      console.error('Error eliminando planta:', error)
      alert('Error al eliminar la planta. Por favor, intenta de nuevo.')
    }
  }

  const hasMicrocontroller = plantDevices.some(device => device.category === 'microcontroller')
  const hasSensor = plantDevices.some(device => device.category === 'sensor')

  // Determinar el mensaje de estado del sensor usando useMemo para evitar recreación
  const sensorStatus = useMemo(() => {
    if (controllerId) {
      // En modo monitoreo, mostrar el estado de la última medición
      if (isMonitoring) {
        if (latestMeasurementData?.getLatestMeasurement?.measurement) {
          const status = latestMeasurementData.getLatestMeasurement.status
          const ageMinutes = latestMeasurementData.getLatestMeasurement.dataAgeMinutes
          const metricName = latestMeasurementData.getLatestMeasurement.measurement.metricName
          return `📡 ${controllerId} - ${status} (${metricName}, hace ${ageMinutes} min)`
        }
        if (latestError) {
          return `⚠️ ${controllerId} - Error obteniendo datos`
        }
        if (isLoadingLatest) {
          return `🔄 ${controllerId} - Consultando...`
        }
        return `⚠️ ${controllerId} - Sin datos disponibles`
      }
      
      // En modo normal, mostrar estado de datos analíticos
      if (hasData || hasTemperature || hasHumidity || hasSoilHumidity || hasLight) {
        return `✅ Microcontrolador: ${controllerId} - Datos obtenidos`;
      }
      return `⚠️ Microcontrolador: ${controllerId} - Esperando datos...`;
    }
    return "❌ Sin microcontrolador asignado";
  }, [
    controllerId, 
    hasData, 
    hasTemperature, 
    hasHumidity, 
    hasSoilHumidity, 
    hasLight,
    isMonitoring,
    latestMeasurementData,
    latestError,
    isLoadingLatest
  ]);

  const [currentData, setCurrentData] = useState<PlantData>({
    soilHumidity: 0,
    airHumidity: 0,
    temperature: 0,
    lightLevel: 0,
    timestamp: "",
    date: "",
    location: "Ubicación no disponible",
    sensorId: "Inicializando..."
  })

  // Actualizar sensorId cuando cambie el estado del sensor
  useEffect(() => {
    setCurrentData(prev => ({
      ...prev,
      sensorId: sensorStatus
    }));
  }, [sensorStatus]);

  // Actualizar con datos analíticos (solo valores primitivos como dependencias)
  useEffect(() => {
    if (!isMonitoring && analyticsData) {
      setCurrentData(prev => ({
        ...prev,
        temperature: analyticsData.temperature || prev.temperature,
        airHumidity: analyticsData.airHumidity || prev.airHumidity,
        soilHumidity: analyticsData.temperature || prev.soilHumidity,
        lightLevel: analyticsData.lightLevel || prev.lightLevel,
      }))
    }
  }, [
    isMonitoring,
    analyticsData?.temperature,
    analyticsData?.airHumidity,
    analyticsData?.lightLevel
  ])

  // Limpiar métricas acumuladas cuando se detiene el monitoreo
  useEffect(() => {
    if (!isMonitoring) {
      setRealtimeMetrics({})
    }
  }, [isMonitoring])

  // Acumular métricas recibidas del polling según el metricName
  useEffect(() => {
    if (!isMonitoring || !latestMeasurementData?.getLatestMeasurement?.measurement) return

    const measurement = latestMeasurementData.getLatestMeasurement.measurement
    
    // Actualizar tanto el estado acumulativo como currentData
    setRealtimeMetrics(prev => {
      const updates = { ...prev }
      
      switch (measurement.metricName) {
        case 'temperature':
          updates.temperature = measurement.value
          break
        case 'air_humidity':
          updates.airHumidity = measurement.value
          break
        case 'soil_humidity':
          updates.soilHumidity = measurement.value
          break
        case 'light_intensity':
          updates.lightLevel = measurement.value
          break
      }
      
      return updates
    })

    // Actualizar currentData directamente aquí
    setCurrentData(prev => {
      const updates: Partial<PlantData> = {
        timestamp: new Date().toLocaleTimeString('es-ES'),
        date: new Date().toLocaleDateString('es-ES')
      }

      switch (measurement.metricName) {
        case 'temperature':
          updates.temperature = measurement.value
          break
        case 'air_humidity':
          updates.airHumidity = measurement.value
          break
        case 'soil_humidity':
          updates.soilHumidity = measurement.value
          break
        case 'light_intensity':
          updates.lightLevel = measurement.value
          break
      }

      return { ...prev, ...updates }
    })
  }, [
    isMonitoring,
    latestMeasurementData?.getLatestMeasurement?.measurement?.value,
    latestMeasurementData?.getLatestMeasurement?.measurement?.metricName
  ])

  useEffect(() => {
    setIsClient(true)
    const now = new Date()
    setCurrentData(prev => ({
      ...prev,
      timestamp: now.toLocaleTimeString('es-ES'),
      date: now.toLocaleDateString('es-ES')
    }))
  }, [])

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

  if (isLoading) {
      return <LoadingIndicator />
  }

  if (error) {
      return <ErrorDisplay />
  }

  if (!plant) {
      return <PlantNotFound />
  }

  return (
    <TrueFocus color="#10B981" size={200} opacity={0.1} blur={40}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 p-6 pt-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <Header 
            hasMicrocontroller={hasMicrocontroller} 
            onDelete={() => setShowDeleteModal(true)}
          />

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              <PlantStatusCard 
                plant={plant}
                isMonitoring={isMonitoring}
                hasMicrocontroller={hasMicrocontroller}
                currentData={currentData}
                isClient={isClient}
                onToggleMonitoring={() => setIsMonitoring(!isMonitoring)}
              />
              
              <PlantInfoCard plant={plant} isClient={isClient} />
            </motion.div>

            {(hasMicrocontroller && hasSensor) || hasData || isMonitoring ? (
            <div className="lg:col-span-2 space-y-4">
              <SensorDataCard
                icon={<Thermometer className="w-6 h-6" />}
                title="Temperatura"
                subtitle="Ambiente"
                value={isMonitoring ? currentData.temperature : (getMetricAverage('temperature') || currentData.temperature)}
                unit="°C"
                colorClass={getStatusColor(currentData.temperature, 'temperature')}
                delay={0.8}
                hasData={isMonitoring ? (realtimeMetrics.temperature !== undefined) : hasTemperature}
                onClick={() => setOpenModal('temperature')}
              />
              <SensorDataCard
                icon={<Droplets className="w-6 h-6" />}
                title="Humedad del Suelo"
                subtitle="Substrato"
                value={isMonitoring ? currentData.soilHumidity : (getMetricAverage('soil_humidity') || currentData.soilHumidity)}
                unit="%"
                colorClass={getStatusColor(currentData.soilHumidity, 'humidity')}
                delay={1.0}
                hasData={isMonitoring ? (realtimeMetrics.soilHumidity !== undefined) : hasSoilHumidity}
                onClick={() => setOpenModal('soil_humidity')}
              />
              <SensorDataCard
                icon={<Wind className="w-6 h-6" />}
                title="Humedad del Aire"
                subtitle="Ambiente"
                value={isMonitoring ? currentData.airHumidity : (getMetricAverage('air_humidity') || currentData.airHumidity)}
                unit="%"
                colorClass={getStatusColor(currentData.airHumidity, 'humidity')}
                delay={1.2}
                hasData={isMonitoring ? (realtimeMetrics.airHumidity !== undefined) : hasHumidity}
                onClick={() => setOpenModal('air_humidity')}
              />
              <SensorDataCard
                icon={<Sun className="w-6 h-6" />}
                title="Luminosidad"
                subtitle="Lux"
                value={isMonitoring ? currentData.lightLevel : (getMetricAverage('light_intensity') || currentData.lightLevel)}
                unit=" lux"
                colorClass={getStatusColor(currentData.lightLevel, 'light')}
                delay={1.4}
                hasData={isMonitoring ? (realtimeMetrics.lightLevel !== undefined) : hasLight}
                onClick={() => setOpenModal('light_intensity')}
              />
            </div>
            ) : (
                <div className="lg:col-span-2 flex items-center justify-center">
                    <div className="text-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                        <p className="text-slate-600 dark:text-slate-400">No hay datos para mostrar.</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Asigna un sensor para empezar a monitorear.</p>
                    </div>
                </div>
            )}
          </div>
          
          {(hasMicrocontroller && hasSensor) || hasData ? (
            <>
              <PlantCharts
                temperatureData={historicalChartData?.temperature || []}
                humidityData={historicalChartData?.humidity || []}
                soilHumidityData={historicalChartData?.soilHumidity || []}
                lightData={historicalChartData?.light || []}
                currentData={currentData}
                isLoading={analyticsLoading}
                error={analyticsError as Error | undefined}
              />
              {/* PlantAlerts component - Commented out for future use */}
              {/* <PlantAlerts plant={plant} currentData={currentData} /> */}
            </>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <PlantDevicesManager plantId={plantId || ''} plantName={plant?.name || 'Planta'} />
          </motion.div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          handleDeletePlant()
          setShowDeleteModal(false)
        }}
        title="Eliminar Planta"
        message={`¿Estás seguro de que quieres eliminar la planta "${plant?.name}"? Esta acción no se puede deshacer y eliminará todos los datos asociados.`}
        confirmText="Eliminar Planta"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={deletePlantMutation.isPending}
      />

      {/* Modales de Métricas */}
      <MetricDetailsModal
        isOpen={openModal === 'temperature'}
        onClose={() => setOpenModal(null)}
        metricType="temperature"
        metrics={allMetrics as any}
        title="Temperatura"
        icon={<Thermometer className="w-8 h-8" />}
      />
      
      <MetricDetailsModal
        isOpen={openModal === 'air_humidity'}
        onClose={() => setOpenModal(null)}
        metricType="air_humidity"
        metrics={allMetrics as any}
        title="Humedad del Aire"
        icon={<Wind className="w-8 h-8" />}
      />
      
      <MetricDetailsModal
        isOpen={openModal === 'soil_humidity'}
        onClose={() => setOpenModal(null)}
        metricType="soil_humidity"
        metrics={allMetrics as any}
        title="Humedad del Suelo"
        icon={<Droplets className="w-8 h-8" />}
      />
      
      <MetricDetailsModal
        isOpen={openModal === 'light_intensity'}
        onClose={() => setOpenModal(null)}
        metricType="light_intensity"
        metrics={allMetrics as any}
        title="Luminosidad"
        icon={<Sun className="w-8 h-8" />}
      />
    </TrueFocus>
  )
}

export default PlantDetailPage
