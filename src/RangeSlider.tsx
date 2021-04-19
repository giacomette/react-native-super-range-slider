import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import ContainerBar from './components/Bar';
import { useRangeSlider } from './hooks';
import SliderDot from './components/Dot';

interface RangeSliderProps {
  defaultValue: number[];
  onChange: (value: number[], x?: number, y?: number) => void;
  step?: number;
  min?: number;
  max?: number;
  heightBar?: number;
  dotSize?: number;
  renderBar?: ({ screenWidth }: { screenWidth: number }) => JSX.Element;
}

let i = 0;

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
  i++;
  const beginX = useRef(defaultValue[0]);
  const endX = useRef(defaultValue[1]);

  const [screenWidth, setScreenWidth] = useState(0);

  const xSlideBegin = useRef(new Animated.Value(defaultValue[0])).current;
  const xSlideEnd = useRef(new Animated.Value(defaultValue[1])).current;

  const { getBeginValue, getEndValue } = useRangeSlider({
    dotSize,
    screenWidth,
    beginX: beginX.current,
    endX: endX.current,
  });

  const fraction = useMemo(() => {
    return screenWidth / (max - min);
  }, [min, max, screenWidth]);

  const panResponderBegin = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = getBeginValue(gestureState.dx);

      const rest = newValue % step;

      const half = step / 2;

      let valueSteped: any = newValue + (newValue % step);

      if (half <= rest) {
        valueSteped = newValue - (newValue % step);
      }

      console.log('value', newValue);
      console.log('valueSteped', valueSteped);
      console.log('fraction', fraction);

      beginX.current = newValue;

      xSlideBegin.setValue(newValue);
    },
    onPanResponderRelease: (_evt) => {
      onChange([beginX.current, endX.current]);
    },
  });

  const panResponderEnd = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = getEndValue(gestureState.dx);

      endX.current = newValue;

      xSlideEnd.setValue(newValue);
    },
    onPanResponderRelease: (_evt) => {
      onChange([beginX.current, endX.current]);
    },
  });

  console.log('render', i);

  return (
    <>
      <View onLayout={(e) => setScreenWidth(e.nativeEvent.layout.width)}>
        <ContainerBar
          render={renderBar}
          left={beginX.current}
          screenWidth={screenWidth}
          width={endX.current - beginX.current + dotSize}
          dotSize={dotSize}
          height={heightBar}
        />

        <SliderDot translateX={xSlideBegin} panResponder={panResponderBegin} />
        <SliderDot
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
  },
});
