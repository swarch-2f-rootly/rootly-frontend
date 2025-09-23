import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Thermometer, Droplets, Activity, Zap } from 'lucide-react';

// Componente CountUp personalizado
const CountUp: React.FC<{
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  trigger?: boolean;
}> = ({ start = 0, end, duration = 2, delay = 0, suffix = "", trigger = false }) => {
  const [count, setCount] = React.useState(start);

  React.useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const currentCount = start + (end - start) * progress;
        setCount(Math.floor(currentCount));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [trigger, start, end, duration, delay]);

  return <span>{count}{suffix}</span>;
};

const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { 
      value: 18.1, 
      suffix: "°C", 
      label: "Temperatura", 
      change: "+2.1%", 
      icon: Thermometer, 
      color: "emerald" 
    },
    { 
      value: 62, 
      suffix: "%", 
      label: "Humedad", 
      change: "-0.8%", 
      icon: Droplets, 
      color: "teal" 
    },
    { 
      value: 14, 
      suffix: "", 
      label: "Sensores Activos", 
      change: "+100%", 
      icon: Activity, 
      color: "cyan" 
    },
    { 
      value: 100.0, 
      suffix: "%", 
      label: "Tiempo Activo", 
      change: "+0.1%", 
      icon: Zap, 
      color: "emerald" 
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative z-10 px-6 py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
              className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-slate-800">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  delay={2.4 + index * 0.1}
                  trigger={inView}
                />
              </div>
              <p className="text-sm text-slate-600 mt-2 font-medium">{stat.label}</p>
              <p className={`text-xs text-${stat.color}-600 font-medium mt-1`}>{stat.change}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
