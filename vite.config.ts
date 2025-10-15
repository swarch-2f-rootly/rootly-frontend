import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generar manifests para SSR
    manifest: true,
    ssrManifest: true,
  },
  ssr: {
    // Configuración para SSR
    // Transpilar estas librerías para que funcionen en Node.js
    noExternal: ['framer-motion', 'react-spring'],
  },
  css: {
    // Asegurar que los estilos se procesen en SSR
    devSourcemap: true,
  },
})
