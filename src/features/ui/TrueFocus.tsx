import React from "react"
import { motion } from "framer-motion"

interface TrueFocusProps {
  children: React.ReactNode
  color?: string
  size?: number
  opacity?: number
  blur?: number
}

const TrueFocus: React.FC<TrueFocusProps> = ({ 
  children, 
  color = "#10B981", 
  size = 200, 
  opacity = 0.1, 
  blur = 40 
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

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
  )
}

export default TrueFocus
