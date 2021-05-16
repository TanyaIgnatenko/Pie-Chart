import React, { CSSProperties, FC, useCallback } from 'react';

import cn from 'classnames';
import noop from 'lodash/noop';

import Slice, { MouseSliceEventHandler } from './Slice';

import styles from './PieChart.module.scss';
import { useSlicesProps } from './hooks/useSlicesProps';

export type PieChartDataItem = {
  id: number;
  percentage: number;
  color?: string;
  image?: string;
  label?: string;
  tooltipContent?: string;
  labelStyle?: CSSProperties;
};

export type AnimationProps = {
  startDelay?: number;
  delayBetweenSlices?: number;
  duration?: number | ((startAngle: number, endAngle: number) => number);
  timingFunction?: string;
  startPositionAnimated?: boolean;
  lengthAnimated?: boolean;
};

export type PieChartProps = {
  data: PieChartDataItem[];
  centerLabel?: {
    text: string;
    style?: CSSProperties;
  };
  radius?: number;
  lineWidth?: number;
  startAngle?: number;
  paddingAngle?: number;
  roundedCorners?: boolean;
  showLabels?: boolean;
  labelOffsetFromCenter?: number;
  sliceCursor?: 'pointer' | 'default';
  onSliceEnter?: MouseSliceEventHandler;
  onSliceLeave?: MouseSliceEventHandler;
  onSliceClick?: MouseSliceEventHandler;
  onHoveredSliceChange?: MouseSliceEventHandler;
  holeColor?: string;
  className?: string;
  svgResources?: SVGRadialGradientElement;
  animation?: AnimationProps;
};

const ensureLineWidthLessThanRadius = (lineWidth: number, radius: number) =>
  Math.min(lineWidth, radius);
const ensureMinAcceptablePaddingAngle = (
  paddingAngle: number,
  slicesCount: number,
) => Math.min(paddingAngle, 360 / slicesCount - 1);

const getCenterTextFontSizeByRadius = (radius: number) => radius * 0.42;

const PieChart: FC<PieChartProps> = ({
  data,
  radius = 10,
  lineWidth = radius,
  startAngle: chartStartAngle = -90,
  paddingAngle = 0,
  labelOffsetFromCenter = 0,
  roundedCorners = false,
  showLabels = false,
  centerLabel,
  sliceCursor,
  onSliceEnter = noop,
  onSliceLeave = noop,
  onSliceClick = noop,
  onHoveredSliceChange = noop,
  holeColor = 'transparent',
  animation = {
    delayBetweenSlices: 0,
    startDelay: 0,
    duration: 0,
    timingFunction: 'linear',
    startPositionAnimated: false,
    lengthAnimated: false,
  },
  svgResources,
  className,
  ...props
}) => {
  lineWidth = ensureLineWidthLessThanRadius(lineWidth, radius);
  paddingAngle = ensureMinAcceptablePaddingAngle(paddingAngle, data.length);

  const slicesProps = useSlicesProps(
    data,
    chartStartAngle,
    paddingAngle,
    animation,
  );

  const handleSliceEnter = useCallback(
    ({ id, sliceNode, midAngle }) => {
      onSliceEnter({ id, sliceNode, midAngle });

      onHoveredSliceChange({ id, sliceNode, midAngle });
    },
    [onHoveredSliceChange, onSliceEnter],
  );
  const handleSliceLeave = useCallback(
    ({ id, sliceNode, midAngle }) => {
      onSliceLeave({ id, sliceNode, midAngle });

      onHoveredSliceChange({ id: null });
    },
    [onHoveredSliceChange, onSliceLeave],
  );
  const holeRadius = radius - lineWidth;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${2 * radius} ${2 * radius}`}
      className={cn(styles.pieChart, className)}
      {...props}
    >
      <defs>{svgResources}</defs>
      {slicesProps.map((item, idx) => (
        <>
          <defs>
            <pattern
              patternUnits="userSpaceOnUse"
              width={2 * radius}
              height={2 * radius}
              id={`pattern-${idx}`}
            >
              <image
                href={item.image}
                x="0"
                y="0"
                width={2 * radius}
                height={2 * radius}
              />
            </pattern>
          </defs>
          <Slice
            id={item.id}
            key={item.id}
            cx={radius}
            cy={radius}
            radius={radius}
            startAngle={item.startAngle}
            endAngle={item.endAngle}
            lineWidth={lineWidth}
            color={item.color}
            image={item.image ? `url(#pattern-${idx})` : undefined}
            label={item.label}
            labelStyle={item.labelStyle}
            rounded={roundedCorners}
            labelOffsetFromCenter={labelOffsetFromCenter}
            cursor={sliceCursor}
            showLabel={showLabels}
            onMouseEnter={handleSliceEnter}
            onMouseLeave={handleSliceLeave}
            onClick={onSliceClick}
            animation={item.animation}
          />
        </>
      ))}
      <circle cx={radius} cy={radius} r={holeRadius} fill={holeColor} />
      {centerLabel && (
        <text
          x="50%"
          y="50%"
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{
            fontSize: `${getCenterTextFontSizeByRadius(radius)}px`,
            ...centerLabel.style,
          }}
        >
          {centerLabel.text}
        </text>
      )}
    </svg>
  );
};

export default PieChart;
