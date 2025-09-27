import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showRegisterMsg, setShowRegisterMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: si el email es "nuevo@correo.com" muestra mensaje de registro
    const email = (e.target as any)[0].value;
    if (email === 'nuevo@correo.com') {
      setShowRegisterMsg(true);
      return;
    }
    localStorage.setItem('isAuth', 'true');
    window.dispatchEvent(new Event('authChange'));
    navigate('/plants');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 shadow-xl rounded-xl p-8 w-80 flex flex-col gap-6 border border-emerald-100">
      <h2 className="text-2xl font-bold text-emerald-600 mb-2">Iniciar sesión</h2>
      <input type="email" placeholder="Correo electrónico" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none" />
      <input type="password" placeholder="Contraseña" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none" />
      <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-2 rounded-lg shadow hover:from-emerald-600 hover:to-teal-700 transition-all">Entrar</button>
      <div className="text-center mt-2">
        <span className="text-slate-600 text-sm">¿Aún no estás registrado?</span>
        <Link to="/register" className="ml-2 text-emerald-600 font-semibold hover:underline">Regístrate aquí</Link>
      </div>
      {showRegisterMsg && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded mt-2 text-sm">
          El correo no está registrado. <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Crea una cuenta aquí</Link>.
        </div>
      )}
    </form>
  );
};

export default LoginForm;
