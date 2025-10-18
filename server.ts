import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Plantilla HTML en caché para producción
const templateHtml = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
  : '';

const app = express();

// Agregar middleware de Vite en desarrollo
let vite: ViteDevServer | undefined;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv(path.resolve(__dirname, 'dist/client'), { extensions: [] }));
}

// ⭐ CONFIGURACIÓN: Rutas que deben usar SSR
// HomePage, Login y Register
const ssrRoutes = ['/', '/home', '/login', '/register'];

// Middleware para todas las rutas (sin path específico para evitar problemas con Express 5)
app.use(async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template: string;
    let render: (url: string) => { html: string };

    if (!isProduction && vite) {
      // Modo desarrollo: cargar template y módulo en cada request
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      // Modo producción: usar archivos ya compilados
      template = templateHtml;
      // @ts-expect-error - el archivo solo existe después del build
      render = (await import('./dist/server/entry-server.js')).render;
    }

    // Ignorar solicitudes de archivos estáticos y recursos
    if (url.includes('.') || url.includes('well-known')) {
      return next();
    }

    // Decidir si hacer SSR o CSR basado en la ruta
    // Normalizar la URL para asegurar que siempre tenga una barra inicial
    const normalizedUrl = url.startsWith('/') ? url : '/' + url;
    
    const shouldUseSSR = ssrRoutes.some(route => {
      // Comparar sin considerar la barra final
      const routeWithoutTrailingSlash = route.replace(/\/$/, '');
      const urlWithoutTrailingSlash = normalizedUrl.replace(/\/$/, '');
      return urlWithoutTrailingSlash === routeWithoutTrailingSlash;
    });

    if (shouldUseSSR) {
      // Renderizar el contenido en el servidor con la URL normalizada
      const { html: appHtml } = render(normalizedUrl);

      // Inyectar el HTML renderizado en el template
      let html = template.replace('<!--app-html-->', appHtml);

      // Incluir estilos CSS para SSR
      if (!isProduction) {
        try {
          // Leer el CSS compilado
          const cssPath = path.resolve(__dirname, 'dist/css/styles.css');
          if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf-8');
            const cssInjection = `<style>${cssContent}</style>`;
            html = html.replace('</head>', cssInjection + '</head>');
          }
        } catch (error) {
          // Ignorar errores de CSS silenciosamente
        }
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } else {
      // Para otras rutas, enviar el HTML base (CSR puro)
      const html = template.replace('<!--app-html-->', '');
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    }
  } catch (e) {
    const error = e as Error;
    // Log del error para debugging
    if (!isProduction && vite) {
      vite.ssrFixStacktrace(error);
    }
    console.error(error.stack);
    res.status(500).end(error.stack);
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🌱 ROOTLY Server Running (SSR)      ║
╠═══════════════════════════════════════╣
║   Mode: ${isProduction ? 'Production' : 'Development'}                  ║
║   Port: ${port}                           ║
║   URL:  http://localhost:${port}        ║
╚═══════════════════════════════════════╝

🚀 SSR habilitado en: ${ssrRoutes.join(', ')}
📦 CSR para el resto de rutas
  `);
});

