import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Leaf, Settings, Edit } from 'lucide-react';
import StackCards from '../ui/StackCards';

const user = {
  nombre: 'Juan Pérez',
  apodo: 'Campesino123',
  email: 'juanperez@email.com',
  departamento: 'Antioquia',
  plantsCount: 2,
  joinDate: 'Enero 2024'
};

const plantas = [
  { id: 1, nombre: 'Tomate', icon: <Leaf className="w-8 h-8 text-emerald-600" />, descripcion: 'Planta de tomate saludable.', color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
  { id: 2, nombre: 'Lechuga', icon: <Leaf className="w-8 h-8 text-teal-600" />, descripcion: 'Lechuga fresca y lista para cosechar.', color: 'bg-gradient-to-br from-teal-500 to-teal-600' },
];


const UserProfilePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto pt-24 pb-8 px-4">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="bg-white/90 backdrop-blur-md border-0 shadow-lg rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="h-32 w-32 border-4 border-emerald-200 rounded-full shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 rounded-full p-3 shadow-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-emerald-700">Perfil de Usuario</h1>
              <p className="text-slate-600">Gestiona tu información y plantas</p>
            </div>

            {/* User Info Grid */}
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-500">Nombre</div>
                    <div className="font-semibold text-slate-800">{user.nombre}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-500">Usuario</div>
                    <div className="font-semibold text-slate-800">@{user.apodo}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="font-semibold text-slate-800">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-500">Ubicación</div>
                    <div className="font-semibold text-slate-800">{user.departamento}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{user.plantsCount}</div>
                <div className="text-sm text-slate-500">Plantas</div>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">12</div>
                <div className="text-sm text-slate-500">Cosechas</div>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">8</div>
                <div className="text-sm text-slate-500">Meses activo</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Edit className="h-4 w-4" />
                Editar perfil
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Settings className="h-4 w-4" />
                Configuración
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Plants Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.8 }} 
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-500" />
            Plantas Asociadas
          </h3>
          
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
};

export default UserProfilePage;

