import { Link } from 'react-router-dom'

/**
 * Migas de pan para reflejar la navegación jerárquica:
 * Ubicaciones -> Sensores de una ubicación -> Mediciones de un sensor.
 * @param {{ items: Array<{ label: string, to?: string }> }} props
 */
function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} className="breadcrumb__item">
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
            )}
            {!isLast && <span className="breadcrumb__separator"> / </span>}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
