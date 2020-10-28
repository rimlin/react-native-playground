import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import { Link } from "react-router-native";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect } from "react-native-svg";

import { getMovies } from "./api";
import { Movie } from "./types";

const { width, height } = Dimensions.get("window");

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const Backdrop = ({
  movies,
  scrollX,
}: {
  movies: Movie[];
  scrollX: Animated.Value;
}) => {
  return (
    <View style={{ position: "absolute", width, height: BACKDROP_HEIGHT }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });

          return (
            <MaskedView
              style={{ position: "absolute" }}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{
                    transform: [{ translateX }],
                  }}
                >
                  <Rect x="0" y="y" width={width} height={height} fill="red" />
                </AnimatedSvg>
              }
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: "cover",
                }}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={["transparent", "#fff"]}
        style={{
          position: "absolute",
          width,
          height: BACKDROP_HEIGHT,
          bottom: 0,
        }}
      />
    </View>
  );
};

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.paragraph}>Loading...</Text>
    </View>
  );
};

export const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMovies();

      setMovies([{ key: "left-side" }, ...result, { key: "right-side" }]);
    };

    fetchData();
  }, []);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Backdrop movies={movies} scrollX={scrollX} />

        <Animated.FlatList
          data={movies}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.key}
          bounces={false}
          renderToHardwareTextureAndroid
          decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
          contentContainerStyle={styles.contentContainer}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if (!item.poster) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
            }

            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, 50, 100],
            });

            return (
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    backgroundColor: "#fff",
                    borderRadius: 24,
                    alignItems: "center",
                    transform: [{ translateY: translateY }],
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={styles.posterImage}
                  />
                  <Text style={{ fontSize: 20 }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginTop: 8 }}
                    numberOfLines={3}
                  >
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            );
          }}
        />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    marginBottom: 10,
  },
});
