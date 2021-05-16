import noop from 'lodash/noop';
import { CSSTransition } from 'react-transition-group';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useRef,
} from 'react';

import { useMidAngle } from './hooks/useMidAngle';
import { useArcLength } from './hooks/useArcLength';
import { useSliceTextPoint } from './hooks/useSliceTextPoint';
import { useSlicePathCommands } from './hooks/useSlicePathCommands';

import styles from './Slice.module.scss';

export type MouseSliceEventHandler = (sliceInfo: {
  id: number | null;
  sliceNode?: ReactNode;
  midAngle?: number;
}) => void;

export type SliceAnimationProps = {
  delay: number;
  duration: number;
  timingFunction: string;
  startPositionAnimated: boolean;
  lengthAnimated: boolean;
};

type TPartialCircleProps = {
  id: number;
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  lineWidth: number;
  label?: string;
  labelStyle?: CSSProperties;
  color?: string;
  image?: string;
  rounded?: boolean;
  showLabel?: boolean;
  cursor?: 'pointer' | 'default';
  labelOffsetFromCenter?: number;
  onMouseEnter?: MouseSliceEventHandler;
  onMouseLeave?: MouseSliceEventHandler;
  onClick?: MouseSliceEventHandler;
  animation: SliceAnimationProps;
};

const getSliceFontSizeByRadius = (radius: number) => radius * 0.125;

const Slice: FC<TPartialCircleProps> = ({
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
  image,
  rounded = false,
  showLabel = false,
  labelOffsetFromCenter = 0,
  cursor = 'default',
  onMouseEnter = noop,
  onMouseLeave = noop,
  onClick = noop,
  animation,
  ...props
}) => {
  const innerRadius = radius - lineWidth / 2;

  const sliceLength = useArcLength(startAngle, endAngle, innerRadius);
  const pathCommands = useSlicePathCommands(
    cx,
    cy,
    radius,
    innerRadius,
    lineWidth,
    startAngle,
    endAngle,
    rounded,
  );
  const midAngle = useMidAngle(startAngle, endAngle);
  const textPoint = useSliceTextPoint(
    cx,
    cy,
    radius,
    lineWidth,
    midAngle,
    labelOffsetFromCenter,
  );

  const handleMouseEnter = useCallback(() => {
    onMouseEnter({ id, sliceNode: partialCircleGroupRef.current, midAngle });
  }, [id, midAngle, onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave({ id, sliceNode: partialCircleGroupRef.current, midAngle });
  }, [id, midAngle, onMouseLeave]);

  const handleClick = useCallback(() => {
    onClick({ id, sliceNode: partialCircleGroupRef.current, midAngle });
  }, [id, midAngle, onClick]);

  const partialCircleGroupRef = useRef(null);

  const animatedStartAngleStartValue =
    (!animation.startPositionAnimated ? 0 : -(startAngle + 90)) + 'deg';

  return (
    <g
      ref={partialCircleGroupRef}
      style={{
        cursor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <CSSTransition
        appear
        in={true}
        timeout={(animation.delay + animation.duration) * 1000}
        classNames={{
          appear: styles.sliceAppear,
          appearActive: styles.sliceAppearActive,
          appearDone: styles.sliceAppearDone,
        }}
      >
        <path
          style={{
            // @ts-ignore
            '--slice-length-start-value': animation.lengthAnimated
              ? 0
              : sliceLength,
            '--slice-length-end-value': sliceLength,
            '--start-angle-start-value': animatedStartAngleStartValue,
            '--animation-duration': animation.duration,
            '--animation-delay': animation.delay,
            '--timing-function': animation.timingFunction,
          }}
          d={pathCommands}
          fill="none"
          strokeWidth={lineWidth}
          stroke={image || color}
          strokeLinecap={rounded ? 'round' : undefined}
          className={styles.slice}
          {...props}
        />
      </CSSTransition>
      {showLabel && (
        <text
          x={textPoint.x}
          y={textPoint.y}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          className={styles.label}
          style={{
            fontSize: `${getSliceFontSizeByRadius(radius)}px`,
            ...labelStyle,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default Slice;
