import gql from "graphql-tag";

export const GET_MOST_FORKED_REPOS_OF_USER = gql`
  query getMostForkedReposOfUser($query: String!) {
    search(query: $query, type: REPOSITORY, first: 3) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            forkCount
            homepageUrl
          }
        }
      }
    }
  }
`;
