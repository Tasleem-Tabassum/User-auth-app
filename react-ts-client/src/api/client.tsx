import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://p7zo6ywvoi.execute-api.us-east-1.amazonaws.com/dev/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  defaultOptions: {
    watchQuery: {
        fetchPolicy: 'no-cache',
    },
    query: {
        fetchPolicy: 'no-cache',
    },
    mutate: {
        fetchPolicy: 'no-cache',
    },
  },
});

export default client;