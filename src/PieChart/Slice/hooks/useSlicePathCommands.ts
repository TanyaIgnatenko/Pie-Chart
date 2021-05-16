import { useMemo } from 'react';
import { toRadians } from '../../../utils/math';
import partialCircle from 'svg-partial-circle';

type UseSlicePathCommands = (
  cx: number,
  cy: number,
  radius: number,
  innerRadius: number,
  lineWidth: number,
  startAngle: number,
  endAngle: number,
  rounded: boolean,
) => string;

export const useSlicePathCommands: UseSlicePathCommands = (
  cx,
  cy,
  radius,
  innerRadius,
  lineWidth,
  startAngle,
  endAngle,
  rounded,
) => {
  return useMemo(() => {
    const startRadians = toRadians(startAngle);
    const endRadians = toRadians(endAngle);

    // to make corners stay within defined area
    const start = rounded
      ? startRadians + lineWidth / (2 * radius)
      : startRadians;
    const end = rounded ? endRadians - lineWidth / (2 * radius) : endRadians;

    return partialCircle(cx, cy, innerRadius, start, end)
      .map((command) => {
        return command.join(' ');
      })
      .join();
  }, [startAngle, endAngle, rounded, lineWidth, radius, cx, cy, innerRadius]);
};
