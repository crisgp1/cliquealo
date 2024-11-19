import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Importar componentes
import Bancos from './components/Bancos';
import Creditos from './components/Creditos';
import DatosVendedor from './components/DatosVendedor';
import Ofertas from './components/Ofertas';
import Publicaciones from './components/Publicaciones';
import Ventas from './components/Ventas';
import CrearUsuario from './CrearUsuario';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-purple-600 text-white'
          : 'text-gray-600 hover:bg-purple-100'
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Barra de navegación */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-purple-600">
                    Sistema de Gestión
                  </Link>
                </div>
              </div>

              {/* Navegación desktop */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                <NavLink to="/usuarios">Usuarios</NavLink>
                <NavLink to="/bancos">Bancos</NavLink>
                <NavLink to="/creditos">Créditos</NavLink>
                <NavLink to="/datos-vendedor">Datos Vendedor</NavLink>
                <NavLink to="/ofertas">Ofertas</NavLink>
                <NavLink to="/publicaciones">Publicaciones</NavLink>
                <NavLink to="/ventas">Ventas</NavLink>
              </div>

              {/* Botón menú móvil */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink to="/usuarios">Usuarios</NavLink>
                <NavLink to="/bancos">Bancos</NavLink>
                <NavLink to="/creditos">Créditos</NavLink>
                <NavLink to="/datos-vendedor">Datos Vendedor</NavLink>
                <NavLink to="/ofertas">Ofertas</NavLink>
                <NavLink to="/publicaciones">Publicaciones</NavLink>
                <NavLink to="/ventas">Ventas</NavLink>
              </div>
            </div>
          )}
        </nav>

        {/* Contenido principal */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Bienvenido al Sistema de Gestión
                </h2>
                <p className="text-gray-600 mb-8">
                  Seleccione una opción del menú para comenzar
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <Link
                    to="/publicaciones"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">Publicaciones</h3>
                    <p className="text-gray-600">Gestione las publicaciones de venta</p>
                  </Link>
                  <Link
                    to="/ofertas"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">Ofertas</h3>
                    <p className="text-gray-600">Administre las ofertas recibidas</p>
                  </Link>
                  <Link
                    to="/ventas"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">Ventas</h3>
                    <p className="text-gray-600">Gestione las ventas realizadas</p>
                  </Link>
                </div>
              </div>
            } />
            <Route path="/usuarios" element={<CrearUsuario />} />
            <Route path="/bancos" element={<Bancos />} />
            <Route path="/creditos" element={<Creditos />} />
            <Route path="/datos-vendedor" element={<DatosVendedor />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/ventas" element={<Ventas />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-lg mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <p className="text-center text-gray-600">
              Sistema de Gestión © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;