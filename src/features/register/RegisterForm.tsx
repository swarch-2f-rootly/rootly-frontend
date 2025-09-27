import React from 'react';

const RegisterForm: React.FC = () => (
  <form className="bg-white/80 shadow-xl rounded-xl p-8 w-80 flex flex-col gap-6 border border-teal-100">
    <h2 className="text-2xl font-bold text-teal-600 mb-2">Registrarse</h2>
    <input type="text" placeholder="Nombre completo" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
    <input type="email" placeholder="Correo electrónico" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
    <input type="password" placeholder="Contraseña" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
    <button type="submit" className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow hover:from-teal-600 hover:to-emerald-700 transition-all">Crear cuenta</button>
  </form>
);

export default RegisterForm;
