import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../landing/Hero';
import HeroSSR from '../landing/HeroSSR';
import CollaborationSection from '../landing/CollaborationSection';
import CollaborationSectionSSR from '../landing/CollaborationSectionSSR';
import AboutUs from '../landing/AboutUs';
import AboutUsSSR from '../landing/AboutUsSSR';
import Footer from '../../components/common/Footer';
import FooterSSR from '../../components/common/FooterSSR';

const HomePage: React.FC = () => {
  // Usar useState para manejar la hidratación correctamente
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Marcar como montado después de la hidratación
    setIsMounted(true);
  }, []);
  
  return (
    <div className="App">
      {/* Floating Elements - solo después del montaje del cliente */}
      {isMounted && (
        <div className="floating-elements">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="floating-element floating-element-1 animate-float-natural organic-shape"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              x: [0, -8, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="floating-element floating-element-2 animate-float-natural"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 12, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="floating-element floating-element-3 animate-float-natural organic-shape"
          />
        </div>
      )}

      {/* Renderizar versión SSR primero, luego actualizar después del montaje */}
      {!isMounted ? <HeroSSR /> : <Hero />}
      {!isMounted ? <CollaborationSectionSSR /> : <CollaborationSection />}
      {!isMounted ? <AboutUsSSR /> : <AboutUs />}
      {!isMounted ? <FooterSSR /> : <Footer />}
    </div>
  );
};

export default HomePage;
