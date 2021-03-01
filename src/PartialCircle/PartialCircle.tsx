import React, { FC, useMemo } from 'react';
import partialCircle from 'svg-partial-circle';

import {
  getRightTriangleX,
  getRightTriangleY,
  svgAngleToStandart,
} from '../utils/math';
import { toRadians } from '../utils/math';

type TPartialCircleProps = {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  lineWidth: number;
  label?: string;
  color: string;
  rounded?: boolean;
  showLabel?: boolean;
};

const PartialCircle: FC<TPartialCircleProps> = ({
  cx,
  cy,
  radius,
  startAngle,
  endAngle,
  lineWidth,
  label,
  color,
  rounded = false,
  showLabel = false,
  ...props
}) => {
  const pathCommands = useMemo(() => {
    const innerRadius = radius - lineWidth / 2;

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
  }, [radius, lineWidth, startAngle, endAngle, rounded, cx, cy]);

  const textPoint = useMemo(() => {
    const halfAngle = Math.abs(startAngle - endAngle) / 2;

    let textAngle = startAngle + halfAngle;
    textAngle = svgAngleToStandart(textAngle);

    return {
      x: cx + getRightTriangleX(textAngle, radius - lineWidth / 2)!,
      y: cy - getRightTriangleY(textAngle, radius - lineWidth / 2)!,
    };
  }, [cx, cy, endAngle, lineWidth, radius, startAngle]);

  return (
    <>
      <path
        d={pathCommands}
        fill="none"
        strokeWidth={lineWidth}
        stroke={color}
        strokeLinecap={rounded ? 'round' : undefined}
        {...props}
      />
      {showLabel && (
        <text
          x={textPoint.x}
          y={textPoint.y}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {label}
        </text>
      )}
    </>
  );
};

export default PartialCircle;
