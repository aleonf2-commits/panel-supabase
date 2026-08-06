# Panel OpenAQ

Dashboard web construido con **React + Vite** que consume la API REST de
[OpenAQ](https://docs.openaq.org/) (v3) y permite navegar jerárquicamente por
la información de calidad del aire:

```
Ubicaciones (estaciones)  ->  Sensores de una ubicación  ->  Mediciones de un sensor
```

## Capturas

> Agrega aquí tus propias capturas después de ejecutar el proyecto localmente
> (ver sección "Evidencias para el PDF" más abajo).

## Tecnologías

- React 19 con componentes funcionales y Hooks (`useState`, `useEffect`)
- React Router DOM 7 (rutas dinámicas con parámetros: `:locationId`, `:sensorId`)
- Vite, con proxy de desarrollo hacia `api.openaq.org`
- CSS responsivo propio (mobile / tablet / desktop), sin frameworks externos

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx            # Encabezado superior
│   ├── Sidebar.jsx           # Menú de navegación lateral
│   ├── SummaryCards.jsx      # Tarjetas resumen (página de inicio)
│   ├── LocationsTable.jsx    # Tabla de ubicaciones
│   ├── SensorsTable.jsx      # Tabla de sensores de una ubicación
│   ├── MeasurementsTable.jsx # Tabla de mediciones de un sensor
│   ├── Breadcrumb.jsx        # Migas de pan (navegación jerárquica)
│   ├── Pagination.jsx        # Control de paginación reutilizable
│   └── StatusMessage.jsx     # Estados de carga / error reutilizables
├── pages/
│   ├── HomePage.jsx              # "/"
│   ├── LocationsPage.jsx         # "/locations"
│   ├── LocationSensorsPage.jsx   # "/locations/:locationId/sensors"
│   └── SensorMeasurementsPage.jsx # "/locations/:locationId/sensors/:sensorId/measurements"
├── services/
│   └── openaqApi.js          # Única capa que llama a la API de OpenAQ
├── App.jsx                   # Layout + configuración de rutas
├── App.css                   # Estilos y diseño responsivo
└── main.jsx                  # Punto de entrada (BrowserRouter)
```

## Requisito: API Key de OpenAQ

Desde 2024 la API v3 de OpenAQ exige una API Key en el header `X-API-Key`.

1. Crea una cuenta gratuita en <https://explore.openaq.org/register>.
2. Copia tu API Key.
3. En la raíz del proyecto, copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
4. Pega tu clave:
   ```
   OPENAQ_API_KEY=tu_api_key_aqui
   ```

La clave **nunca llega al navegador**: el archivo `vite.config.js` la lee en
el servidor de desarrollo y la agrega como header al reenviar las peticiones
mediante el proxy `/api/openaq` -> `https://api.openaq.org/v3`.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>.

Para generar la build de producción:

```bash
npm run build
npm run preview
```

> Nota: en producción (`npm run preview` o un hosting estático) ya no existe
> el proxy de desarrollo de Vite, por lo que la API Key debería moverse a un
> pequeño backend/proxy propio. Para efectos de esta actividad académica, el
> flujo de desarrollo con `npm run dev` cumple con el requisito de "proxy
> configurado mediante Vite".

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | HomePage | Bienvenida y resumen general |
| `/locations` | LocationsPage | Listado de ubicaciones, con filtro por país y paginación |
| `/locations/:locationId/sensors` | LocationSensorsPage | Sensores de la ubicación seleccionada |
| `/locations/:locationId/sensors/:sensorId/measurements` | SensorMeasurementsPage | Mediciones del sensor seleccionado |

## Endpoints de OpenAQ utilizados

| Función en `openaqApi.js` | Endpoint |
|---|---|
| `getLocations()` | `GET /v3/locations` |
| `getLocationById()` | `GET /v3/locations/{id}` |
| `getSensorsByLocation()` | `GET /v3/locations/{id}/sensors` |
| `getSensorById()` | `GET /v3/sensors/{id}` |
| `getMeasurementsBySensor()` | `GET /v3/sensors/{id}/measurements` |

## Autor

Alex - Universidad Técnica Estatal de Quevedo (UTEQ)
