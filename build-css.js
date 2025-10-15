import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Script para compilar solo los estilos CSS
async function buildCSS() {
  try {
    await build({
      build: {
        outDir: 'dist/css',
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, 'src/App.css'),
          output: {
            assetFileNames: 'styles.css'
          }
        }
      }
    });
    console.log('CSS compilado exitosamente');
  } catch (error) {
    console.error('Error compilando CSS:', error);
  }
}

buildCSS();
