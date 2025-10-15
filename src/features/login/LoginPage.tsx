import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import LoginFormSSR from './LoginFormSSR';
import Carousel from '../../components/common/Carousel';

const LoginPage = () => {
  // Usar useState para manejar la hidratación correctamente
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Marcar como montado después de la hidratación
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <Carousel />
      <div className="relative z-10">
        {/* Renderizar versión SSR primero, luego actualizar después del montaje */}
        {!isMounted ? <LoginFormSSR /> : <LoginForm />}
      </div>
      <div className="absolute inset-0 bg-black/30 z-0" />
    </div>
  );
};

export default LoginPage;
