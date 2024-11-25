import React from 'react'

export const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Inicia sesión o registrate</h2>

        <div className="space-y-4">
          <button className="flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="Google" className="w-6 h-6 mr-2" />
            Iniciar sesión con Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-6 h-6 mr-2" />
            Iniciar sesión con Apple
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-6 h-6 mr-2" />
            Iniciar sesión con Microsoft
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_(square).png" alt="Facebook" className="w-6 h-6 mr-2" />
            Iniciar sesión con Facebook
          </button>
        </div>

        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Correo electrónico, teléfono o usuario"
          />
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          SIGUIENTE
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-500">¿No tienes cuenta?</span>{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Crea una aquí
          </a>
        </div>
      </div>
    </div>
  )
}
