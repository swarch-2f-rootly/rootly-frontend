import React from 'react';
import { useNavigate } from 'react-router-dom';

const departamentos = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
];

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro real
    localStorage.setItem('isAuth', 'true');
    navigate('/plants'); // Redirige a la página principal de plantas
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 shadow-xl rounded-xl p-8 w-90 flex flex-col gap-6 border border-teal-100">
      <h2 className="text-2xl font-bold text-teal-600 mb-2">Registrarse</h2>
      <input type="text" placeholder="Nombre completo" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
      <input type="text" placeholder="Nombre de usuario" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
      <input type="email" placeholder="Correo electrónico" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
      <input type="password" placeholder="Contraseña" className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none" />
      <select className="px-4 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none bg-white text-slate-700">
        <option value="">Selecciona un departamento</option>
        {departamentos.map(dep => (
          <option key={dep} value={dep}>{dep}</option>
        ))}
      </select>
      <button type="submit" className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow hover:from-teal-600 hover:to-emerald-700 transition-all">Crear cuenta</button>
    </form>
  );
};

export default RegisterForm;