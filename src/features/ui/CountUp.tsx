import React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CountUpProps {
  end: number
  suffix?: string
  decimals?: number
  className?: string
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  suffix = "", 
  decimals = 0, 
  className = "" 
}) => {
  const [displayValue, setDisplayValue] = React.useState(0)
  const count = useMotionValue(0)
  const springCount = useSpring(count, { duration: 2000 })

  React.useEffect(() => {
    springCount.set(end)
  }, [springCount, end])

  React.useEffect(() => {
    const unsubscribe = springCount.on("change", (latest: number) => {
      setDisplayValue(Number(latest))
    })
    return unsubscribe
  }, [springCount])

  return (
    <motion.span className={className}>
      {displayValue.toFixed(decimals)}{suffix}
    </motion.span>
  )
}

export default CountUp
