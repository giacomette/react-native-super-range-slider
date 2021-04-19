import { useCallback } from 'react';
import { clamp } from './helpers';

export interface RangeSliderProps {
  endX?: number;
  beginX: number;
  dotSize: number;
  screenWidth: number;
}

export function useRangeSlider({
  dotSize,
  screenWidth,
  beginX,
  endX,
}: RangeSliderProps) {
  const getBeginValue = useCallback(
    (moveX) => {
      const newValue = clamp(beginX + moveX, 0, endX ?? screenWidth);

      // if (!endX) {
      //   return newValue;
      // }

      // if (newValue + dotSize >= endX) {
      //   newValue = endX - dotSize;
      // }

      return newValue;
    },
    [beginX, endX, screenWidth]
  );

  const getEndValue = useCallback(
    (moveX) => {
      const newValue = clamp(endX + moveX, beginX, screenWidth - dotSize);

      return newValue;
    },
    [beginX, dotSize, endX, screenWidth]
  );

  return {
    getBeginValue,
    getEndValue,
  };
}

export function useSlider({ dotSize, screenWidth, beginX }: RangeSliderProps) {
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

  const getBeginValue = useCallback(
    (moveX) => {
      let newValue = validadeLimit(beginX + moveX);

      return newValue;
    },
    [beginX, validadeLimit]
  );

  return {
    getBeginValue,
  };
}
