import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import { Home } from './components/Home';
import { MovieCarousel } from './components/MovieCarousel';
import { Ball } from './components/Ball';
import { Budget } from './components/Budget';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={Home} />
        <Route path="/movie-carousel" component={MovieCarousel} />
        <Route path="/ball" component={Ball} />
        <Route path="/budget" component={Budget} />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
