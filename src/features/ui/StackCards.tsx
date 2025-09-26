import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

interface CardData {
  id: number
  icon: React.ReactNode
  title: string
  content: string
  color: string
}

interface CardRotateProps {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

interface StackCardsProps {
  randomRotation?: boolean
  sensitivity?: number
  cardDimensions?: { width: number; height: number }
  cardsData?: CardData[]
  animationConfig?: { stiffness: number; damping: number }
  sendToBackOnClick?: boolean
}

export default function StackCards({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 260, height: 160 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: StackCardsProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            icon: <div className="w-8 h-8 bg-white rounded-full" />,
            title: "Ubicación",
            content: "Región Central",
            color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
          },
          {
            id: 2,
            icon: <div className="w-8 h-8 bg-white rounded-full" />,
            title: "Fecha",
            content: new Date().toLocaleDateString('es-ES'),
            color: "bg-gradient-to-br from-teal-500 to-teal-600"
          }
        ]
  )

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev]
      const index = newCards.findIndex(card => card.id === id)
      const [card] = newCards.splice(index, 1)
      newCards.unshift(card)
      return newCards
    })
  }

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="rounded-2xl overflow-hidden border-2 border-white shadow-lg"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <div className={`w-full h-full ${card.color} p-4 flex flex-col items-center justify-center text-center`}>
                <div className="mb-3">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                <p className="text-white/90 text-xs">{card.content}</p>
              </div>
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}
