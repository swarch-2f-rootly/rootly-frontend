import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'; // Importante: cargar estilos para SSR

export function render(url: string) {
  // Create a fresh QueryClient for each SSR request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  // Renderizar App completo igual que en el cliente para evitar hydration mismatch
  const html = renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>
    </StrictMode>
  );

  return { html };
}

