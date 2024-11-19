import { useState, useEffect } from 'react';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [creditos, setCreditos] = useState([]);
  const [formData, setFormData] = useState({
    id_publicacion: '',
    id_usuario: '',
    monto: '',
    fecha_venta: new Date().toISOString().split('T')[0],
    tipo_venta: '',
    id_credito: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ventasRes, usuariosRes, publicacionesRes, creditosRes] = await Promise.all([
        fetch('http://localhost:3000/api/ventas'),
        fetch('http://localhost:3000/api/usuarios'),
        fetch('http://localhost:3000/api/publicaciones'),
        fetch('http://localhost:3000/api/creditos')
      ]);

      if (!ventasRes.ok) throw new Error('Error al cargar las ventas');
      if (!usuariosRes.ok) throw new Error('Error al cargar los usuarios');
      if (!publicacionesRes.ok) throw new Error('Error al cargar las publicaciones');
      if (!creditosRes.ok) throw new Error('Error al cargar los créditos');

      const [ventasData, usuariosData, publicacionesData, creditosData] = await Promise.all([
        ventasRes.json(),
        usuariosRes.json(),
        publicacionesRes.json(),
        creditosRes.json()
      ]);

      setVentas(ventasData);
      setUsuarios(usuariosData);
      setPublicaciones(publicacionesData);
      setCreditos(creditosData);
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
        ? `http://localhost:3000/api/ventas/${editingId}`
        : 'http://localhost:3000/api/ventas';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          id_credito: formData.id_credito || null
        })
      });

      if (!response.ok) throw new Error('Error al guardar la venta');
      
      await fetchData();
      setFormData({
        id_publicacion: '',
        id_usuario: '',
        monto: '',
        fecha_venta: new Date().toISOString().split('T')[0],
        tipo_venta: '',
        id_credito: ''
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (venta) => {
    setFormData({
      id_publicacion: venta.id_publicacion,
      id_usuario: venta.id_usuario,
      monto: venta.monto,
      fecha_venta: venta.fecha_venta.split('T')[0],
      tipo_venta: venta.tipo_venta,
      id_credito: venta.id_credito || ''
    });
    setEditingId(venta.id_venta);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta venta?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/ventas/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar la venta');
      
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Ventas</h2>
      
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
              Monto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="monto"
              type="number"
              step="0.01"
              placeholder="Monto de la venta"
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_venta">
              Fecha de Venta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fecha_venta"
              type="date"
              value={formData.fecha_venta}
              onChange={(e) => setFormData({ ...formData, fecha_venta: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_venta">
              Tipo de Venta
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tipo_venta"
              value={formData.tipo_venta}
              onChange={(e) => setFormData({ ...formData, tipo_venta: e.target.value })}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="CONTADO">Contado</option>
              <option value="CREDITO">Crédito</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          {formData.tipo_venta === 'CREDITO' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_credito">
                Crédito
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_credito"
                value={formData.id_credito}
                onChange={(e) => setFormData({ ...formData, id_credito: e.target.value })}
                required
              >
                <option value="">Seleccione un crédito</option>
                {creditos.map((credito) => (
                  <option key={credito.id_credito} value={credito.id_credito}>
                    Crédito #{credito.id_credito} - ${credito.monto}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Venta
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  id_publicacion: '',
                  id_usuario: '',
                  monto: '',
                  fecha_venta: new Date().toISOString().split('T')[0],
                  tipo_venta: '',
                  id_credito: ''
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

      {/* Lista de Ventas */}
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
                Tipo
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Crédito
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {venta.Publicacion?.titulo_publicacion || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {venta.Usuario?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  ${venta.monto}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {new Date(venta.fecha_venta).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${venta.tipo_venta === 'CONTADO' ? 'bg-green-100 text-green-800' : 
                      venta.tipo_venta === 'CREDITO' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {venta.tipo_venta}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {venta.Credito ? `#${venta.Credito.id_credito}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(venta)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(venta.id_venta)}
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

export default Ventas;