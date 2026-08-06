/**
 * Mensaje reutilizable para estados de carga o error.
 * @param {{ type: 'loading'|'error', message: string }} props
 */
function StatusMessage({ type = 'loading', message }) {
  return (
    <div className={`status-message status-message--${type}`} role="status">
      {type === 'loading' ? <span className="spinner" aria-hidden="true" /> : <span aria-hidden="true">⚠️</span>}
      <p>{message}</p>
    </div>
  )
}

export default StatusMessage
