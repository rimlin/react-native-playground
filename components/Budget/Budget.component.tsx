import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Link } from 'react-router-native';
import * as d3 from 'd3';
import Svg, { G, Path } from 'react-native-svg';
import { Slice } from './Slice.component';

const AnimatedSlice = Animated.createAnimatedComponent(Slice);

const data = [
  {
    name: 'Продукты',
    value: 15000,
  },
  {
    name: 'Связь',
    value: 1000,
  },
  {
    name: 'Коммунальные платежи',
    value: 3000,
  },
  {
    name: 'Одежда',
    value: 5000,
  },
  {
    name: 'Рестораны',
    value: 7000,
  },
  {
    name: 'Топливо',
    value: 5000,
  },
];

export const Budget: React.FC = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const animValue = useRef(new Animated.Value(0)).current;

  const colors = d3.scaleOrdinal(d3.schemeAccent).domain(data.map(item => item.name));

  const surfaceWidth = windowWidth - 20;
  const surfaceHeight = 250;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 2,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, []);

  const endAngle = Animated.multiply(animValue, Math.PI);

  const totalSum = d3.sum(data, d => d.value);
  const widthBar = d3.scaleLinear().domain([0, totalSum]).range([0, 100]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.main}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="red"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View style={styles.container}>
          <View style={styles.topbar}>
            <Text style={styles.topbar_title}>Анализ бюджета</Text>
          </View>
          <View>
            <Svg width={surfaceWidth} height={surfaceHeight}>
              <G x={surfaceWidth / 2} y={surfaceHeight / 2}>
                {data.map((item, index) => (
                  <AnimatedSlice
                    key={index}
                    data={data}
                    index={index}
                    endAngle={endAngle as any}
                    color={colors(item.name)}
                  />
                ))}
              </G>
            </Svg>
          </View>
          <View style={styles.section}>
            <View>
              <View>
                <Text>Ноябрь</Text>
              </View>
              <View>
                <Text>
                  {totalSum.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.bar}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.barItem,
                    width: `${widthBar(item.value)}%`,
                    backgroundColor: colors(item.name),
                  }}
                ></View>
              ))}
            </View>
          </View>
        </View>

        <Link to="/" style={styles.backLink} underlayColor="#f0f4f7">
          <Text>Go Home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backLink: {
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#eee',
  },
  main: {
    flex: 1,
  },

  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topbar: {
    backgroundColor: '#999',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  topbar_title: {
    color: '#fff',
    fontSize: 34,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    overflow: 'hidden',
  },
  barItem: {
    height: 15,
  },
});
