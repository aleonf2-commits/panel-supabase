/**
 * Tarjetas resumen para la página de inicio.
 * Recibe los datos por props: no consulta la API directamente.
 * @param {{ cards: Array<{ label: string, value: string|number, icon: string }> }} props
 */
function SummaryCards({ cards }) {
  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.label}>
          <span className="summary-card__icon" aria-hidden="true">{card.icon}</span>
          <div>
            <p className="summary-card__value">{card.value}</p>
            <p className="summary-card__label">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
