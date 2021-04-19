import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import ActiveLine from './components/ActiveLine';
import SliderDot from './components/Dot';
import { clamp, getPositionForValue, getValueForPosition } from './helpers';

interface RangeSliderProps {
  defaultValue?: number[];
  onChange?: (value: number[], x?: number, y?: number) => void;
  step?: number;
  min?: number;
  max?: number;
  heightBar?: number;
  dotSize?: number;
  renderBar?: ({ screenWidth }: { screenWidth: number }) => JSX.Element;
}

export default function RangeSlider({
  defaultValue,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  heightBar = 10,
  dotSize = 35,
  renderBar,
}: RangeSliderProps) {
  const beginValueStep = useRef(0);
  const endValueStep = useRef(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const [beginX, setBeginX] = useState(0);
  const [endX, setEndX] = useState(0);

  const xSlideBegin = useRef(new Animated.Value(0)).current;
  const xSlideEnd = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (defaultValue?.length) {
      beginValueStep.current = defaultValue[0];
      endValueStep.current = defaultValue[1];

      const x1 = getPositionForValue(defaultValue[0], screenWidth, max);
      const x2 = getPositionForValue(
        defaultValue[1],
        screenWidth - dotSize,
        max
      );

      setBeginX(x1);
      setEndX(x2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, screenWidth]);

  useEffect(() => {
    xSlideBegin.setValue(beginX);
  }, [beginX, xSlideBegin]);

  useEffect(() => {
    xSlideEnd.setValue(endX);
  }, [endX, xSlideEnd]);

  const panResponderBegin = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_evt, gestureState) => {
          const value = clamp(beginX + gestureState.dx, 0, endX ?? screenWidth);

          beginValueStep.current = getValueForPosition(
            value,
            screenWidth,
            dotSize,
            min,
            max,
            step
          );

          setBeginX(value);
        },
        onPanResponderRelease: (_evt) => {
          if (typeof onChange === 'function') {
            onChange([beginValueStep.current, endValueStep.current]);
          }
        },
      }),
    [beginX, dotSize, endX, max, min, onChange, screenWidth, step]
  );

  const panResponderEnd = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_evt, gestureState) => {
          const value = clamp(
            endX + gestureState.dx,
            beginX,
            screenWidth - dotSize
          );

          endValueStep.current = getValueForPosition(
            value,
            screenWidth + dotSize,
            dotSize,
            min,
            max,
            step
          );

          setEndX(value);
        },
        onPanResponderRelease: (_evt) => {
          if (typeof onChange === 'function') {
            onChange([beginValueStep.current, endValueStep.current]);
          }
        },
      }),
    [beginX, dotSize, endX, max, min, onChange, screenWidth, step]
  );

  return (
    <>
      <View onLayout={(e) => setScreenWidth(e.nativeEvent.layout.width)}>
        <ActiveLine
          render={renderBar}
          left={beginX + dotSize / 2}
          screenWidth={screenWidth}
          width={endX - beginX + dotSize / 2}
          dotSize={dotSize}
          height={heightBar}
        />

        <SliderDot
          size={dotSize}
          translateX={xSlideBegin}
          panResponder={panResponderBegin}
        />
        <SliderDot
          size={dotSize}
          translateX={xSlideEnd}
          panResponder={panResponderEnd}
          style={styles.dotAbsolute}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dotAbsolute: {
    position: 'absolute',
    elevation: 4,
  },
});
