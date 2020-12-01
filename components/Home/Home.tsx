import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link
          to="/movie-carousel"
          underlayColor="#f0f4f7"
          style={styles.navItem}
        >
          <Text>Movie Carousel</Text>
        </Link>
        <Link
          to="/ball"
          underlayColor="#f0f4f7"
          style={styles.navItem}
        >
          <Text>Ball</Text>
        </Link>
        <Link
          to="/budget"
          underlayColor="#f0f4f7"
          style={styles.navItem}
        >
          <Text>Budget</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexDirection: 'column',
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 14
  },
});
