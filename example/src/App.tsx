import * as React from 'react';

import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { RangeSlider } from 'react-native-super-range-slider';

const barImg = require('./assets/bar.png');

export default function App() {
  const [value, setValue] = React.useState<number[]>([0, 50]);

  return (
    <View style={styles.container}>
      <Text>Basico</Text>

      <RangeSlider
        value={value}
        onChange={(v: number[]) => {
          setValue(v);
        }}
      />

      <View style={styles.h} />

      <Text>Custon render bar</Text>

      <RangeSlider
        value={value}
        onChange={(v: number[]) => {
          setValue(v);
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
