# react-native-super-range-slider

## Installation

```sh
npm install react-native-super-range-slider
```

## Usage


Simple Slider

```js
import {Slider} from "react-native-super-range-slider";


<Slider
    value={value}
    onChange={(v: number) => setValue(v)}
/>
```


Range Slider

```js
import {RangeSlider} from "react-native-super-range-slider";


<RangeSlider
    min={0}
    max={160}
    step={5}
    defaultValue={values}
    onChange={(v: number[]) => setValues(v)}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
