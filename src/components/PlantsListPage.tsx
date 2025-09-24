import React, { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getAllPlants } from '../data/plantsMock'
import {
  ArrowLeft,
  Plus,
  Leaf,
  Search,
  Thermometer,
  Droplets,
  Sun,
  X
} from "lucide-react"

const statusConfig = {
  Saludable: { label: "Saludable", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  Atento: { label: "Atento", color: "bg-amber-100 text-amber-800 border-amber-200" },
  Crítico: { label: "Crítico", color: "bg-red-100 text-red-800 border-red-200" },
}

const PlantsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Todos los estados")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  
  const plantsData = getAllPlants()
  const [filteredPlants, setFilteredPlants] = useState(plantsData)

  const plantStatuses = ["Todos los estados", "Saludable", "Atento", "Crítico"]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    filterPlants(value, selectedStatus)
  }

  const toggleSearch = () => {
    if (isSearchExpanded) {
      // Si se está cerrando, iniciar animación de cierre
      setIsClosing(true)
      setTimeout(() => {
        setIsSearchExpanded(false)
        setIsClosing(false)
      }, 800) // Duración de la animación de cierre
    } else {
      // Si se está expandiendo, enfocar el input después de la animación
      setIsSearchExpanded(true)
      setTimeout(() => {
        const input = document.getElementById('search-input')
        if (input) input.focus()
      }, 600)
    }
  }

  const filterPlants = (search: string, status: string) => {
    let filtered = plantsData

    if (search) {
      filtered = filtered.filter(
        (plant) =>
          plant.name.toLowerCase().includes(search.toLowerCase()) ||
          plant.sensor.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "Todos los estados") {
      filtered = filtered.filter((plant) => plant.status === status)
    }

    setFilteredPlants(filtered)
  }

  const totalPlants = plantsData.length
  const healthyPlants = plantsData.filter(p => p.status === "Saludable").length
  const alertPlants = plantsData.filter(p => p.status === "Atento").length
  const criticalPlants = plantsData.filter(p => p.status === "Crítico").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6 pb-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 hover:bg-gray-50 rounded-2xl font-normal transition-all duration-300 text-sm shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Plantas Monitoreadas
            </h1>
          </div>

          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl rounded-2xl font-normal transition-all duration-300 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Planta
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-24"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs font-medium">Total Plantas</p>
                <p className="text-2xl font-bold">{totalPlants}</p>
              </div>
              <Leaf className="h-6 w-6 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs font-medium">Saludables</p>
                <p className="text-2xl font-bold">{healthyPlants}</p>
              </div>
              <div className="p-1.5 bg-green-400/30 rounded-full">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-xs font-medium">En Alerta</p>
                <p className="text-2xl font-bold">{alertPlants}</p>
              </div>
              <div className="p-1.5 bg-amber-400/30 rounded-full">
                <div className="w-3 h-3 bg-amber-200 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 shadow-lg rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs font-medium">Críticas</p>
                <p className="text-2xl font-bold">{criticalPlants}</p>
              </div>
              <div className="p-1.5 bg-red-400/30 rounded-full">
                <div className="w-3 h-3 bg-red-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center w-full"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}
        >
          <motion.div
            onClick={!isSearchExpanded ? toggleSearch : undefined}
            whileHover={!isSearchExpanded ? { scale: 1.1 } : {}}
            whileTap={!isSearchExpanded ? { scale: 0.95 } : {}}
            initial={{ width: 60, height: 60, opacity: 0, scale: 0.8 }}
            animate={
              isClosing ? 
                { width: 60, height: 60, opacity: 1, scale: 1 } : 
                isSearchExpanded ?
                { width: "98vw", height: 80, opacity: 1, scale: 1 } :
                { width: 60, height: 60, opacity: 1, scale: 1 }
            }
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.6 },
              scale: { duration: 0.7 }
            }}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-full relative cursor-pointer flex items-center justify-center max-w-2xl"
            style={{
              minHeight: isSearchExpanded ? '80px' : '60px',
              padding: isSearchExpanded ? '16px' : '16px'
            }}
          >
            {/* Icono de búsqueda - siempre visible */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: isSearchExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="h-6 w-6 text-emerald-600" />
            </motion.div>

            {/* Contenido expandido - solo visible cuando está expandido */}
            {isSearchExpanded && (
              <>
                {/* Botón de cerrar */}
                <motion.button
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isClosing ? 
                    { opacity: 0, scale: 0.8 } : 
                    { opacity: 1, scale: 1 }
                  }
                  transition={{ 
                    delay: isClosing ? 0 : 0.4, 
                    duration: 0.3, 
                    ease: "easeOut" 
                  }}
                  className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 z-10"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </motion.button>
                
                <motion.div 
                  className="flex flex-col xl:flex-row gap-3 items-center w-full px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isClosing ? 
                    { opacity: 0, y: 20 } : 
                    { opacity: 1, y: 0 }
                  }
                  transition={{ 
                    delay: isClosing ? 0 : 0.5, 
                    duration: 0.4, 
                    ease: "easeOut" 
                  }}
                >
                <div className="relative flex-1/2 w-full group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200" />
                    <input
                      id="search-input"
                      placeholder="🔍 Buscar por nombre o sensor..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-12 pr-6 py-2 text-sm bg-gradient-to-r from-white to-emerald-50/30 border-2 border-emerald-200/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 placeholder:text-emerald-600/60 font-medium"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Filter Dropdown */}
                <div className="flex justify-center w-full xl:w-auto">
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value)
                      filterPlants(searchTerm, e.target.value)
                    }}
                    className="xl:min-w-[140px] bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-emerald-500 rounded-xl px-3 py-2 text-gray-700 shadow-sm transition-all duration-200 text-sm"
                  >
                    {plantStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                </motion.div>

              </>
            )}
          </motion.div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16"
        >
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden"
            >
              <Link to={`/monitoring/${plant.id}`} className="block">
                <div className="relative">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-36 object-cover" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[plant.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {plant.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-lg font-bold text-emerald-600">{plant.score}</span>
                    <span
                      className={`text-xs ${plant.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}
                    >
                      ({plant.change})
                    </span>
                    {plant.alerts > 0 && (
                      <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full ml-1">
                        {plant.alerts}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-emerald-600">{plant.name}</h3>
                      <p className="text-xs text-gray-600">{plant.sensor}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-orange-500" />
                        <span className="text-xs">{plant.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs">{plant.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sun className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{plant.lightLevel} lux</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-cyan-500" />
                        <span className="text-xs">{plant.soilHumidity}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200/30">
                      <span className="text-xs text-gray-600">{plant.location}</span>
                      <span className="text-xs text-gray-600">{plant.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>

        {filteredPlants.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-12 text-center"
          >
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron plantas</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PlantsListPage