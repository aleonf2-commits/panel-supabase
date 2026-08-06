import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del archivo .env (no expuestas al bundle
  // del cliente porque no empiezan con VITE_).
  const env = loadEnv(mode, process.cwd(), '')
  const OPENAQ_API_KEY = env.OPENAQ_API_KEY || ''

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Todas las peticiones del frontend a /api/openaq/* se reenvian
        // al backend real de OpenAQ. La API key se inyecta aqui, en el
        // servidor de desarrollo, para que nunca viaje en el bundle del
        // navegador.
        '/api/openaq': {
          target: 'https://api.openaq.org',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/openaq/, '/v3'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (OPENAQ_API_KEY) {
                proxyReq.setHeader('X-API-Key', OPENAQ_API_KEY)
              }
            })
          },
        },
      },
    },
  }
})
