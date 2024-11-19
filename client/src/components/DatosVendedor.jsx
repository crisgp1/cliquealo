import { useState, useEffect } from 'react';

function DatosVendedor() {
  const [datosVendedores, setDatosVendedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: '',
    nombre: '',
    correo_electronico: '',
    numero_telefonico: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [datosRes, usuariosRes] = await Promise.all([
        fetch('http://localhost:3000/api/datos-vendedor'),
        fetch('http://localhost:3000/api/usuarios')
      ]);

      if (!datosRes.ok) throw new Error('Error al cargar los datos de vendedores');
      if (!usuariosRes.ok) throw new Error('Error al cargar los usuarios');

      const [datosData, usuariosData] = await Promise.all([
        datosRes.json(),
        usuariosRes.json()
      ]);

      setDatosVendedores(datosData);
      setUsuarios(usuariosData);
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
        ? `http://localhost:3000/api/datos-vendedor/${editingId}`
        : 'http://localhost:3000/api/datos-vendedor';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al guardar los datos del vendedor');
      
      await fetchData();
      setFormData({
        id_usuario: '',
        nombre: '',
        correo_electronico: '',
        numero_telefonico: ''
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (datos) => {
    setFormData({
      id_usuario: datos.id_usuario,
      nombre: datos.nombre,
      correo_electronico: datos.correo_electronico,
      numero_telefonico: datos.numero_telefonico
    });
    setEditingId(datos.id_datos_vendedor);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar estos datos de vendedor?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/datos-vendedor/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar los datos del vendedor');
      
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Datos de Vendedor</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre del vendedor"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo_electronico">
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="correo_electronico"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.correo_electronico}
              onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero_telefonico">
              Número Telefónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numero_telefonico"
              type="tel"
              placeholder="Número telefónico"
              value={formData.numero_telefonico}
              onChange={(e) => setFormData({ ...formData, numero_telefonico: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Datos de Vendedor
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  id_usuario: '',
                  nombre: '',
                  correo_electronico: '',
                  numero_telefonico: ''
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

      {/* Lista de Datos de Vendedor */}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Correo Electrónico
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {datosVendedores.map((datos) => (
              <tr key={datos.id_datos_vendedor}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {datos.Usuario?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {datos.nombre}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {datos.correo_electronico}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {datos.numero_telefonico}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(datos)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(datos.id_datos_vendedor)}
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

export default DatosVendedor;