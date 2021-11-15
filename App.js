import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { ApolloProvider, useLazyQuery } from "@apollo/client";

import { apolloClient } from "./apollo";

import { GET_MOST_FORKED_REPOS_OF_USER } from "./gql";
import { RepoItem } from "./RepoItem";

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

function App() {
  const [userName, setUserName] = useState("");

  const [getRepositories, { data, loading, error }] = useLazyQuery(
    GET_MOST_FORKED_REPOS_OF_USER
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        This app will help you to get a user or organization's most forked three
        repositories
      </Text>

      <Text>Username:</Text>
      <View>
        <TextInput
          mode="outlined"
          value={userName}
          onChangeText={(val) => setUserName(val)}
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              getRepositories({
                variables: { query: `sort:forks user:${userName}` },
              });
            }
          }}
        />
      </View>
      <Button
        onPress={() =>
          getRepositories({
            variables: { query: `sort:forks user:${userName}` },
          })
        }
        color="black"
        mode="contained"
        style={styles.fetchButton}
        disabled={!userName}
      >
        Fetch Results
      </Button>

      <View style={styles.repoItems}>
        {loading && <Text>Fetching Repositories</Text>}
        {error && <Text>{error}</Text>}
        {!loading &&
          !error &&
          data &&
          Boolean(!data?.search?.edges?.length) && (
            <Text>No entries found with given search</Text>
          )}
        {data && (
          <>
            <Text style={styles.reposHeading}>
              {userName}'s top 3 repositories
            </Text>
            {data.search.edges.map(
              (
                { node: { id, forkCount, description, homepageUrl, name } },
                index
              ) => {
                return (
                  <RepoItem
                    key={id}
                    forkCount={forkCount}
                    description={description}
                    homepageUrl={homepageUrl}
                    name={name}
                    isLast={index === 2}
                  />
                );
              }
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  header: {
    fontSize: 20,
    width: "80%",
    marginBottom: 16,
  },
  radioButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  },
  radioButtonWrapper: {
    display: "flex",
    alignItems: "center",
  },
  fetchButton: {
    marginTop: 16,
  },
  reposHeading: {
    padding: 8,
    backgroundColor: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  repoItems: {
    marginTop: 16,
  },
});
