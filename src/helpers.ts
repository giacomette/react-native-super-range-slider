export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getValueForPosition = (
  positionInView: number,
  containerWidth: number,
  thumbWidth: number,
  min: number,
  max: number,
  step: number
): number => {
  const availableSpace = containerWidth - thumbWidth;
  const relStepUnit = step / (max - min);
  let relPosition = (positionInView - thumbWidth / 2) / availableSpace;
  const relOffset = relPosition % relStepUnit;
  relPosition -= relOffset;
  if (relOffset / relStepUnit >= 0.5) {
    relPosition += relStepUnit;
  }
  return clamp(min + Math.round(relPosition / relStepUnit) * step, min, max);
};

export const getPositionForValue = (
  value: number,
  containerWidth: number,
  max: number
): number => {
  const percent = value / max;

  return percent * containerWidth;
};
