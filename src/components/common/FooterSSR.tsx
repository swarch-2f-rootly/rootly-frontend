import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Versión SSR del Footer (sin animaciones de Framer Motion)
const FooterSSR: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">¿Listo para transformar tu agricultura?</h2>
          <p className="text-xl text-white/90">
            Únete a los agricultores que ya están optimizando sus cultivos con la plataforma de monitoreo avanzada de ROOTLY.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <button className="bg-white text-emerald-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-2xl font-normal flex items-center gap-2 justify-center text-sm">
              Iniciar monitoreo
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterSSR;


