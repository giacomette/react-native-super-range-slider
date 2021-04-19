import * as React from 'react';

import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { RangeSlider, Slider } from 'react-native-super-range-slider';

const barImg = require('./assets/bar.png');

export default function App() {
  const [values, setValues] = React.useState<number[]>([0, 50]);
  const [value, setValue] = React.useState<number>(0);

  return (
    <View style={styles.container}>
      <Text>Simple</Text>

      <Slider
        value={value}
        onChange={(v: number) => {
          setValue(v);
        }}
      />

      <View style={styles.h} />

      <Text>Range</Text>

      <RangeSlider
        min={0}
        max={160}
        step={5}
        defaultValue={values}
        onChange={(v: number[]) => {
          console.log('on change', v);
          setValues(v);
        }}
      />

      <View style={styles.h} />

      <Text>Custon render bar</Text>

      <RangeSlider
        min={0}
        max={160}
        defaultValue={values}
        onChange={(v: number[]) => {
          setValues(v);
        }}
        renderBar={({ screenWidth }) => (
          <Image
            source={barImg}
            resizeMode="contain"
            style={{
              width: screenWidth,
              ...styles.imgBar,
            }}
          />
        )}
      />

      <View style={styles.h} />

      <TextInput
        style={styles.input}
        value={String(values[0])}
        onChangeText={(text) => {
          setValues([Number(text), values[1]]);
        }}
      />

      <TextInput
        style={styles.input}
        value={String(values[1])}
        onChangeText={(text) => {
          setValues([values[0], Number(text)]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgBar: {
    height: 10,
  },
  input: {
    backgroundColor: 'gray',
    marginTop: 8,
  },
  h: {
    height: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
