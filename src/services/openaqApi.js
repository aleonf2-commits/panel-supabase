// src/services/openaqApi.js
//
// Capa de servicios: centraliza toda la comunicación con la API REST de
// OpenAQ v3. Ningún componente ni página hace fetch directamente; todos
// pasan por las funciones exportadas aquí.
//
// En desarrollo, las peticiones a BASE_URL ("/api/openaq") son interceptadas
// por el proxy configurado en vite.config.js, que las reenvía a
// https://api.openaq.org/v3 agregando el header X-API-Key.

const BASE_URL = '/api/openaq'

/**
 * Realiza una petición GET a la API de OpenAQ y devuelve el JSON parseado.
 * Centraliza el manejo de errores HTTP para toda la aplicación.
 * @param {string} path - Ruta relativa, ej. "/locations" o "/sensors/42/measurements"
 * @param {Object} params - Query params opcionales
 */
async function get(path, params = {}) {
  const url = new URL(BASE_URL + path, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    let detail = ''
    try {
      const body = await response.json()
      detail = body?.detail ? ` - ${body.detail}` : ''
    } catch {
      // el cuerpo de la respuesta no era JSON, se ignora
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `No autorizado (${response.status}). Verifica que la variable ` +
        `OPENAQ_API_KEY esté configurada en el archivo .env del servidor.${detail}`
      )
    }
    throw new Error(`Error ${response.status} al consultar OpenAQ${detail}`)
  }

  return response.json()
}

/**
 * Obtiene el listado de ubicaciones (estaciones de monitoreo).
 * @param {Object} options
 * @param {number} options.page - Número de página (por defecto 1)
 * @param {number} options.limit - Resultados por página (por defecto 20)
 * @param {string} options.country - Código ISO de país, ej. "EC" (opcional)
 */
export function getLocations({ page = 1, limit = 20, country } = {}) {
  return get('/locations', {
    page,
    limit,
    iso: country,
    order_by: 'id',
  })
}

/** Obtiene el detalle de una ubicación puntual. */
export function getLocationById(locationId) {
  return get(`/locations/${locationId}`)
}

/**
 * Obtiene los sensores que pertenecen a una ubicación específica.
 * @param {number|string} locationId
 */
export function getSensorsByLocation(locationId) {
  return get(`/locations/${locationId}/sensors`)
}

/** Obtiene el detalle de un sensor puntual. */
export function getSensorById(sensorId) {
  return get(`/sensors/${sensorId}`)
}

/**
 * Obtiene las mediciones registradas por un sensor específico.
 * @param {number|string} sensorId
 * @param {Object} options
 * @param {number} options.page - Número de página (por defecto 1)
 * @param {number} options.limit - Resultados por página (por defecto 100)
 */
export function getMeasurementsBySensor(sensorId, { page = 1, limit = 100 } = {}) {
  return get(`/sensors/${sensorId}/measurements`, { page, limit })
}
