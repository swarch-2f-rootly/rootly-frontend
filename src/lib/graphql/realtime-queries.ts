import React from 'react';
import { gql } from 'graphql-request';
import { useGraphQLQuery } from './client';
import { graphqlKeys } from './client';

// Query para obtener mediciones históricas en tiempo real
export const GET_HISTORICAL_MEASUREMENTS = gql`
  query GetHistoricalMeasurements($input: HistoricalQueryInput!) {
    getHistoricalMeasurements(input: $input) {
      dataPoints {
        timestamp
        controllerId
        parameter
        value
        sensorId
      }
      generatedAt
      totalPoints
      filtersApplied {
        startTime
        endTime
        limit
        controllerId
        sensorId
        parameter
      }
    }
  }
`;

// Tipos para las mediciones históricas
export interface HistoricalDataPoint {
  timestamp: string;
  controllerId: string;
  parameter: string;
  value: number;
  sensorId: string;
}

export interface HistoricalMeasurementsFilters {
  startTime?: string;
  endTime?: string;
  limit?: number;
  controllerId?: string;
  sensorId?: string;
  parameter?: string;
}

export interface HistoricalQueryInput {
  controllerId: string;
  parameter: string;
  startTime: string;
  endTime: string;
  limit?: number;
}

export interface HistoricalMeasurementsResponse {
  getHistoricalMeasurements: {
    dataPoints: HistoricalDataPoint[];
    generatedAt: string;
    totalPoints: number;
    filtersApplied: HistoricalMeasurementsFilters;
  };
}

// Hook para obtener mediciones históricas de un parámetro específico
export function useHistoricalMeasurements(
  input: HistoricalQueryInput,
  enabled: boolean = true
) {
  return useGraphQLQuery<HistoricalMeasurementsResponse>(
    [...graphqlKeys.all, 'historical-measurements', input.controllerId, input.parameter, input.startTime, input.endTime].filter(Boolean),
    GET_HISTORICAL_MEASUREMENTS,
    { input },
    {
      enabled: enabled && !!input.controllerId && !!input.parameter,
      staleTime: 2 * 60 * 1000, // 2 minutos
      gcTime: 10 * 60 * 1000,   // 10 minutos en caché
      refetchInterval: false, // NO refetch automático
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
}

// Hook para obtener mediciones de múltiples parámetros (para monitoreo completo y gráficas)
export function useRealtimeMonitoring(
  controllerId: string,
  parameters: string[] = ['temperature', 'air_humidity', 'soil_humidity', 'light_intensity'],
  enabled: boolean = false,
  hours: number = 24 // Por defecto últimas 24 horas para las gráficas
) {
  // Memoizar las fechas para evitar recrearlas en cada render
  const { startTime, endTime } = React.useMemo(() => {
    const now = new Date();
    return {
      startTime: new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString(),
      endTime: now.toISOString()
    };
  }, [hours]); // Solo recalcular si cambia hours

  // Crear queries para cada parámetro
  const temperatureQuery = useHistoricalMeasurements(
    {
      controllerId,
      parameter: 'temperature',
      startTime,
      endTime,
      limit: 50,
    },
    enabled && parameters.includes('temperature')
  );

  const airHumidityQuery = useHistoricalMeasurements(
    {
      controllerId,
      parameter: 'air_humidity',
      startTime,
      endTime,
      limit: 50,
    },
    enabled && parameters.includes('air_humidity')
  );

  const soilHumidityQuery = useHistoricalMeasurements(
    {
      controllerId,
      parameter: 'soil_humidity',
      startTime,
      endTime,
      limit: 50,
    },
    enabled && parameters.includes('soil_humidity')
  );

  const lightQuery = useHistoricalMeasurements(
    {
      controllerId,
      parameter: 'light_intensity',
      startTime,
      endTime,
      limit: 50,
    },
    enabled && parameters.includes('light_intensity')
  );

  const isLoading = 
    temperatureQuery.isLoading || 
    airHumidityQuery.isLoading || 
    soilHumidityQuery.isLoading || 
    lightQuery.isLoading;

  const hasError = 
    temperatureQuery.error || 
    airHumidityQuery.error || 
    soilHumidityQuery.error || 
    lightQuery.error;

  // Combinar datos
  const combinedData = {
    temperature: temperatureQuery.data?.getHistoricalMeasurements?.dataPoints || [],
    airHumidity: airHumidityQuery.data?.getHistoricalMeasurements?.dataPoints || [],
    soilHumidity: soilHumidityQuery.data?.getHistoricalMeasurements?.dataPoints || [],
    light: lightQuery.data?.getHistoricalMeasurements?.dataPoints || [],
  };

  // Obtener última medición de cada parámetro
  const latestValues = {
    temperature: combinedData.temperature[combinedData.temperature.length - 1]?.value || 0,
    airHumidity: combinedData.airHumidity[combinedData.airHumidity.length - 1]?.value || 0,
    soilHumidity: combinedData.soilHumidity[combinedData.soilHumidity.length - 1]?.value || 0,
    lightLevel: combinedData.light[combinedData.light.length - 1]?.value || 0,
  };

  // Transformar datos para gráficas (formato compatible con PlantCharts)
  const chartData = {
    temperature: combinedData.temperature.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      value: point.value
    })),
    humidity: combinedData.airHumidity.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      value: point.value
    })),
    soilHumidity: combinedData.soilHumidity.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      value: point.value
    })),
    light: combinedData.light.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      value: point.value
    })),
  };

  return {
    data: combinedData,
    chartData,
    latestValues,
    isLoading,
    error: hasError,
    hasTemperatureData: combinedData.temperature.length > 0,
    hasAirHumidityData: combinedData.airHumidity.length > 0,
    hasSoilHumidityData: combinedData.soilHumidity.length > 0,
    hasLightData: combinedData.light.length > 0,
  };
}
