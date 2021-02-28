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
    const pathCircleRadius = radius - width / 2;

    return partialCircle(
      cx,
      cy,
      pathCircleRadius,
      toRadians(startAngle),
      toRadians(endAngle),
    )
      .map((command) => {
        return command.join(' ');
      })
      .join();
  }, [radius, width, cx, cy, startAngle, endAngle]);

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
