import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h1 className="text-2xl font-bold mb-6">CliquéaloMX</h1>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Enlaces</h2>
          <nav className="flex flex-col space-y-3">
            <a href="#" className="hover:text-blue-200 transition-colors">
              Sobre nosotros
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Términos y condiciones
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Nuestros aliados
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Garantía de satisfacción
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Contacto
            </a>
          </nav>
        </div>

        {/* Empty space for layout */}
        <div className="hidden lg:block"></div>

        {/* Copyright section - Always at bottom on mobile, right side on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-end">
          <div className="space-y-2 text-sm">
            <p>Cliquéalo México</p>
            <p>Copyright © {new Date().getFullYear()}</p>
            <p>Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}