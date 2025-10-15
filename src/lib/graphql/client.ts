import { GraphQLClient } from 'graphql-request';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

import { GRAPHQL_ENDPOINT } from '../config/api';

// Create GraphQL client instance
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Configure client with auth headers
export const getAuthenticatedClient = () => {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: getAuthHeaders(),
  });
};

// Generic GraphQL query hook that integrates with TanStack Query
export function useGraphQLQuery<TData = unknown, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  queryKey: (string | Record<string, unknown>)[],
  query: string,
  variables?: TVariables,
  options?: Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const client = getAuthenticatedClient();
      return client.request<TData>(query, variables);
    },
    ...options,
  });
}

// Generic GraphQL mutation hook that integrates with TanStack Query
export function useGraphQLMutation<TData = unknown, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  mutation: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const client = getAuthenticatedClient();
      return client.request<TData>(mutation, variables);
    },
    ...options,
  }, queryClient);
}

// Helper function to create GraphQL query keys
export const graphqlKeys = {
  all: ['graphql'] as const,

  // Analytics queries
  analytics: () => ['graphql', 'analytics'] as const,
  supportedMetrics: () => ['graphql', 'analytics', 'supported-metrics'] as const,
  analyticsHealth: () => ['graphql', 'analytics', 'health'] as const,
  singleMetricReport: (metricName: string, controllerId: string, filters?: any) =>
    ['graphql', 'analytics', 'single-metric', metricName, controllerId, filters] as const,
  multiMetricReport: (controllers: string[], metrics: string[], filters?: any) =>
    ['graphql', 'analytics', 'multi-metric', controllers.sort().join(','), metrics.sort().join(','), filters] as const,
  trendAnalysis: (metricName: string, controllerId: string, startTime: string, endTime: string, interval?: string) =>
    ['graphql', 'analytics', 'trend', metricName, controllerId, startTime, endTime, interval] as const,

  // Plant queries (future use)
  plants: () => ['graphql', 'plants'] as const,
  userPlants: (userId: string) => ['graphql', 'plants', 'user', userId] as const,
  plant: (plantId: string) => ['graphql', 'plants', plantId] as const,

  // Device queries (future use)
  devices: () => ['graphql', 'devices'] as const,
  device: (deviceId: string) => ['graphql', 'devices', deviceId] as const,
  plantDevices: (plantId: string) => ['graphql', 'devices', 'plant', plantId] as const,
};
