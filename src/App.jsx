import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal carga el Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Espacio para futuras rutas (ej. /configuracion) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
