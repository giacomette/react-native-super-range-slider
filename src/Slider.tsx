import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, PanResponder } from 'react-native';

import SliderDot from './components/Dot';
import ActiveLine from './components/ActiveLine';

import { useSlider } from './hooks';

interface SliderProps {
  value: number;
  onChange: (value: number, x?: number) => void;
  step?: number;
  min?: number;
  max?: number;
  heightBar?: number;
  dotSize?: number;
  renderBar?: ({ screenWidth }: { screenWidth: number }) => JSX.Element;
}

export default function Slider({
  value,
  onChange,
  heightBar = 10,
  dotSize = 35,
  renderBar,
}: SliderProps) {
  const [beginX, setBeginX] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const xSlideBegin = useRef(new Animated.Value(value)).current;

  const { getBeginValue } = useSlider({
    dotSize,
    screenWidth,
    beginX,
  });

  useEffect(() => {
    setBeginX(value);

    xSlideBegin.setValue(value);
  }, [value, xSlideBegin]);

  const panResponderBegin = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const newValue = getBeginValue(gestureState.dx);

      onChange(newValue);

      xSlideBegin.setValue(newValue);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      setBeginX((prev) => prev + gestureState.dx);
    },
  });

  return (
    <>
      <View onLayout={(e) => setScreenWidth(e.nativeEvent.layout.width)}>
        <ActiveLine
          render={renderBar}
          screenWidth={screenWidth}
          width={beginX}
          dotSize={dotSize}
          height={heightBar}
        />

        <SliderDot translateX={xSlideBegin} panResponder={panResponderBegin} />
      </View>
    </>
  );
}
