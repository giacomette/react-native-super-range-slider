import React from 'react';
import { StyleSheet, View } from 'react-native';

interface BarProps {
  height?: number;
  dotSize?: number;
  left?: number;
  screenWidth: number;
  width: number;
  render?: ({ screenWidth }: { screenWidth: number }) => JSX.Element;
}

export default function Bar({
  height = 10,
  dotSize = 35,
  screenWidth,
  width,
  left = 0,
  render,
}: BarProps) {
  const style: any[] = [
    styles.container,
    {
      height: height,
      top: (dotSize - height) / 2,
      borderRadius: height / 2,
    },
  ];

  if (typeof render === 'function') {
    style.push({ backgroundColor: 'transparent' });
  }

  return (
    <>
      <View style={style}>
        {typeof render === 'function' ? (
          render({ screenWidth })
        ) : (
          <>
            <View
              style={[
                styles.bar,
                {
                  width,
                  left,
                  height,
                },
              ]}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  bar: {
    backgroundColor: 'gray',
  },
});
