import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut, User, Cpu, Leaf } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import iconRootly from '../../assets/iconRootly.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMobileLogout = async () => {
    await handleLogout();
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isAuthenticated) navigate('/monitoring');
    else navigate('/');
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-slate-900 shadow-md fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
        <img src={iconRootly} alt="Logo" className="h-12 w-12" />
        <span className="font-extrabold text-2xl md:text-3xl" style={{ color: '#10B981' }}>Rootly</span>
      </div>
      {isAuthenticated ? (
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/monitoring" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 text-sm"><Leaf className="w-4 h-4" /> Plantas</Link>
          <Link to="/devices" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 text-sm"><Cpu className="w-4 h-4" /> Dispositivos</Link>
          <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 text-sm"><User className="w-4 h-4" /> Perfil</Link>
          <button onClick={handleLogout} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 text-sm"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      ) : (
        <div className="hidden md:flex items-center space-x-8">
          <a href="#collaboration-section" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal text-sm">Plataforma</a>
          <a href="#about-us" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal text-sm">Sobre nosotros</a>
          <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 text-sm">Iniciar sesión</Link>
          <Link to="/register" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 text-sm">Registrarse</Link>
        </div>
      )}
      {isMounted ? (
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      ) : (
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}
      {/* Menú móvil */}
      {isMenuOpen && isMounted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-lg flex flex-col items-center space-y-4 py-4 md:hidden z-50"
        >
          {isAuthenticated ? (
            <>
              <Link to="/monitoring" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><Leaf className="w-4 h-4" /> Plantas</Link>
              <Link to="/devices" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><Cpu className="w-4 h-4" /> Dispositivos</Link>
              <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><User className="w-4 h-4" /> Perfil</Link>
              <button onClick={handleMobileLogout} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm"><LogOut className="w-4 h-4" /> Logout</button>
            </>
          ) : (
            <>
              <a href="#collaboration-section" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Plataforma</a>
              <a href="#about-us" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</a>
              <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
              <Link to="/register" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
            </>
          )}
        </motion.div>
      )}
      {isMenuOpen && !isMounted && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-lg flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          {isAuthenticated ? (
            <>
              <Link to="/monitoring" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><Leaf className="w-4 h-4" /> Plantas</Link>
              <Link to="/devices" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><Cpu className="w-4 h-4" /> Dispositivos</Link>
              <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal flex items-center gap-1 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}><User className="w-4 h-4" /> Perfil</Link>
              <button onClick={handleMobileLogout} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm"><LogOut className="w-4 h-4" /> Logout</button>
            </>
          ) : (
            <>
              <a href="#collaboration-section" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Plataforma</a>
              <a href="#about-us" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-normal w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</a>
              <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
              <Link to="/register" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-3 py-1.5 rounded-lg font-normal flex items-center gap-2 w-4/5 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
