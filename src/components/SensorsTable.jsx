import { Link } from 'react-router-dom'

/**
 * Tabla de sensores pertenecientes a una ubicación.
 * @param {{ sensors: Array<Object>, locationId: string }} props
 */
function SensorsTable({ sensors, locationId }) {
  if (sensors.length === 0) {
    return <p className="empty-state">Esta ubicación no tiene sensores registrados.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Nombre del sensor</th>
            <th>Unidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td data-label="Parámetro">
                <span className="cell-title">
                  {sensor.parameter?.displayName || sensor.parameter?.name || 'Desconocido'}
                </span>
              </td>
              <td data-label="Nombre del sensor">{sensor.name || `Sensor #${sensor.id}`}</td>
              <td data-label="Unidad">{sensor.parameter?.units || '—'}</td>
              <td data-label="">
                <Link
                  className="btn-link"
                  to={`/locations/${locationId}/sensors/${sensor.id}/measurements`}
                >
                  Ver mediciones →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SensorsTable
