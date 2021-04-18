import * as React from 'react';

import { StyleSheet, TextInput, View } from 'react-native';
import { RangeSlider } from 'react-native-super-range-slider';

export default function App() {
  const [value, setValue] = React.useState<number[]>([0, 50]);

  return (
    <View style={styles.container}>
      <RangeSlider
        value={value}
        onChange={(v: number[]) => {
          console.log('v', v);
          setValue(v);
        }}
      />

      <View style={styles.h} />

      <TextInput
        style={styles.input}
        value={String(value[0])}
        onChangeText={(text) => {
          setValue([Number(text), value[1]]);
        }}
      />

      <TextInput
        style={styles.input}
        value={String(value[1])}
        onChangeText={(text) => {
          setValue([value[0], Number(text)]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
