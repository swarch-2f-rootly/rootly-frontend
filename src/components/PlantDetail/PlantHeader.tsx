import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import ClickSpark from "../ui/ClickSpark"

interface Plant {
  id: number
  name: string
  sensor: string
  image: string
}

interface PlantHeaderProps {
  plant: Plant
}

const PlantHeader: React.FC<PlantHeaderProps> = ({ plant }) => {
  return (
    <>
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
    </>
  )
}

export default PlantHeader
