import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export default function CountUp({ 
  end, 
  suffix = '', 
  decimals = 0, 
  duration = 2,
  className = ''
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const count = useMotionValue(0)
  const springCount = useSpring(count, { duration: duration * 1000 })

  useEffect(() => {
    springCount.set(end)
  }, [springCount, end])

  useEffect(() => {
    const unsubscribe = springCount.on("change", (latest) => {
      setDisplayValue(Number(latest))
    })
    return unsubscribe
  }, [springCount])

  return (
    <motion.span 
      className={className}
    >
      {displayValue.toFixed(decimals)}{suffix}
    </motion.span>
  )
}
