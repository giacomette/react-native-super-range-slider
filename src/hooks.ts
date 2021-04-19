import { useCallback } from 'react';

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

      if (!endX) {
        return newValue;
      }

      if (newValue + dotSize >= endX) {
        newValue = endX - dotSize;
      }

      return newValue;
    },
    [beginX, dotSize, endX, validadeLimit]
  );

  const getEndValue = useCallback(
    (moveX) => {
      let newValue = validadeLimit(endX + moveX);

      if (beginX + dotSize >= newValue) {
        newValue = beginX + dotSize;
      }

      return newValue;
    },
    [beginX, dotSize, endX, validadeLimit]
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
