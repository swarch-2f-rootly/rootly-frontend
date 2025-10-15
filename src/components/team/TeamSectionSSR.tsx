import React from 'react';
import { Users } from 'lucide-react';
import TeamCardSSR from './TeamCardSSR';

interface TeamMember {
  username: string;
  name: string;
}

// Versión simplificada de TeamSection para SSR (sin animaciones iniciales)
const TeamSectionSSR: React.FC = () => {
  // Datos del equipo con usernames reales de GitHub
  const teamMembers: TeamMember[] = [
    {
      username: 'ACorduz',
      name: 'Andres Camilo Orduz Lunar'
    },
    {
      username: 'cstovar',
      name: 'Cristian Tovar'
    },
    {
      username: 'Dacosta99',
      name: 'Danny'
    },
    {
      username: 'Erodriguezmu',
      name: 'Esteban Rodriguez'
    },
    {
      username: 'GabrielaGuzmanR',
      name: 'Gabriela Guzmán Rivera'
    },
    {
      username: 'ggallegosr',
      name: 'Gabriela Gallegos Rubio'
    },
    {
      username: 'CarlosSandoval-03',
      name: 'Carlos Sandoval'
    },
    {
      username: 'Srestrero',
      name: 'Santiago RR'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg mb-6">
            <Users className="w-5 h-5 mr-2" />
            <span>Equipo Rootly</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Conoce a nuestro{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              equipo
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Un grupo de desarrolladores apasionados por la tecnología y la agricultura, 
            trabajando juntos para revolucionar el campo colombiano.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamCardSSR
              key={member.username}
              username={member.username}
              name={member.name}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSectionSSR;

