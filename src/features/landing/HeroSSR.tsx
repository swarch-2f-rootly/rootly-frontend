import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Database, 
  Wifi, 
  TrendingUp,
  Thermometer,
  Droplets,
  Activity
} from "lucide-react";

// Versión simplificada del Hero para SSR (sin Framer Motion)
const HeroSSR: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden mt-12">
      {/* Natural Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-emerald-200 rounded-full opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-teal-200 rounded-full opacity-50" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-cyan-200 rounded-full opacity-40" />
      </div>

      <div className="relative z-10 mx-auto px-4 py-20" style={{ maxWidth: '84rem' }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenido izquierdo */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Zap size={16} className="mr-2" />
              AgriTech de Próxima Generación
            </div>

            {/* Título principal */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-800/85">
                La solución completa
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                para monitorear cultivos.
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              El conjunto de herramientas de tu granja para dejar de adivinar y empezar a optimizar. Recopila, analiza y escala datos agrícolas de forma segura con ROOTLY.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-2xl font-normal flex items-center gap-2 text-sm">
                  Iniciar Monitoreo
                  <ArrowRight size={16} />
                </button>
              </Link>
              <a href="#collaboration-section">
                <button className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-2xl font-normal transition-all duration-300 text-sm">
                  Explorar la Plataforma
                </button>
              </a>
            </div>
          </div>

          {/* Dashboard derecho */}
          <div className="relative">
            <div className="p-8 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 shadow-2xl rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Monitoreo en Tiempo Real</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm font-medium text-emerald-600">En Vivo</span>
                </div>
              </div>

              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 flex items-end justify-center space-x-2 mb-6">
                {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-emerald-500 to-teal-400 rounded-xl w-6"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Conectado</span>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <Wifi className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-700">En Línea</span>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                  <TrendingUp className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-medium text-cyan-700">Optimizado</span>
                </div>
              </div>
            </div>

            {/* Background Effects */}
            <div className="absolute -inset-4 -z-10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4", suffix: "", label: "Tipos de Medición", change: "Disponibles", icon: Thermometer, color: "emerald" },
              { value: "Auto", suffix: "", label: "Monitoreo Automático", change: "Programable", icon: Droplets, color: "teal" },
              { value: "IoT", suffix: "", label: "Tecnología", change: "Conectividad", icon: Activity, color: "cyan" },
              { value: "Web", suffix: "", label: "Acceso Remoto", change: "Desde Cualquier Lugar", icon: Zap, color: "emerald" }
            ].map((stat, index) => {
              // Mapear colores a clases completas para que Tailwind las detecte
              const colorClasses = {
                emerald: {
                  bg: 'bg-emerald-100',
                  text: 'text-emerald-600'
                },
                teal: {
                  bg: 'bg-teal-100',
                  text: 'text-teal-600'
                },
                cyan: {
                  bg: 'bg-cyan-100',
                  text: 'text-cyan-600'
                }
              };
              
              const colors = colorClasses[stat.color as keyof typeof colorClasses];
              
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white/90 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-sm text-slate-600 mt-2 font-medium">{stat.label}</p>
                  <p className={`text-xs ${colors.text} font-medium mt-1`}>{stat.change}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSSR;

