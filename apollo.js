import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_URL = "https://api.github.com/graphql";
const YOUR_ACCESS_TOKEN = "";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_API_URL,
  headers: {
    authorization: `bearer ${YOUR_ACCESS_TOKEN}`,
  },
});
