import React, { useState } from 'react';

const images = [
  '/src/assets/campesinos.jpg',
  // Puedes agregar más imágenes aquí, por ejemplo: '/src/assets/planta1.jpg', '/src/assets/planta2.jpg'
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt="carrusel"
          className={`object-cover w-full h-full transition-opacity duration-1000 absolute top-0 left-0 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* Controles opcionales */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-emerald-500' : 'bg-white/60'} border border-emerald-500`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
