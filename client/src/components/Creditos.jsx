import { useState, useEffect } from 'react';

function Creditos() {
  const [creditos, setCreditos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: '',
    estado: '',
    fecha_credito: '',
    monto: '',
    id_banco: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [creditosRes, usuariosRes, bancosRes] = await Promise.all([
        fetch('http://localhost:3000/api/creditos'),
        fetch('http://localhost:3000/api/usuarios'),
        fetch('http://localhost:3000/api/bancos')
      ]);

      if (!creditosRes.ok) throw new Error('Error al cargar los créditos');
      if (!usuariosRes.ok) throw new Error('Error al cargar los usuarios');
      if (!bancosRes.ok) throw new Error('Error al cargar los bancos');

      const [creditosData, usuariosData, bancosData] = await Promise.all([
        creditosRes.json(),
        usuariosRes.json(),
        bancosRes.json()
      ]);

      setCreditos(creditosData);
      setUsuarios(usuariosData);
      setBancos(bancosData);
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
        ? `http://localhost:3000/api/creditos/${editingId}`
        : 'http://localhost:3000/api/creditos';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al guardar el crédito');
      
      await fetchData();
      setFormData({
        id_usuario: '',
        estado: '',
        fecha_credito: '',
        monto: '',
        id_banco: ''
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (credito) => {
    setFormData({
      id_usuario: credito.id_usuario,
      estado: credito.estado,
      fecha_credito: credito.fecha_credito.split('T')[0],
      monto: credito.monto,
      id_banco: credito.id_banco
    });
    setEditingId(credito.id_credito);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este crédito?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/creditos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar el crédito');
      
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Créditos</h2>
      
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_banco">
              Banco
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id_banco"
              value={formData.id_banco}
              onChange={(e) => setFormData({ ...formData, id_banco: e.target.value })}
              required
            >
              <option value="">Seleccione un banco</option>
              {bancos.map((banco) => (
                <option key={banco.id_banco} value={banco.id_banco}>
                  {banco.nombre_banco}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
              Estado
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="APROBADO">Aprobado</option>
              <option value="RECHAZADO">Rechazado</option>
              <option value="FINALIZADO">Finalizado</option>
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
              placeholder="Ingrese el monto"
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_credito">
              Fecha del Crédito
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fecha_credito"
              type="date"
              value={formData.fecha_credito}
              onChange={(e) => setFormData({ ...formData, fecha_credito: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Actualizar' : 'Crear'} Crédito
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  id_usuario: '',
                  estado: '',
                  fecha_credito: '',
                  monto: '',
                  id_banco: ''
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

      {/* Lista de Créditos */}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Banco
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Estado
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
            {creditos.map((credito) => (
              <tr key={credito.id_credito}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {credito.id_credito}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {credito.Usuario?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {credito.Banco?.nombre_banco || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${credito.estado === 'APROBADO' ? 'bg-green-100 text-green-800' : 
                      credito.estado === 'RECHAZADO' ? 'bg-red-100 text-red-800' : 
                      credito.estado === 'FINALIZADO' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {credito.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  ${credito.monto}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {new Date(credito.fecha_credito).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(credito)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(credito.id_credito)}
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

export default Creditos;