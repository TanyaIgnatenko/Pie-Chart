import { useMemo } from 'react';
import { getAngle, svgAngleToStandart } from '../../../utils/math';

type UseMidAngle = (startAngle: number, endAngle: number) => number;

export const useMidAngle: UseMidAngle = (startAngle, endAngle) => {
  return useMemo(() => {
    const angle = getAngle(startAngle, endAngle);
    const halfAngle = angle / 2;
    const midAngle = startAngle + halfAngle;

    return svgAngleToStandart(midAngle);
  }, [endAngle, startAngle]);
};
