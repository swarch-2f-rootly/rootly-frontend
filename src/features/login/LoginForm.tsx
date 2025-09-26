import React from 'react';

const LoginForm: React.FC = () => (
  <form className="bg-white/80 shadow-xl rounded-xl p-8 w-80 flex flex-col gap-6 border border-emerald-100">
    <h2 className="text-2xl font-bold text-emerald-600 mb-2">Iniciar sesión</h2>
    <input type="email" placeholder="Correo electrónico" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none" />
    <input type="password" placeholder="Contraseña" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none" />
    <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-2 rounded-lg shadow hover:from-emerald-600 hover:to-teal-700 transition-all">Entrar</button>
  </form>
);

export default LoginForm;
