import React, { FC, useMemo } from 'react';
import partialCircle from 'svg-partial-circle';

import { toRadians } from '../utils/angle';

type TPartialCircleProps = {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  width: number;
  color: string;
  rounded?: boolean;
};

const PartialCircle: FC<TPartialCircleProps> = ({
  cx,
  cy,
  radius,
  startAngle,
  endAngle,
  width,
  color,
  rounded = false,
  ...props
}) => {
  const pathCommands = useMemo(() => {
    const innerRadius = radius - width / 2;

    const startRadians = toRadians(startAngle);
    const endRadians = toRadians(endAngle);
    // to make corners stay within defined area
    const start = rounded ? startRadians + width / (2 * radius) : startRadians;
    const end = rounded ? endRadians - width / (2 * radius) : endRadians;

    return partialCircle(cx, cy, innerRadius, start, end)
      .map((command) => {
        return command.join(' ');
      })
      .join();
  }, [radius, width, startAngle, endAngle, rounded, cx, cy]);

  return (
    <path
      d={pathCommands}
      fill="none"
      strokeWidth={width}
      stroke={color}
      strokeLinecap={rounded ? 'round' : undefined}
      {...props}
    />
  );
};

export default PartialCircle;
