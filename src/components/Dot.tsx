import React from 'react';
import { StyleSheet, Animated, PanResponderInstance } from 'react-native';

interface DotProps {
  size?: number;
  style?: any;
  panResponder: PanResponderInstance;
  translateX: any;
}

export default function Dot({
  size = 35,
  panResponder,
  translateX,
  style,
}: DotProps) {
  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.dot,
          {
            transform: [{ translateX }],
            height: size,
            width: size,
            borderRadius: size / 2,
          },
          style,
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
});
