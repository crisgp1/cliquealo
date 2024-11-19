import { useState, useEffect } from 'react';

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [formData, setFormData] = useState({
    titulo_publicacion: '',
    marca: '',
    autor: '',
    anio: new Date().getFullYear(),
    precio: '',
    kilometraje: '',
    inv: '',
    modelo: ''
  });
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/publicaciones');
      if (!response.ok) throw new Error('Error al cargar las publicaciones');
      const data = await response.json();
      setPublicaciones(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:3000/api/publicaciones/${editingId}`
        : 'http://localhost:3000/api/publicaciones';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al guardar la publicación');
      
      await fetchPublicaciones();
      setFormData({
        titulo_publicacion: '',
        marca: '',
        autor: '',
        anio: new Date().getFullYear(),
        precio: '',
        kilometraje: '',
        inv: '',
        modelo: ''
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (publicacion) => {
    setFormData({
      titulo_publicacion: publicacion.titulo_publicacion,
      marca: publicacion.marca,
      autor: publicacion.autor,
      anio: publicacion.anio,
      precio: publicacion.precio,
      kilometraje: publicacion.kilometraje || '',
      inv: publicacion.inv || '',
      modelo: publicacion.modelo
    });
    setEditingId(publicacion.id_publicacion);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta publicación?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar la publicación');
      
      await fetchPublicaciones();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewDetails = async (publicacion) => {
    try {
      const [ofertasRes, ventasRes] = await Promise.all([
        fetch(`http://localhost:3000/api/publicaciones/${publicacion.id_publicacion}/ofertas`),
        fetch(`http://localhost:3000/api/publicaciones/${publicacion.id_publicacion}/ventas`)
      ]);

      const [ofertas, ventas] = await Promise.all([
        ofertasRes.json(),
        ventasRes.json()
      ]);

      setSelectedPublicacion({
        ...publicacion,
        ofertas,
        ventas
      });
      setShowDetails(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Publicaciones</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo_publicacion">
              Título
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo_publicacion"
              type="text"
              placeholder="Título de la publicación"
              value={formData.titulo_publicacion}
              onChange={(e) => setFormData({ ...formData, titulo_publicacion: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
              Marca
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="marca"
              type="text"
              placeholder="Marca"
              value={formData.marca}
              onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="autor">
              Autor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="autor"
              type="text"
              placeholder="Autor"
              value={formData.autor}
              onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="anio">
              Año
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="anio"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.anio}
              onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
              Precio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="precio"
              type="number"
              step="0.01"
              placeholder="Precio"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kilometraje">
              Kilometraje
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="kilometraje"
              type="number"
              placeholder="Kilometraje"
              value={formData.kilometraje}
              onChange={(e) => setFormData({ ...formData, kilometraje: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inv">
              Inventario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inv"
              type="number"
              placeholder="Inventario"
              value={formData.inv}
              onChange={(e) => setFormData({ ...formData, inv: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">
              Modelo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="modelo"
              type="text"
              placeholder="Modelo"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Publicación
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  titulo_publicacion: '',
                  marca: '',
                  autor: '',
                  anio: new Date().getFullYear(),
                  precio: '',
                  kilometraje: '',
                  inv: '',
                  modelo: ''
                });
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Publicaciones */}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Marca/Modelo
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Autor
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {publicaciones.map((publicacion) => (
              <tr key={publicacion.id_publicacion}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {publicacion.titulo_publicacion}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {publicacion.marca} / {publicacion.modelo}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {publicacion.autor}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  ${publicacion.precio}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleViewDetails(publicacion)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Detalles
                  </button>
                  <button
                    onClick={() => handleEdit(publicacion)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(publicacion.id_publicacion)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalles */}
      {showDetails && selectedPublicacion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Detalles de la Publicación</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-bold mb-2">Información General</h4>
                <p><span className="font-semibold">Título:</span> {selectedPublicacion.titulo_publicacion}</p>
                <p><span className="font-semibold">Marca/Modelo:</span> {selectedPublicacion.marca} / {selectedPublicacion.modelo}</p>
                <p><span className="font-semibold">Autor:</span> {selectedPublicacion.autor}</p>
                <p><span className="font-semibold">Año:</span> {selectedPublicacion.anio}</p>
                <p><span className="font-semibold">Precio:</span> ${selectedPublicacion.precio}</p>
                {selectedPublicacion.kilometraje && (
                  <p><span className="font-semibold">Kilometraje:</span> {selectedPublicacion.kilometraje}</p>
                )}
                {selectedPublicacion.inv && (
                  <p><span className="font-semibold">Inventario:</span> {selectedPublicacion.inv}</p>
                )}
              </div>

              <div>
                <h4 className="font-bold mb-2">Ofertas</h4>
                {selectedPublicacion.ofertas?.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPublicacion.ofertas.map((oferta) => (
                      <li key={oferta.id_oferta} className="border-b pb-2">
                        <p>Monto: ${oferta.monto_oferta}</p>
                        <p>Fecha: {new Date(oferta.fecha_oferta).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay ofertas para esta publicación</p>
                )}

                <h4 className="font-bold mt-4 mb-2">Ventas</h4>
                {selectedPublicacion.ventas?.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPublicacion.ventas.map((venta) => (
                      <li key={venta.id_venta} className="border-b pb-2">
                        <p>Monto: ${venta.monto}</p>
                        <p>Fecha: {new Date(venta.fecha_venta).toLocaleDateString()}</p>
                        <p>Tipo: {venta.tipo_venta}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay ventas para esta publicación</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publicaciones;