import noop from 'lodash/noop';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import partialCircle from 'svg-partial-circle';
import { CSSTransition } from 'react-transition-group';

import {
    getRightTriangleX,
    getRightTriangleY,
    svgAngleToStandart,
    getSliceLength, getAngle,
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
    animationDelay: number;
    animationDuration: number;
    animationTimingFunction: string;
    startPositionAnimated: boolean;
    lengthAnimated: boolean;
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
                                                    animationDelay,
                                                    animationDuration,
                                                    animationTimingFunction,
                                                    startPositionAnimated,
                                                    lengthAnimated,
                                                    ...props
                                                }) => {
    const innerRadius = radius - lineWidth / 2;

    const sliceLength = useMemo(() => {
        const angle = getAngle(startAngle, endAngle);

        return getSliceLength(angle, innerRadius);
    }, [startAngle, endAngle, innerRadius]);

    const pathCommands = useMemo(() => {
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
    }, [startAngle, endAngle, rounded, lineWidth, radius, cx, cy, innerRadius]);

    const midAngle = useMemo(() => {
        const angle = getAngle(startAngle, endAngle);
        const halfAngle = angle / 2;
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

    const handleMouseEnter = useCallback(() => {
        onMouseEnter(id, partialCircleGroupRef.current, midAngle);
    }, [id, midAngle, onMouseEnter]);

    const handleMouseLeave = useCallback(() => {
        onMouseLeave(id, partialCircleGroupRef.current, midAngle);
    }, [id, midAngle, onMouseLeave]);

    const handleClick = useCallback(() => {
        onClick(id, partialCircleGroupRef.current, midAngle);
    }, [id, midAngle, onClick]);

    const partialCircleGroupRef = useRef(null);

    const animatedStartAngleStartValue = (startPositionAnimated ?
        (startAngle > 0 ? -(90 + startAngle) : -(90 + startAngle))
        : 0) + 'deg'

    return (
        <g
            ref={partialCircleGroupRef}
            style={{
                cursor,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            tabIndex={0}
        >
            <CSSTransition
                appear
                in={true}
                timeout={1000}
                classNames={{
                    appear: styles.sliceAppear,
                    appearActive: styles.sliceAppearActive,
                    appearDone: styles.sliceAppearDone,
                }}
            >
                <path
                    style={{
                        // @ts-ignore
                        '--slice-length-start-value': lengthAnimated ? 0 : sliceLength,
                        '--slice-length-end-value': sliceLength,
                        '--start-angle-start-value': animatedStartAngleStartValue,
                        '--animation-duration': animationDuration,
                        '--animation-delay': animationDelay,
                        '--timing-function': animationTimingFunction,
                    }}
                    d={pathCommands}
                    fill="none"
                    strokeWidth={lineWidth}
                    stroke={color}
                    strokeLinecap={rounded ? 'round' : undefined}
                    {...props}
                />
            </CSSTransition>
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
