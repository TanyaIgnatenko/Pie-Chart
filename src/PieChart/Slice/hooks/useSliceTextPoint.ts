import { useMemo } from 'react';
import { Point } from '../../../types/Point';
import { getRightTriangleX, getRightTriangleY } from '../../../utils/math';

type UseSliceTextPoint = (
  cx: number,
  cy: number,
  radius: number,
  lineWidth: number,
  midAngle: number,
  offsetFromCenter: number,
) => Point;

export const useSliceTextPoint: UseSliceTextPoint = (
  cx,
  cy,
  radius,
  lineWidth,
  midAngle,
  labelOffsetFromCenter,
) => {
  return useMemo(() => {
    const textAngle = midAngle;

    return {
      x:
        cx +
        getRightTriangleX(
          textAngle,
          radius - lineWidth / 2 + labelOffsetFromCenter,
        )!,
      y:
        cy -
        getRightTriangleY(
          textAngle,
          radius - lineWidth / 2 + labelOffsetFromCenter,
        )!,
    };
  }, [cx, cy, labelOffsetFromCenter, lineWidth, midAngle, radius]);
};
