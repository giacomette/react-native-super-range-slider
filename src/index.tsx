import { requireNativeComponent, ViewStyle } from 'react-native';

type RnSuperRangeSliderProps = {
  color: string;
  style: ViewStyle;
};

export const RnSuperRangeSliderViewManager = requireNativeComponent<RnSuperRangeSliderProps>(
'RnSuperRangeSliderView'
);

export default RnSuperRangeSliderViewManager;
