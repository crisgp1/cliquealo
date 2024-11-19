import { useState, useEffect } from 'react';

function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [formData, setFormData] = useState({
    id_publicacion: '',
    id_usuario: '',
    monto_oferta: '',
    fecha_oferta: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ofertasRes, usuariosRes, publicacionesRes] = await Promise.all([
        fetch('http://localhost:3000/api/ofertas'),
        fetch('http://localhost:3000/api/usuarios'),
        fetch('http://localhost:3000/api/publicaciones')
      ]);

      if (!ofertasRes.ok) throw new Error('Error al cargar las ofertas');
      if (!usuariosRes.ok) throw new Error('Error al cargar los usuarios');
      if (!publicacionesRes.ok) throw new Error('Error al cargar las publicaciones');

      const [ofertasData, usuariosData, publicacionesData] = await Promise.all([
        ofertasRes.json(),
        usuariosRes.json(),
        publicacionesRes.json()
      ]);

      setOfertas(ofertasData);
      setUsuarios(usuariosData);
      setPublicaciones(publicacionesData);
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
        ? `http://localhost:3000/api/ofertas/${editingId}`
        : 'http://localhost:3000/api/ofertas';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al guardar la oferta');
      
      await fetchData();
      setFormData({
        id_publicacion: '',
        id_usuario: '',
        monto_oferta: '',
        fecha_oferta: new Date().toISOString().split('T')[0]
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (oferta) => {
    setFormData({
      id_publicacion: oferta.id_publicacion,
      id_usuario: oferta.id_usuario,
      monto_oferta: oferta.monto_oferta,
      fecha_oferta: oferta.fecha_oferta.split('T')[0]
    });
    setEditingId(oferta.id_oferta);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta oferta?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/ofertas/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar la oferta');
      
      await fetchData();
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Ofertas</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_publicacion">
              Publicación
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id_publicacion"
              value={formData.id_publicacion}
              onChange={(e) => setFormData({ ...formData, id_publicacion: e.target.value })}
              required
            >
              <option value="">Seleccione una publicación</option>
              {publicaciones.map((publicacion) => (
                <option key={publicacion.id_publicacion} value={publicacion.id_publicacion}>
                  {publicacion.titulo_publicacion} - ${publicacion.precio}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_usuario">
              Usuario
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id_usuario"
              value={formData.id_usuario}
              onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id_usuario} value={usuario.id_usuario}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto_oferta">
              Monto de la Oferta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="monto_oferta"
              type="number"
              step="0.01"
              placeholder="Monto de la oferta"
              value={formData.monto_oferta}
              onChange={(e) => setFormData({ ...formData, monto_oferta: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_oferta">
              Fecha de la Oferta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fecha_oferta"
              type="date"
              value={formData.fecha_oferta}
              onChange={(e) => setFormData({ ...formData, fecha_oferta: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Oferta
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  id_publicacion: '',
                  id_usuario: '',
                  monto_oferta: '',
                  fecha_oferta: new Date().toISOString().split('T')[0]
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

      {/* Lista de Ofertas */}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Publicación
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ofertas.map((oferta) => (
              <tr key={oferta.id_oferta}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {oferta.Publicacion?.titulo_publicacion || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {oferta.Usuario?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  ${oferta.monto_oferta}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {new Date(oferta.fecha_oferta).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(oferta)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(oferta.id_oferta)}
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
    </div>
  );
}

export default Ofertas;