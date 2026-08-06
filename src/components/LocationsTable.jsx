import { Link } from 'react-router-dom'

/**
 * Tabla de ubicaciones/estaciones de monitoreo.
 * @param {{ locations: Array<Object> }} props
 */
function LocationsTable({ locations }) {
  if (locations.length === 0) {
    return <p className="empty-state">No se encontraron ubicaciones para estos filtros.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Coordenadas</th>
            <th>Sensores</th>
            <th>Última actualización</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td data-label="Nombre">
                <span className="cell-title">{location.name || 'Sin nombre'}</span>
              </td>
              <td data-label="País">{location.country?.name || location.country?.code || '—'}</td>
              <td data-label="Coordenadas">
                {location.coordinates
                  ? `${location.coordinates.latitude?.toFixed(3)}, ${location.coordinates.longitude?.toFixed(3)}`
                  : '—'}
              </td>
              <td data-label="Sensores">{location.sensors?.length ?? '—'}</td>
              <td data-label="Última actualización">
                {location.datetimeLast?.local
                  ? new Date(location.datetimeLast.local).toLocaleString('es-EC')
                  : '—'}
              </td>
              <td data-label="">
                <Link className="btn-link" to={`/locations/${location.id}/sensors`}>
                  Ver sensores →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LocationsTable
