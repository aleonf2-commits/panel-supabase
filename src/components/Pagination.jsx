/**
 * Control de paginación reutilizable.
 * @param {{ page: number, hasNextPage: boolean, onPageChange: (page: number) => void }} props
 */
function Pagination({ page, hasNextPage, onPageChange }) {
  return (
    <div className="pagination">
      <button
        type="button"
        className="btn-secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Anterior
      </button>
      <span className="pagination__page">Página {page}</span>
      <button
        type="button"
        className="btn-secondary"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default Pagination
