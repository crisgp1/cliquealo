import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowDownCircle } from 'lucide-react';

export function Inicio() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create interactive sphere
    const geometry = new THREE.IcosahedronGeometry(2, 15);
    const material = new THREE.PointsMaterial({
      size: 0.01,
      color: '#00ff88',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x00ff88, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse move effect
    const onMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.001;

      // Interactive camera movement
      camera.position.x += (mousePosition.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    contentSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="text-center p-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tight">
            Bienvenidos a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Cliquéalo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Descubre una nueva forma de interactuar con la tecnología y el diseño web moderno.
          </p>
          <div className="space-x-4">
            <button 
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full 
                         font-medium transition-all duration-300 transform hover:scale-105"
            >
              Explorar
            </button>
            <button 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full 
                         font-medium transition-all duration-300 transform hover:scale-105
                         hover:bg-white hover:text-black"
            >
              Contactar
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white 
                     animate-bounce transition-transform hover:scale-110"
          aria-label="Scroll to content"
        >
          <ArrowDownCircle size={48} />
        </button>
      </section>

      {/* Content Section */}
      <section id="content-section" className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Diseño Web',
                description: 'Creamos experiencias web únicas y memorables.'
              },
              {
                title: 'Desarrollo',
                description: 'Construimos aplicaciones modernas y escalables.'
              },
              {
                title: 'Innovación',
                description: 'Implementamos las últimas tecnologías del mercado.'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 
                           transition-all duration-300 transform hover:-translate-y-2
                           border border-gray-200 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}