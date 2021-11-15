import { bool, number, string } from "prop-types";
import React from "react";

import { Text, View, Linking, StyleSheet } from "react-native";

export const RepoItem = ({
  name,
  description,
  forkCount,
  homepageUrl,
  isLast,
}) => {
  return (
    <View style={styles.repoItem}>
      <Text style={styles.name}>{name}</Text>
      <Text>{description}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Text>Forks: {forkCount}</Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(homepageUrl)}
        >
          Link &gt;
        </Text>
      </View>
      {!isLast && <Text style={styles.hr} />}
    </View>
  );
};

RepoItem.propTypes = {
  name: string.isRequired,
  description: string.isRequired,
  forkCount: number.isRequired,
  homepageUrl: string.isRequired,
  isLast: bool.isRequired,
};

const styles = StyleSheet.create({
  repoItem: {
    padding: 16,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  hr: {
    padding: 7,
    width: "100%",
    backgroundColor: "#F1F1F1",
    marginTop: 16,
  },
});
