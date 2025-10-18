import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface TeamCardSSRProps {
  username: string;
  name: string;
}

// Versión SSR de TeamCard - muestra información estática sin fetch
const TeamCardSSR: React.FC<TeamCardSSRProps> = ({ username, name }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 min-h-[250px] flex flex-col justify-between">
      {/* Avatar placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-3 border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
          <Github className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Nombre */}
      <div className="text-center mb-4 flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {name}
        </h3>
        <p className="text-slate-500 text-xs">@{username}</p>
      </div>

      {/* Botón GitHub */}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm"
      >
        <Github className="w-3 h-3 mr-1" />
        Ver en GitHub
        <ExternalLink className="w-3 h-3 ml-1" />
      </a>
    </div>
  );
};

export default TeamCardSSR;


