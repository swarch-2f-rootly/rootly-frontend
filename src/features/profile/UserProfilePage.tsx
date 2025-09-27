import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Leaf } from 'lucide-react';
import StackCards from '../ui/StackCards';

const user = {
  nombre: 'Juan Pérez',
  apodo: 'Campesino123',
  email: 'juanperez@email.com',
  departamento: 'Antioquia',
};

const plantas = [
  { id: 1, nombre: 'Tomate', icon: <Leaf className="w-8 h-8 text-emerald-600" />, descripcion: 'Planta de tomate saludable.', color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
  { id: 2, nombre: 'Lechuga', icon: <Leaf className="w-8 h-8 text-teal-600" />, descripcion: 'Lechuga fresca y lista para cosechar.', color: 'bg-gradient-to-br from-teal-500 to-teal-600' },
];

const UserProfilePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
    {/* Floating Elements */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 left-10 w-16 h-16 bg-emerald-200 rounded-full opacity-40" />
      <motion.div animate={{ y: [0, 15, 0], x: [0, -8, 0], rotate: [0, -3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-40 right-20 w-12 h-12 bg-teal-200 rounded-full opacity-30" />
      <motion.div animate={{ y: [0, -25, 0], x: [0, 12, 0], rotate: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-40 left-1/4 w-20 h-20 bg-cyan-200 rounded-full opacity-30" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto pt-16 pb-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white/80 backdrop-blur-md border-2 border-emerald-200 shadow-2xl rounded-2xl p-10 mb-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
          <User className="w-14 h-14 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-emerald-700 mb-2">Perfil de Usuario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-emerald-500" />
            <span className="font-semibold text-slate-700">{user.nombre}</span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-teal-500" />
            <span className="font-semibold text-slate-700">{user.apodo}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-cyan-500" />
            <span className="font-semibold text-slate-700">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold text-slate-700">{user.departamento}</span>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-teal-600 mb-6 flex items-center gap-2"><Leaf className="w-7 h-7 text-emerald-500" />Plantas asociadas</h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {plantas.map(planta => (
            <StackCards
              key={planta.id}
              cardsData={[
                {
                  id: planta.id,
                  icon: planta.icon,
                  title: planta.nombre,
                  content: planta.descripcion,
                  color: planta.color
                }
              ]}
              cardDimensions={{ width: 220, height: 140 }}
              randomRotation={false}
              sendToBackOnClick={false}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default UserProfilePage;

