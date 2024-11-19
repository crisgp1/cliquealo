import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full px-4 py-3 shadow-sm bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-gray-700 text-3xl">
            Cliquéalo.
            <span className="text-emerald-700">m</span>
            <span className="text-red-800">x</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/nosotros" 
                  className="block text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="block text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className="block text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}