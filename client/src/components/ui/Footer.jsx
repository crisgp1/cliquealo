import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Suscríbete a nuestro newsletter
              </h3>
              <p className="text-gray-400">
                Recibe las últimas novedades y ofertas especiales
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 min-w-[300px] px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 
                           focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl 
                           transition-colors duration-200 flex items-center gap-2"
                >
                  <span>Suscribirse</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Cliquéalo</h2>
            <p className="text-gray-400 mb-6">
              Transformando la manera de comprar y vender en línea. Tu marketplace de confianza 
              para encontrar los mejores productos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {[
                'Inicio',
                'Productos',
                'Categorías',
                'Ofertas',
                'Vender',
                'Blog',
                'Contacto'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Categorías</h3>
            <ul className="space-y-4">
              {[
                'Tecnología',
                'Moda',
                'Hogar',
                'Deportes',
                'Electrónica',
                'Jardín',
                'Automóviles'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Av. Revolución 1234, Col. Americana
                  Guadalajara, Jalisco, México
                </span>
              </li>
              <li>
                <a
                  href="tel:+523331234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={20} />
                  +52 (33) 1234-5678
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@cliquealo.mx"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  contacto@cliquealo.mx
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Cliquéalo. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}