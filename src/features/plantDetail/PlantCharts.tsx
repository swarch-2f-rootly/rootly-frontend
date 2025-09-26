import React from "react"
import { motion } from "framer-motion"
// @ts-ignore
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Thermometer, Droplets, Sun } from "lucide-react"

interface PlantChartsProps {
  chartData: Array<{
    time: string
    temperature: number
    humidity: number
    soilHumidity: number
    lightLevel: number
  }>
  currentData: {
    temperature: number
    airHumidity: number
    lightLevel: number
  }
}

const PlantCharts: React.FC<PlantChartsProps> = ({ chartData, currentData }) => {
  return (
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
                formatter={(value: number | string) => [`${value}°C`, 'Temperatura']}
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
                formatter={(value: number | string) => [`${value}%`, 'Humedad']}
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
                formatter={(value: number | string) => [`${value} lux`, 'Luminosidad']}
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
  )
}

export default PlantCharts
