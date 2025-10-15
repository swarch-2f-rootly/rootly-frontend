import React, { useState, useEffect } from 'react';
import { Zap, Search } from 'lucide-react';

// Versión simplificada de CollaborationSection para SSR (sin Framer Motion)
const CollaborationSectionSSR: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const sensors = [
    "sensor-temperatura-01",
    "sensor-humedad-02", 
    "sensor-suelo-03"
  ];

  const filteredSensors = sensors.filter(sensor =>
    sensor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const words = ["fluida", "eficiente", "inteligente", "sostenible"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length, isMounted]);

  const maxWidth = Math.max(...words.map(word => word.length)) * 0.6;

  return (
    <section id="collaboration-section" className="py-20 px-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Zap size={16} className="mr-2" />
                <span>Colaboración</span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Haz que la agricultura sea{' '}
                <span 
                  className="relative inline-block overflow-hidden text-emerald-400" 
                  style={{ 
                    verticalAlign: 'middle', 
                    height: '1.2em',
                    minWidth: `${maxWidth}em`,
                    textAlign: 'left'
                  }}
                >
                  <span className="block flex items-center justify-start">
                    {words[currentIndex]}
                  </span>
                </span>
              </h2>

              <p className="text-xl text-slate-300">
                Herramientas para tu equipo y partes interesadas para compartir información e iterar más rápido.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Recopilación y procesamiento de datos de sensores en tiempo real",
                "Análisis avanzado con modelado predictivo",
                "Alertas y recomendaciones automatizadas",
                "Panel colaborativo para información del equipo",
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Buscar sensores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-2xl px-3 py-2 text-sm flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200 placeholder-slate-500"
                />
                <button className="p-2 hover:bg-slate-700 rounded-2xl transition-colors text-slate-300">
                  <Search size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {filteredSensors.map((sensor, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-sm font-mono text-slate-300">{sensor}</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Activo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSectionSSR;
