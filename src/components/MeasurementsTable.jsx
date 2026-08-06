/**
 * Tabla de mediciones registradas por un sensor.
 * @param {{ measurements: Array<Object> }} props
 */
function MeasurementsTable({ measurements }) {
  if (measurements.length === 0) {
    return <p className="empty-state">Este sensor todavía no tiene mediciones registradas.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha y hora (local)</th>
            <th>Valor</th>
            <th>Unidad</th>
            <th>Cobertura de datos</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((measurement, index) => (
            <tr key={`${measurement.period?.datetimeFrom?.utc || index}-${index}`}>
              <td data-label="Fecha y hora">
                {measurement.period?.datetimeFrom?.local
                  ? new Date(measurement.period.datetimeFrom.local).toLocaleString('es-EC')
                  : '—'}
              </td>
              <td data-label="Valor">
                <span className="cell-title">{measurement.value ?? '—'}</span>
              </td>
              <td data-label="Unidad">{measurement.parameter?.units || '—'}</td>
              <td data-label="Cobertura">
                {measurement.coverage?.percentComplete != null
                  ? `${measurement.coverage.percentComplete}%`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MeasurementsTable
