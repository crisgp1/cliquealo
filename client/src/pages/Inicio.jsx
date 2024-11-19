import React from 'react';
import {
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Heart,
  Laptop,
  Layout,
  Lightbulb,
  Music,
  Palette,
  Camera,
  Rocket,
  Smartphone,
  Star,
  Terminal,
  User,
  Video,
  Zap,
  Layers
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

  const iconRow2 = [
    { icon: Layout, color: "#3498DB" },
    { icon: Lightbulb, color: "#F39C12" },
    { icon: Music, color: "#8E44AD" }, // Cambiado de MusicNote a Music
    { icon: Palette, color: "#D35400" },
    { icon: Camera, color: "#27AE60" },
    { icon: Smartphone, color: "#C0392B" },
    { icon: User, color: "#16A085" },
    { icon: Video, color: "#2980B9" },
    { icon: Zap, color: "#E74C3C" },
    { icon: Layers, color: "#2C3E50" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Imagen principal */}
      <div className="container mx-auto px-4 mt-20">
        <img
          src="../src/assets/imagen inicio.png"
          alt="Descripción de la imagen"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>
      {/* Carrousel Container */}
      <div className="relative overflow-hidden py-20">
        {/* First Row */}
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

        {/* Second Row - Opposite Direction */}
        <div className="flex animate-scroll-right mt-12">
          {[...iconRow2, ...iconRow2].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`row2-${index}`}
                className="flex items-center justify-center mx-8 transition-transform hover:scale-110"
                style={{ minWidth: '100px' }}
              >
                <Icon size={40} color={item.color} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Welcome Content */}
      <div className="container mx-auto px-4 text-center mt-20">
        <h1 className="text-6xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
            Cliquéalo
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Descubre una nueva forma de interactuar con la tecnología y el diseño web moderno.
        </p>
        <div className="space-x-4">
          <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-full 
                           font-medium transition-all duration-300 transform hover:scale-105">
            Explorar
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-purple-400 
                           hover:bg-purple-400 rounded-full font-medium 
                           transition-all duration-300 transform hover:scale-105">
            Contactar
          </button>
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
    </main>
  );
}