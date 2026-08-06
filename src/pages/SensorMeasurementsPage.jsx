import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import MeasurementsTable from '../components/MeasurementsTable.jsx'
import Pagination from '../components/Pagination.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getLocationById, getMeasurementsBySensor, getSensorById } from '../services/openaqApi.js'

const PAGE_SIZE = 25

/**
 * Página que lista las mediciones de un sensor, en la ruta dinámica
 * /locations/:locationId/sensors/:sensorId/measurements.
 */
function SensorMeasurementsPage() {
  const { locationId, sensorId } = useParams()
  const [location, setLocation] = useState(null)
  const [sensor, setSensor] = useState(null)
  const [measurements, setMeasurements] = useState([])
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')

  // Carga el nombre de la ubicación y del sensor una sola vez, para las migas de pan.
  useEffect(() => {
    let cancelled = false
    async function loadContext() {
      try {
        const [locationData, sensorData] = await Promise.all([
          getLocationById(locationId),
          getSensorById(sensorId),
        ])
        if (!cancelled) {
          setLocation(locationData.results?.[0] || null)
          setSensor(sensorData.results?.[0] || null)
        }
      } catch {
        // Si falla el contexto (nombres), la tabla de mediciones se muestra igual.
      }
    }
    loadContext()
    return () => {
      cancelled = true
    }
  }, [locationId, sensorId])

  // Carga las mediciones cada vez que cambia la página.
  useEffect(() => {
    let cancelled = false

    async function loadMeasurements() {
      setStatus('loading')
      try {
        const data = await getMeasurementsBySensor(sensorId, { page, limit: PAGE_SIZE })
        if (!cancelled) {
          setMeasurements(data.results || [])
          setStatus('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadMeasurements()
    return () => {
      cancelled = true
    }
  }, [sensorId, page])

  const sensorLabel = sensor?.parameter?.displayName || sensor?.name || `Sensor #${sensorId}`

  return (
    <section className="page">
      <Breadcrumb
        items={[
          { label: 'Ubicaciones', to: '/locations' },
          { label: location?.name || `Ubicación #${locationId}`, to: `/locations/${locationId}/sensors` },
          { label: sensorLabel },
        ]}
      />

      <div className="page__header">
        <div>
          <h2>Mediciones · {sensorLabel}</h2>
          <p>Historial de valores registrados por este sensor.</p>
        </div>
      </div>

      {status === 'loading' && <StatusMessage type="loading" message="Cargando mediciones..." />}
      {status === 'error' && <StatusMessage type="error" message={errorMessage} />}

      {status === 'ready' && (
        <>
          <MeasurementsTable measurements={measurements} />
          <Pagination
            page={page}
            hasNextPage={measurements.length === PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  )
}

export default SensorMeasurementsPage
