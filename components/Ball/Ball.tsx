import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

export const Ball = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: {
        x: 200,
        y: 300,
      },
      useNativeDriver: false,
    }).start();
  }, []);

  console.log(position.getLayout())

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Animated.View style={position.getLayout()}>
          <View style={styles.ball}></View>
        </Animated.View>
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
  },
  backLink: {
    alignSelf: "stretch",
    textAlign: "center",
    padding: 16,
    backgroundColor: "#eee",
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "#000",
  },
});
