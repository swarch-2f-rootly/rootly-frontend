import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showRegisterMsg, setShowRegisterMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular carga
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulación: si el email es "nuevo@correo.com" muestra mensaje de registro
    const email = (e.target as any)[0].value;
    if (email === 'nuevo@correo.com') {
      setShowRegisterMsg(true);
      setIsLoading(false);
      return;
    }
    
    localStorage.setItem('isAuth', 'true');
    window.dispatchEvent(new Event('authChange'));
    navigate('/monitoring');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-96 flex flex-col gap-6 border border-emerald-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-emerald-600 mb-2">Bienvenido</h2>
        <p className="text-slate-600 text-sm">Inicia sesión en tu cuenta ROOTLY</p>
      </motion.div>
      
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all" 
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.button 
        type="submit" 
        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </motion.button>
      
      <motion.div 
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="text-slate-600 text-sm">¿Aún no estás registrado?</span>
        <Link to="/register" className="ml-2 text-emerald-600 font-semibold hover:underline transition-colors">Regístrate aquí</Link>
      </motion.div>
      
      {showRegisterMsg && (
        <motion.div 
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-xl mt-2 text-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          El correo no está registrado. <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Crea una cuenta aquí</Link>.
        </motion.div>
      )}
    </motion.form>
  );
};

export default LoginForm;
