import { Link } from 'react-router-dom'

/**
 * Encabezado superior de la aplicación.
 * Componente puramente presentacional, sin estado propio.
 */
function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        <span className="app-header__logo" aria-hidden="true">🌎</span>
        <div>
          <h1 className="app-header__title">Panel OpenAQ</h1>
          <p className="app-header__subtitle">Calidad del aire en tiempo real</p>
        </div>
      </Link>
    </header>
  )
}

export default Header
