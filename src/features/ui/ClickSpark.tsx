import React from "react"
import { motion } from "framer-motion"

interface ClickSparkProps {
  children: React.ReactNode
  color?: string
  size?: number
  count?: number
  duration?: number
}

const ClickSpark: React.FC<ClickSparkProps> = ({ 
  children, 
  color = "#10B981", 
  size = 20, 
  count = 8, 
  duration = 600 
}) => {
  const [sparks, setSparks] = React.useState<Array<{ id: number; x: number; y: number; angle: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const newSparks = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      angle: (360 / count) * i,
    }))
    
    setSparks(newSparks)
    
    setTimeout(() => {
      setSparks([])
    }, duration)
  }

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
  )
}

export default ClickSpark
