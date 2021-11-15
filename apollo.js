import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_URL = "https://api.github.com/graphql";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_API_URL,
  headers: {
    authorization: "bearer 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",
  },
});
