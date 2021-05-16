import { useMemo } from 'react';
import { getAngle, getSliceLength } from '../../../utils/math';

type UseArcLength = (
  startAngle: number,
  endAngle: number,
  innerRadius: number,
) => number;

export const useArcLength: UseArcLength = (
  startAngle,
  endAngle,
  innerRadius,
) => {
  return useMemo(() => {
    const angle = getAngle(startAngle, endAngle);

    return getSliceLength(angle, innerRadius);
  }, [startAngle, endAngle, innerRadius]);
};
