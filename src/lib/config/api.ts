// Centralized API configuration
export const API_CONFIG = {
  // API Gateway URL - single point of entry
  GATEWAY_URL: import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080',
  
  // Legacy URLs (for fallback or gradual migration)
  AUTH_URL: import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8001',
  PLANTS_URL: import.meta.env.VITE_PLANTS_BASE_URL || 'http://localhost:8004',
  ANALYTICS_URL: import.meta.env.VITE_DATA_ANALYTICS_BASE_URL || 'http://localhost:8000',
} as const;

// Helper function to get the appropriate API URL
export const getApiUrl = (service: 'gateway' | 'auth' | 'plants' | 'analytics' = 'gateway') => {
  switch (service) {
    case 'gateway':
      return API_CONFIG.GATEWAY_URL;
    case 'auth':
      return API_CONFIG.AUTH_URL;
    case 'plants':
      return API_CONFIG.PLANTS_URL;
    case 'analytics':
      return API_CONFIG.ANALYTICS_URL;
    default:
      return API_CONFIG.GATEWAY_URL;
  }
};

// GraphQL endpoint
export const GRAPHQL_ENDPOINT = `${API_CONFIG.GATEWAY_URL}/graphql`;