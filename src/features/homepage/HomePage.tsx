import { motion } from 'framer-motion';
import Hero from '../landing/Hero';
import CollaborationSection from '../landing/CollaborationSection';
import AboutUs from '../landing/AboutUs';
import Footer from '../../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      {/* Floating Elements */}
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

      <Hero />
      <CollaborationSection />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
