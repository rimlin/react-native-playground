import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

export const MovieCarousel = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Movie Carousel Content</Text>
      </View>

      <Link to="/" style={styles.backLink} underlayColor="#f0f4f7">
        <Text>Go Home</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backLink: {
    alignSelf: "stretch",
    textAlign: "center",
    padding: 16,
    backgroundColor: "#eee",
  },
});
