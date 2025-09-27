import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut, User, Home as HomeIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => setIsAuth(!!localStorage.getItem('isAuth'));
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const handleLogoClick = () => {
    if (isAuth) navigate('/plants');
    else navigate('/');
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-slate-900 shadow-md fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
        <img src="/src/assets/iconRootly.png" alt="Logo" className="h-12 w-12" /> 
        <span className="font-extrabold text-2xl md:text-3xl" style={{ color: '#10B981' }}>Rootly</span>
      </div>
      {isAuth ? (
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/plants" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium flex items-center gap-1"><HomeIcon className="w-5 h-5" /> Home</Link>
          <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium flex items-center gap-1"><User className="w-5 h-5" /> Perfil</Link>
          <button onClick={handleLogout} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      ) : (
        <div className="hidden md:flex items-center space-x-8">
          <a href="#platform" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium">Plataforma</a>
          <a href="#about-us" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium">Sobre nosotros</a>
          <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2">Iniciar sesión</Link>
          <Link to="/register" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2">Registrarse</Link>
        </div>
      )}
      <motion.button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>
      {/* Menú móvil */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-lg flex flex-col items-center space-y-4 py-4 md:hidden z-50"
        >
          {isAuth ? (
            <>
              <Link to="/plants" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium flex items-center gap-1 w-4/5 text-center" onClick={() => setIsMenuOpen(false)}><HomeIcon className="w-5 h-5" /> Home</Link>
              <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium flex items-center gap-1 w-4/5 text-center" onClick={() => setIsMenuOpen(false)}><User className="w-5 h-5" /> Perfil</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2 w-4/5 text-center"><LogOut className="w-5 h-5" /> Logout</button>
            </>
          ) : (
            <>
              <a href="#platform" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium w-4/5 text-center" onClick={() => setIsMenuOpen(false)}>Plataforma</a>
              <a href="#about-us" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium w-4/5 text-center" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</a>
              <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2 w-4/5 text-center" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
              <Link to="/register" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2 w-4/5 text-center" onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
