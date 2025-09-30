import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Trash2 } from 'lucide-react';
import ClickSpark from '../../ui/ClickSpark';

interface HeaderProps {
  hasMicrocontroller: boolean;
  onDelete: () => void;
}

const Header: React.FC<HeaderProps> = ({ hasMicrocontroller, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Link
            to="/monitoring"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Volver al monitoreo
            </span>
          </Link>

          {!hasMicrocontroller && (
            <Link
              to="/devices/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">
                Gestionar Dispositivos
              </span>
            </Link>
          )}
        </div>

        <ClickSpark>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Eliminar Planta</span>
          </button>
        </ClickSpark>
      </div>
    </motion.div>
  );
};

export default Header;