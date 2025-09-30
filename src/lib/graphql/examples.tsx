// EJEMPLOS DE USO: Cómo integrar GraphQL en tus componentes

import { useSupportedMetrics, useAnalyticsHealth } from './analytics-queries';
import { usePlantChartData, usePlantMetricTrend } from './hooks';

/**
 * Ejemplo 1: Componente para mostrar métricas soportadas
 */
export function SupportedMetricsList() {
  const { data, isLoading, error } = useSupportedMetrics();

  if (isLoading) return <div>Cargando métricas...</div>;
  if (error) return <div>Error al cargar métricas</div>;

  return (
    <div>
      <h3>Métricas Soportadas:</h3>
      <ul>
        {data?.getSupportedMetrics.map((metric: string) => (
          <li key={metric}>{metric}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Ejemplo 2: Componente para verificar estado del servicio
 */
export function AnalyticsHealthStatus() {
  const { data, isLoading } = useAnalyticsHealth();

  if (isLoading) return <div>Verificando estado...</div>;

  const health = data?.getAnalyticsHealth;
  return (
    <div className={`p-4 rounded ${health?.status === 'healthy' ? 'bg-green-100' : 'bg-red-100'}`}>
      <h3>Estado del Servicio Analytics</h3>
      <p>Estado: {health?.status}</p>
      <p>Servicio: {health?.service}</p>
      <p>InfluxDB: {health?.influxdb}</p>
    </div>
  );
}

/**
 * Ejemplo 3: Dashboard de analytics para una planta
 * (Ya integrado en PlantDetailPage.tsx)
 */
export function PlantAnalyticsDashboard({ plantId }: { plantId: string }) {
  const { chartData, currentData, isLoading, error, hasData } = usePlantChartData(plantId);

  return (
    <div>
      <h2>Datos de la Planta {plantId}</h2>

      {isLoading && <p>Cargando datos analíticos...</p>}
      {error && <p className="text-red-600">Error al cargar datos</p>}
      {hasData && <p className="text-green-600">✓ Datos analíticos disponibles</p>}

      <div>
        <h3>Datos Actuales:</h3>
        <p>Temperatura: {currentData.temperature}°C</p>
        <p>Humedad: {currentData.airHumidity}%</p>
        <p>Luminosidad: {currentData.lightLevel} lux</p>
      </div>

      <div>
        <h3>Datos Históricos:</h3>
        {chartData.map((point, index) => (
          <div key={index}>
            {point.time}: T={point.temperature}°C, H={point.humidity}%, L={point.lightLevel} lux
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Ejemplo 4: Análisis de tendencias específico
 */
export function TemperatureTrendChart({ plantId }: { plantId: string }) {
  const { trendData, summary, isLoading, error } = usePlantMetricTrend(plantId, 'temperature', 24);

  if (isLoading) return <div>Cargando tendencias...</div>;
  if (error) return <div>Error al cargar tendencias</div>;

  return (
    <div>
      <h3>Tendencia de Temperatura (24h)</h3>

      {summary && (
        <div className="mb-4">
          <p>Promedio: {summary.average.toFixed(1)}°C</p>
          <p>Mínimo: {summary.min.toFixed(1)}°C</p>
          <p>Máximo: {summary.max.toFixed(1)}°C</p>
        </div>
      )}

      <div className="space-y-2">
        {trendData.map((point, index) => (
          <div key={index} className="flex justify-between">
            <span>{point.time}</span>
            <span>{point.value.toFixed(1)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
