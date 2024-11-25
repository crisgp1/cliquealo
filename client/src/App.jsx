import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { Publicacion } from './pages/clientes/Publicacion'
import { Header } from './components/ui/Header'
import { Footer } from './components/ui/Footer'
import { Login } from './pages/Login'

export default function App () {
  return (
    <BrowserRouter>
    <Header />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/publicacion" element={<Publicacion />} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
