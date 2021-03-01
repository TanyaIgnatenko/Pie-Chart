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
  labelStyle?: object;
  color: string;
  rounded?: boolean;
  showLabel?: boolean;
  labelOffsetFromCenter?: number;
};

const PartialCircle: FC<TPartialCircleProps> = ({
  cx,
  cy,
  radius,
  startAngle,
  endAngle,
  lineWidth,
  label,
  labelStyle,
  color,
  rounded = false,
  showLabel = false,
  labelOffsetFromCenter = 0,
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
    if (!showLabel) return null;

    const halfAngle = Math.abs(startAngle - endAngle) / 2;

    let textAngle = startAngle + halfAngle;
    textAngle = svgAngleToStandart(textAngle);

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
  }, [
    cx,
    cy,
    endAngle,
    labelOffsetFromCenter,
    lineWidth,
    radius,
    showLabel,
    startAngle,
  ]);

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
          x={textPoint!.x}
          y={textPoint!.y}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </>
  );
};

export default PartialCircle;
