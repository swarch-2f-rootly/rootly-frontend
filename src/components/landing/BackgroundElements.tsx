import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Sprout, Leaf, TreePine, Wheat, Sun, CloudRain } from 'lucide-react';

const BackgroundElements: React.FC = () => {
  // Animaciones para elementos flotantes
  const floatingAnimation1 = useSpring({
    from: { y: 0, rotate: 0 },
    to: { y: -20, rotate: 10 },
    config: { duration: 4000 },
    loop: { reverse: true }
  });

  const floatingAnimation2 = useSpring({
    from: { y: 0, rotate: 0 },
    to: { y: 15, rotate: -8 },
    config: { duration: 5000 },
    loop: { reverse: true }
  });

  const floatingAnimation3 = useSpring({
    from: { y: 0, rotate: 0 },
    to: { y: -25, rotate: 15 },
    config: { duration: 6000 },
    loop: { reverse: true }
  });

  // Animación de rotación lenta
  const rotationAnimation = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 20000 },
    loop: true
  });

  // Animación de pulso
  const pulseAnimation = useSpring({
    from: { scale: 1, opacity: 0.3 },
    to: { scale: 1.2, opacity: 0.6 },
    config: { duration: 3000 },
    loop: { reverse: true }
  });

  return (
    <div className="background-elements">
      {/* Elementos decorativos principales */}
      <animated.div 
        style={floatingAnimation1}
        className="bg-element bg-element-1"
      >
        <Sprout size={50} />
      </animated.div>

      <animated.div 
        style={floatingAnimation2}
        className="bg-element bg-element-2"
      >
        <Leaf size={40} />
      </animated.div>

      <animated.div 
        style={floatingAnimation3}
        className="bg-element bg-element-3"
      >
        <TreePine size={45} />
      </animated.div>

      <animated.div 
        style={rotationAnimation}
        className="bg-element bg-element-4"
      >
        <Sun size={60} />
      </animated.div>

      <animated.div 
        style={pulseAnimation}
        className="bg-element bg-element-5"
      >
        <Wheat size={35} />
      </animated.div>

      <animated.div 
        style={floatingAnimation1}
        className="bg-element bg-element-6"
      >
        <CloudRain size={40} />
      </animated.div>

      {/* Elementos adicionales con emojis */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="bg-element bg-element-7"
      >
        🌱
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="bg-element bg-element-8"
      >
        🌾
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 12, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="bg-element bg-element-9"
      >
        🌿
      </motion.div>

      {/* Líneas decorativas */}
      <motion.div
        animate={{
          scaleX: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="decorative-line decorative-line-1"
      />

      <motion.div
        animate={{
          scaleX: [1, 0.8, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="decorative-line decorative-line-2"
      />

      {/* Círculos decorativos */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="decorative-circle decorative-circle-1"
      />

      <motion.div
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.08, 0.2, 0.08]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="decorative-circle decorative-circle-2"
      />
    </div>
  );
};

export default BackgroundElements;
