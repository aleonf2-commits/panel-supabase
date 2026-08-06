import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryCards from '../components/SummaryCards.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getLocations } from '../services/openaqApi.js'

/**
 * Página de inicio: presenta el propósito del panel y un resumen rápido
 * obtenido de la API antes de que el usuario navegue a "Ubicaciones".
 */
function HomePage() {
  const [meta, setMeta] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadSummary() {
      setStatus('loading')
      try {
        const data = await getLocations({ page: 1, limit: 1 })
        if (!cancelled) {
          setMeta(data.meta)
          setStatus('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadSummary()
    return () => {
      cancelled = true
    }
  }, [])

  const cards = [
    {
      label: 'Ubicaciones disponibles en OpenAQ',
      value: status === 'ready' ? meta?.found ?? '—' : '…',
      icon: '📍',
    },
    { label: 'Fuente de datos', value: 'OpenAQ API v3', icon: '🌐' },
    { label: 'Navegación', value: 'Ubicación → Sensor → Mediciones', icon: '🧭' },
  ]

  return (
    <section className="page">
      <div className="page__intro">
        <h2>Calidad del aire, de un vistazo</h2>
        <p>
          Este panel consume la API REST de <strong>OpenAQ</strong> y permite navegar de forma
          jerárquica: primero eliges una <strong>ubicación</strong> (estación de monitoreo), luego
          revisas sus <strong>sensores</strong> y finalmente consultas las <strong>mediciones</strong>
          {' '}registradas por el sensor seleccionado.
        </p>
        <Link className="btn-primary" to="/locations">
          Explorar ubicaciones →
        </Link>
      </div>

      {status === 'error' ? (
        <StatusMessage type="error" message={errorMessage} />
      ) : (
        <SummaryCards cards={cards} />
      )}
    </section>
  )
}

export default HomePage
