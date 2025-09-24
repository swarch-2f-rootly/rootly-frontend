// Mapeo de imágenes de plantas desde Unsplash
export const plantImages = {
  'Tomate': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  'Lechuga': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  'Pimiento': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80'
}

export interface Plant {
  id: number
  name: string
  type: string
  sensor: string
  score: number
  change: string
  status: string
  statusColor: string
  temperature: number
  humidity: number
  lightLevel: number
  soilHumidity: number
  location: string
  lastUpdate: string
  image: string
  alerts: number
}

// Datos mock de plantas
export const plantsData: Plant[] = [
  {
    id: 1,
    name: "Tomate Cherry #1",
    type: "Tomate",
    sensor: "ESP8266-001",
    score: 94.2,
    change: "+5.2%",
    status: "Saludable",
    statusColor: "emerald",
    temperature: 24.5,
    humidity: 65,
    lightLevel: 850,
    soilHumidity: 72,
    location: "Invernadero A",
    lastUpdate: "Hace 2 min",
    image: plantImages['Tomate'],
    alerts: 0
  },
  {
    id: 2,
    name: "Lechuga Romana #3",
    type: "Lechuga",
    sensor: "ESP8266-002",
    score: 87.8,
    change: "-2.1%",
    status: "Atento",
    statusColor: "yellow",
    temperature: 22.1,
    humidity: 68,
    lightLevel: 620,
    soilHumidity: 35, // Cambiado para generar alerta de suelo seco
    location: "Invernadero B",
    lastUpdate: "Hace 5 min",
    image: plantImages['Lechuga'],
    alerts: 1
  },
  {
    id: 3,
    name: "Pimiento Rojo #2",
    type: "Pimiento",
    sensor: "ESP8266-003",
    score: 91.5,
    change: "+1.8%",
    status: "Saludable",
    statusColor: "emerald",
    temperature: 25.3,
    humidity: 62,
    lightLevel: 920,
    soilHumidity: 75,
    location: "Invernadero A",
    lastUpdate: "Hace 1 min",
    image: plantImages['Pimiento'],
    alerts: 0
  },
  {
    id: 4,
    name: "Tomate Roma #4",
    type: "Tomate",
    sensor: "ESP8266-004",
    score: 76.3,
    change: "-8.5%",
    status: "Crítico",
    statusColor: "red",
    temperature: 32.7, // Alta temperatura
    humidity: 38, // Baja humedad
    lightLevel: 1600, // Alta luminosidad
    soilHumidity: 28, // Suelo muy seco
    location: "Exterior",
    lastUpdate: "Hace 8 min",
    image: plantImages['Tomate'],
    alerts: 4
  }
]

// Función para obtener una planta por ID
export const getPlantById = (id: number): Plant | undefined => {
  return plantsData.find(plant => plant.id === id)
}

// Función para obtener todas las plantas
export const getAllPlants = (): Plant[] => {
  return plantsData
}
