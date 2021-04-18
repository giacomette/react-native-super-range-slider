import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import { useRangeSlider } from './hooks';

interface RangeSliderProps {
  value: number[];
  onChange: (value: number[], x?: number, y?: number) => void;
  step?: number;
  min?: number;
  max?: number;
  heightBar?: number;
  dotSize?: number;
  renderBar?: ({ screenWidth }: { screenWidth: number }) => JSX.Element;
}

export default function RangeSlider({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  heightBar = 10,
  dotSize = 35,
  renderBar,
}: RangeSliderProps) {
  console.log(step, min, max);

  const [beginX, setBeginX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const xSlideBegin = useRef(new Animated.Value(value[0])).current;
  const xSlideEnd = useRef(new Animated.Value(value[1])).current;

  const { getBeginValue, getEndValue } = useRangeSlider({
    dotSize,
    screenWidth,
    beginX,
    endX,
  });

  useEffect(() => {
    setBeginX(value[0]);
    setEndX(value[1]);

    xSlideBegin.setValue(value[0]);
    xSlideEnd.setValue(value[1]);
  }, [value, xSlideBegin, xSlideEnd]);

  const panResponderBegin = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = getBeginValue(gestureState.dx);

      onChange([newValue, endX]);

      xSlideBegin.setValue(newValue);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      setBeginX((prev) => prev + gestureState.dx);
    },
  });

  const panResponderEnd = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = getEndValue(gestureState.dx);

      onChange([beginX, newValue]);

      xSlideEnd.setValue(newValue);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      setEndX((prev) => prev + gestureState.dx);
    },
  });

  const containerStyle: any[] = [
    styles.container,
    {
      height: heightBar,
      top: (dotSize - heightBar) / 2,
      borderRadius: heightBar / 2,
    },
  ];

  if (typeof renderBar === 'function') {
    containerStyle.push({ backgroundColor: 'transparent' });
  }

  return (
    <>
      <View onLayout={(e) => setScreenWidth(e.nativeEvent.layout.width)}>
        <View style={containerStyle}>
          {typeof renderBar === 'function' ? renderBar({ screenWidth }) : null}
        </View>

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
            styles.dotAbsolute,
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
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'gray',
  },
  dot: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  dotAbsolute: {
    position: 'absolute',
  },
});
