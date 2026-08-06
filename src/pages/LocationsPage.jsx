import { useEffect, useState } from 'react'
import LocationsTable from '../components/LocationsTable.jsx'
import Pagination from '../components/Pagination.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getLocations } from '../services/openaqApi.js'

const PAGE_SIZE = 15

/**
 * Página que lista las ubicaciones/estaciones de monitoreo de OpenAQ,
 * con filtro por país y paginación.
 */
function LocationsPage() {
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [country, setCountry] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLocations() {
      setStatus('loading')
      try {
        const data = await getLocations({ page, limit: PAGE_SIZE, country: country || undefined })
        if (!cancelled) {
          setLocations(data.results || [])
          setStatus('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadLocations()
    return () => {
      cancelled = true
    }
  }, [page, country])

  function handleFilterSubmit(event) {
    event.preventDefault()
    setPage(1)
    setCountry(countryInput.trim().toUpperCase())
  }

  return (
    <section className="page">
      <div className="page__header">
        <div>
          <h2>Ubicaciones</h2>
          <p>Estaciones de monitoreo de calidad del aire registradas en OpenAQ.</p>
        </div>

        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <label htmlFor="country-filter">Código de país (ISO 2)</label>
          <input
            id="country-filter"
            type="text"
            maxLength={2}
            placeholder="Ej. EC, US, PE"
            value={countryInput}
            onChange={(event) => setCountryInput(event.target.value)}
          />
          <button type="submit" className="btn-secondary">Filtrar</button>
        </form>
      </div>

      {status === 'loading' && <StatusMessage type="loading" message="Cargando ubicaciones..." />}
      {status === 'error' && <StatusMessage type="error" message={errorMessage} />}

      {status === 'ready' && (
        <>
          <LocationsTable locations={locations} />
          <Pagination
            page={page}
            hasNextPage={locations.length === PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  )
}

export default LocationsPage
