import { useCallback } from 'react';

export interface RangeSliderProps {
  dotSize: number;
  screenWidth: number;
}

export function useRangeSlider({ dotSize, screenWidth }: RangeSliderProps) {
  const validadeLimit = useCallback(
    (x) => {
      if (x <= 0) {
        return 0;
      }

      if (x >= screenWidth - dotSize) {
        return screenWidth - dotSize;
      }

      return x;
    },
    [dotSize, screenWidth]
  );

  const validadeBegin = useCallback(
    (beginX, moveX, endX) => {
      let newValue = validadeLimit(beginX + moveX);

      if (newValue + dotSize >= endX) {
        newValue = endX - dotSize;
      }

      return newValue;
    },
    [dotSize, validadeLimit]
  );

  const validadeEnd = useCallback(
    (beginX, moveX, endX) => {
      let newValue = validadeLimit(endX + moveX);

      if (beginX + dotSize >= newValue) {
        newValue = beginX + dotSize;
      }

      return newValue;
    },
    [dotSize, validadeLimit]
  );

  return {
    validadeBegin,
    validadeEnd,
  };
}
