"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

const RealTimeMonitoring: React.FC = () => {
  const [chartData] = useState([
    { value: 65 },
    { value: 45 },
    { value: 78 },
    { value: 52 },
    { value: 38 },
    { value: 85 },
    { value: 42 },
    { value: 68 },
    { value: 55 },
    { value: 72 },
  ])

  return (
    <div className="real-time-monitoring">
      <div className="monitoring-header">
        <h3 className="monitoring-title">Monitoreo en Tiempo Real</h3>
        <div className="live-badge">
          <div className="live-dot"></div>
          <span>En Vivo</span>
        </div>
      </div>

      <div className="chart-area">
        <div className="chart-container">
          {chartData.map((item, index) => (
            <motion.div
              key={index}
              className="chart-bar-rounded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${item.value}%`, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            />
          ))}
        </div>
      </div>

      <div className="status-badges">
        <div className="badge-row">
          <div className="status-badge-modern">
            <div className="badge-icon-modern">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <span>Conectado</span>
          </div>
          <div className="status-badge-modern">
            <div className="badge-icon-modern">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L9 5L17 9L9 13L1 9Z" fill="currentColor" />
                <path d="M17 13L9 17L1 13" fill="currentColor" />
                <path d="M17 17L9 21L1 17" fill="currentColor" />
              </svg>
            </div>
            <span>En Línea</span>
          </div>
        </div>
        <div className="badge-row">
          <div className="status-badge-modern">
            <div className="badge-icon-modern">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span>Optimizado</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeMonitoring
