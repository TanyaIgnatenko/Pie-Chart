import noop from 'lodash/noop';
import React, { FC, useCallback, useMemo } from 'react';
import partialCircle from 'svg-partial-circle';

import {
  getRightTriangleX,
  getRightTriangleY,
  svgAngleToStandart,
} from '../utils/math';
import { toRadians } from '../utils/math';

import styles from './PartialCircle.module.scss';

export type MousePieEventHandler = (
  id: number | null,
  pieNode: SVGElement,
  midAngle: number,
) => void;

type TPartialCircleProps = {
  id: number;
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
  cursor?: 'pointer' | 'default';
  labelOffsetFromCenter?: number;
  onMouseEnter?: MousePieEventHandler;
  onMouseLeave?: MousePieEventHandler;
  onClick?: MousePieEventHandler;
};

const PartialCircle: FC<TPartialCircleProps> = ({
  id,
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
  cursor = 'default',
  onMouseEnter = noop,
  onMouseLeave = noop,
  onClick = noop,
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

  const midAngle = useMemo(() => {
    const halfAngle = Math.abs(startAngle - endAngle) / 2;
    const midAngle = startAngle + halfAngle;

    return svgAngleToStandart(midAngle);
  }, [endAngle, startAngle]);

  const textPoint = useMemo(() => {
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

  const handleMouseEnter = useCallback(
    (event) => {
      onMouseEnter(id, event.target, midAngle);
    },
    [id, midAngle, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event) => {
      onMouseLeave(id, event.target, midAngle);
    },
    [id, midAngle, onMouseLeave],
  );

  const handleClick = useCallback(
    (event) => {
      onClick(id, event.target, midAngle);
    },
    [id, midAngle, onClick],
  );

  return (
    <g
      style={{
        cursor,
      }}
    >
      <path
        d={pathCommands}
        fill="none"
        strokeWidth={lineWidth}
        stroke={color}
        strokeLinecap={rounded ? 'round' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      />
      {showLabel && (
        <text
          x={textPoint!.x}
          y={textPoint!.y}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          className={styles.label}
          style={{
            ...labelStyle,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default PartialCircle;
