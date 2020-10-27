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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});
