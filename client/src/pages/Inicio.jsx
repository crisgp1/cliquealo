import React from 'react';
import {
  Car,
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Heart,
  Laptop,
  Rocket,
  Star,
  Terminal,
} from 'lucide-react';

export function Inicio() {
  const iconRow1 = [
    { icon: Code, color: "#FF6B6B" },
    { icon: Rocket, color: "#4ECDC4" },
    { icon: Heart, color: "#FFB6C1" },
    { icon: Globe, color: "#4A90E2" },
    { icon: Cpu, color: "#9B59B6" },
    { icon: Coffee, color: "#E67E22" },
    { icon: Terminal, color: "#2ECC71" },
    { icon: Database, color: "#E74C3C" },
    { icon: Star, color: "#F1C40F" },
    { icon: Laptop, color: "#1ABC9C" }
  ];

  return (
    <main className="min-h-screen bg-white text-black">
     {/* Imagen principal */}
      <div className="w-full">
       <img
         src="../src/assets/imagen inicio.png"
         alt="Descripción de la imagen"
         className="w-full mx-auto shadow-lg"
        />
        {/* Texto debajo de la imagen */}
        <p className="text-black text-[25px] text-center mt-12">
         Somos la mejor opción para que compres el auto de tus sueños
        </p>
      </div>
      {/* Carrousel Container */}
      <div className="relative overflow-hidden py-20 mb-2">
        <div className="flex animate-scroll-left">
         {[...iconRow1, ...iconRow1].map((item, index) => {
         const Icon = item.icon;
         return (
          <div
           key={`row1-${index}`}
           className="flex items-center justify-center mx-8 transition-transform hover:scale-110"
           style={{ minWidth: '100px' }}
           >
           <Icon size={40} color={item.color} />
          </div>
          );
          })}
        </div>
      </div>

     {/* Custom Animations */}
     <style jsx global>{`
     @keyframes scroll-left {
     0% {
      transform: translateX(0);
     }
     100% {
      transform: translateX(-50%);
     }
     }

      @keyframes scroll-right {
     0% {
      transform: translateX(-50%);
     }
     100% {
      transform: translateX(0);
     }
     }

     .animate-scroll-left {
     animation: scroll-left 30s linear infinite;
     }

     .animate-scroll-right {
     animation: scroll-right 30s linear infinite;
     }

     .animate-scroll-left:hover,
     .animate-scroll-right:hover {
     animation-play-state: paused;
     }
     `}</style>

     <div className="flex flex-col justify-center items-center">
     {/* Botón */}
     <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 mb-2">
       <span className="mr-2">EXPLORAR CATÁLOGO</span>
       <Car size={20} />
      </button>
  
     {/* Encabezado */}
      <h1 className="text-black text-[25px] text-center mt-10 font-bold">
       ¿Por qué con nosotros?
      </h1>
     </div>

      <div className="space-y-4 mt-10">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">!</span>
            </div>
            <p>Porque ofrecemos la mejor experiencia al momento de comprar tu vehículo.</p>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p>Siempre encontrarás el vehículo a tu medida.</p>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <p>Selecciona la mejor propuesta de crédito a tus posibilidades y necesidades.</p>
          </div>
        </div>
    </main>
  );
}
