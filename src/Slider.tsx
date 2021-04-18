/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import { useRangeSlider } from './hooks';

let width = 0;
let beginX = 0;
let endX = 0;

interface SliderProps {
  value: number[];
  onChange: any;
  step?: number;
  min?: number;
  max?: number;
  heightBar?: number;
  dotSize?: number;
}

export default function Slider({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 10,
  heightBar = 10,
  dotSize = 50,
}: SliderProps) {
  console.log(step, min, max);
  const xSlideBegin = useRef(new Animated.Value(value[0])).current;
  const xSlideEnd = useRef(new Animated.Value(value[1])).current;

  const { validadeBegin, validadeEnd } = useRangeSlider({
    dotSize,
    screenWidth: width,
  });

  useEffect(() => {
    beginX = value[0];
    endX = value[1];

    xSlideBegin.setValue(value[0]);
    xSlideEnd.setValue(value[1]);
  }, [value, xSlideBegin, xSlideEnd]);

  const panResponderBegin = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = validadeBegin(beginX, gestureState.dx, endX);

      onChange([newValue, endX]);

      xSlideBegin.setValue(newValue);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      beginX += gestureState.dx;
    },
  });

  const panResponderEnd = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = validadeEnd(beginX, gestureState.dx, endX);

      onChange([beginX, newValue]);

      xSlideEnd.setValue(newValue);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      endX += gestureState.dx;
    },
  });

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
        }}
        onLayout={(e) => (width = e.nativeEvent.layout.width)}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'gray',
            width: '100%',
            height: heightBar,
            top: (dotSize - heightBar) / 2,
            borderRadius: heightBar / 2,
          }}
        />

        <Animated.View
          {...panResponderBegin.panHandlers}
          style={[
            styles.dot,
            {
              transform: [{ translateX: xSlideBegin }],
              height: dotSize,
              width: dotSize,
              borderRadius: dotSize / 2,
            },
          ]}
        />

        <Animated.View
          {...panResponderEnd.panHandlers}
          style={[
            styles.dot,
            { backgroundColor: 'blue', position: 'absolute' },
            {
              transform: [{ translateX: xSlideEnd }],
              height: dotSize,
              width: dotSize,
              borderRadius: dotSize / 2,
            },
          ]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#ff0000',
  },
});
