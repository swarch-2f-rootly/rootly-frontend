// EJEMPLO: Cómo se vería con Apollo Client
// (Si decides usar Apollo Client en lugar de graphql-request + TanStack Query)

// Para usar Apollo Client necesitarías instalar: npm install @apollo/client

/*
import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

// Apollo Client setup
const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_DATA_ANALYTICS_BASE_URL + '/api/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  },
});

// GraphQL Queries
const GET_SUPPORTED_METRICS = gql`
  query GetSupportedMetrics {
    getSupportedMetrics
  }
`;

// Apollo hooks
export function useSupportedMetricsApollo() {
  return useQuery(GET_SUPPORTED_METRICS);
}

// En tu componente:
function MetricsList() {
  const { loading, error, data } = useSupportedMetricsApollo();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.getSupportedMetrics?.map((metric: string) => (
        <li key={metric}>{metric}</li>
      ))}
    </div>
  );
}
*/
