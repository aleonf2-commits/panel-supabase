import { NavLink } from 'react-router-dom'

/**
 * Menú de navegación lateral (colapsa a barra horizontal en móvil vía CSS).
 */
function Sidebar() {
  const links = [
    { to: '/', label: 'Inicio', icon: '🏠', end: true },
    { to: '/locations', label: 'Ubicaciones', icon: '📍', end: false },
  ]

  return (
    <nav className="sidebar" aria-label="Navegación principal">
      <ul className="sidebar__list">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                'sidebar__link' + (isActive ? ' sidebar__link--active' : '')
              }
            >
              <span aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
