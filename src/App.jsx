import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import HomePage from './pages/HomePage.jsx'
import LocationsPage from './pages/LocationsPage.jsx'
import LocationSensorsPage from './pages/LocationSensorsPage.jsx'
import SensorMeasurementsPage from './pages/SensorMeasurementsPage.jsx'
import './App.css'

/**
 * Componente raíz: define el layout general (Header + Sidebar + contenido)
 * y la configuración de rutas de React Router, incluyendo rutas dinámicas
 * con parámetros para navegar Ubicación -> Sensores -> Mediciones.
 */
function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:locationId/sensors" element={<LocationSensorsPage />} />
            <Route
              path="/locations/:locationId/sensors/:sensorId/measurements"
              element={<SensorMeasurementsPage />}
            />
            <Route
              path="*"
              element={
                <section className="page">
                  <h2>Página no encontrada</h2>
                  <p>La ruta que buscas no existe en este panel.</p>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
