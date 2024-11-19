import { useState, useEffect } from 'react';

function Bancos() {
  const [bancos, setBancos] = useState([]);
  const [formData, setFormData] = useState({
    nombre_banco: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBancos();
  }, []);

  const fetchBancos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bancos');
      if (!response.ok) throw new Error('Error al cargar los bancos');
      const data = await response.json();
      setBancos(data);
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
        ? `http://localhost:3000/api/bancos/${editingId}`
        : 'http://localhost:3000/api/bancos';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al guardar el banco');
      
      await fetchBancos();
      setFormData({ nombre_banco: '' });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (banco) => {
    setFormData({ nombre_banco: banco.nombre_banco });
    setEditingId(banco.id_banco);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este banco?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/bancos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar el banco');
      
      await fetchBancos();
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Bancos</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_banco">
            Nombre del Banco
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre_banco"
            type="text"
            placeholder="Ingrese el nombre del banco"
            value={formData.nombre_banco}
            onChange={(e) => setFormData({ ...formData, nombre_banco: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Banco
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ nombre_banco: '' });
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Bancos */}
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bancos.map((banco) => (
              <tr key={banco.id_banco}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {banco.id_banco}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {banco.nombre_banco}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(banco)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(banco.id_banco)}
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

export default Bancos;