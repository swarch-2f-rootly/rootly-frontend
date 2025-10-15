import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useRegisterMutation, type RegisterRequest } from './api';

// Versión simplificada del RegisterForm para SSR
const RegisterFormSSR: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const registerMutation = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      // Navigate to login page on success with success message
      navigate('/login', { state: { message: 'Cuenta creada exitosamente. Ahora puedes iniciar sesión.' } });
    } catch (err: any) {
      // Handle different error types
      if (err.response?.status === 400) {
        setError('El email ya está registrado. Intenta con otro email.');
      } else if (err.response?.status === 422) {
        setError('Datos inválidos. Verifica la información ingresada.');
      } else {
        setError('Error al crear la cuenta. Inténtalo de nuevo.');
      }
    }
  };

  const handleInputChange = (field: keyof RegisterRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-96 flex flex-col gap-6 border border-teal-100"
    >
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-teal-600 mb-2">Únete a ROOTLY</h2>
        <p className="text-slate-600 text-sm">Crea tu cuenta y comienza a monitorear</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={formData.first_name}
              onChange={handleInputChange('first_name')}
              placeholder="Tu nombre"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Apellido</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={formData.last_name}
              onChange={handleInputChange('last_name')}
              placeholder="Tu apellido"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="tu@email.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        type="submit"
        className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Creando cuenta...
          </>
        ) : (
          'Crear cuenta'
        )}
      </button>
      
      <div className="text-center mt-4">
        <span className="text-slate-600 text-sm">¿Ya tienes una cuenta?</span>
        <Link to="/login" className="ml-2 text-teal-600 font-semibold hover:underline transition-colors">Inicia sesión aquí</Link>
      </div>
    </form>
  );
};

export default RegisterFormSSR;

