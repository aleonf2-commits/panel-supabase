import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import SensorsTable from '../components/SensorsTable.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getLocationById, getSensorsByLocation } from '../services/openaqApi.js'

/**
 * Página que lista los sensores pertenecientes a la ubicación indicada
 * en la ruta dinámica /locations/:locationId/sensors.
 */
function LocationSensorsPage() {
  const { locationId } = useParams()
  const [location, setLocation] = useState(null)
  const [sensors, setSensors] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setStatus('loading')
      try {
        const [locationData, sensorsData] = await Promise.all([
          getLocationById(locationId),
          getSensorsByLocation(locationId),
        ])
        if (!cancelled) {
          setLocation(locationData.results?.[0] || null)
          setSensors(sensorsData.results || [])
          setStatus('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadData()
    return () => {
      cancelled = true
    }
  }, [locationId])

  return (
    <section className="page">
      <Breadcrumb
        items={[
          { label: 'Ubicaciones', to: '/locations' },
          { label: location?.name || `Ubicación #${locationId}` },
        ]}
      />

      <div className="page__header">
        <div>
          <h2>{location?.name || `Ubicación #${locationId}`}</h2>
          <p>Sensores instalados en esta estación de monitoreo.</p>
        </div>
      </div>

      {status === 'loading' && <StatusMessage type="loading" message="Cargando sensores..." />}
      {status === 'error' && <StatusMessage type="error" message={errorMessage} />}
      {status === 'ready' && <SensorsTable sensors={sensors} locationId={locationId} />}
    </section>
  )
}

export default LocationSensorsPage
