import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { useSprings } from 'react-spring';

import cn from 'classnames';
import noop from 'lodash/noop';
import sumBy from 'lodash/sumBy';

import PartialCircle from '../PartialCircle';

import styles from './PieChart.module.scss';

export type PieChartItem = {
    id: number;
    percentage: number;
    color: string;
    label?: string;
    tooltipContent?: string;
    labelStyle?: object;
};

export type PieChartProps = {
    data: PieChartItem[];
    radius?: number;
    lineWidth?: number;
    startAngle?: number;
    paddingAngle?: number;
    roundedCorners?: boolean;
    showLabels?: boolean;
    labelOffsetFromCenter?: number;
    pieItemCursor?: 'pointer' | 'default';
    onPieItemEnter?: (pieNode: ReactNode, midAngle: number) => void;
    onPieItemLeave?: (pieNode: ReactNode, midAngle: number) => void;
    onPieItemClick?: (id: number, pieNode: ReactNode, midAngle: number) => void;
    onHoveredPieChange?: (id: number | null) => void;
    holeColor?: string;
    className?: string;
    animation?: {
        delay?: number,
        startDelay?: number,
        duration?: number | ((startAngle: number, endAngle: number) => number),
        timingFunction?: string,
        startPositionAnimated?: boolean,
        lengthAnimated?: boolean,
    }
};

export type PieChartMappedItem = {
    id: number;
    startAngle: number;
    endAngle: number;
    color: string;
    label?: string;
    labelStyle?: object;
    animation: {
        delay: number,
        duration: number,
        timingFunction: string,
        startPositionAnimated: boolean,
        lengthAnimated: boolean,
    }
};

const PieChart: FC<PieChartProps> = ({
                                         data,
                                         radius = 10,
                                         lineWidth = radius,
                                         startAngle: chartStartAngle = -90,
                                         paddingAngle = 0,
                                         labelOffsetFromCenter = 0,
                                         roundedCorners = false,
                                         showLabels = false,
                                         pieItemCursor,
                                         onPieItemEnter = noop,
                                         onPieItemLeave = noop,
                                         onPieItemClick = noop,
                                         onHoveredPieChange = noop,
                                         holeColor = '#fff',
                                         animation = {
                                             delay: 0,
                                             startDelay: 0,
                                             duration: 0,
                                             timingFunction: 'linear',
                                             startPositionAnimated: false,
                                             lengthAnimated: false,
                                         },
                                         className,
                                     }) => {
    const { mappedData } = useMemo(() => {
        const isDataTakesWholeCircle = sumBy(data, 'percentage') === 100;
        const paddingsCount = isDataTakesWholeCircle
            ? data.length
            : data.length - 1;
        const paddingsDegrees = paddingAngle * paddingsCount;
        const dataDegrees = 360 - paddingsDegrees;

        return data.reduce(
            (state, item, idx) => {
                const itemDegree = item.percentage * (dataDegrees / 100);
                const startAngle = state.nextItemStartAngle;
                const endAngle = startAngle + itemDegree;

                const {
                    delay = 0,
                    duration = 0,
                    timingFunction = 'linear',
                    startPositionAnimated = false,
                    lengthAnimated = false
                } = animation;
                const animationDelay = state.nextItemDelay;
                const animationDuration = typeof duration === 'function'
                    ? duration(startAngle, endAngle)
                    : duration;

                const mappedItem = {
                    id: item.id,
                    color: item.color,
                    label: item.label,
                    labelStyle: item.labelStyle,
                    startAngle,
                    endAngle,
                    animation: {
                        delay: animationDelay,
                        duration: animationDuration,
                        startPositionAnimated: startPositionAnimated,
                        timingFunction: timingFunction || 'linear',
                        lengthAnimated: lengthAnimated,
                    }
                };
                console.log('mappedItem.animation', mappedItem.animation);

                return {
                    mappedData: state.mappedData.concat(
                        mappedItem
                    ),
                    nextItemStartAngle: mappedItem.endAngle + paddingAngle,
                    nextItemDelay: animationDelay + animationDuration + delay,
                };
            },
            {
                mappedData: [] as PieChartMappedItem[],
                nextItemStartAngle: chartStartAngle,
                nextItemDelay: animation.startDelay || 0,
            },
        );
    }, [animation, chartStartAngle, data, paddingAngle]);

    const handlePieItemEnter = useCallback(
        (id, pieNode, midAngle) => {
            onPieItemEnter(pieNode, midAngle);

            onHoveredPieChange(id);
        },
        [onHoveredPieChange, onPieItemEnter],
    );
    const handlePieItemLeave = useCallback(
        (id, pieNode, midAngle) => {
            onPieItemLeave(pieNode, midAngle);

            onHoveredPieChange(null);
        },
        [onHoveredPieChange, onPieItemLeave],
    );

    const holeRadius = radius - lineWidth;

    const endAngles = useSprings(mappedData.length,
        mappedData.map((item) => ({
            endAngle: item.endAngle,
            from: {
                endAngle: item.startAngle,
            }
        }))// @ts-ignore
    ).map(({ endAngle: { value } }) => value);

    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${2 * radius} ${2 * radius}`}
            className={cn(styles.pieChart, className)}
        >
            {mappedData.map((item) =>
                (<PartialCircle
                        id={item.id}
                        key={item.id}
                        cx={radius}
                        cy={radius}
                        radius={radius}
                        startAngle={item.startAngle}
                        endAngle={item.endAngle}
                        lineWidth={lineWidth}
                        color={item.color}
                        label={item.label}
                        labelStyle={item.labelStyle}
                        rounded={roundedCorners}
                        labelOffsetFromCenter={labelOffsetFromCenter}
                        cursor={pieItemCursor}
                        showLabel={showLabels}
                        onMouseEnter={handlePieItemEnter}
                        onMouseLeave={handlePieItemLeave}
                        onClick={onPieItemClick}
                        animationDuration={item.animation.duration}
                        animationDelay={item.animation.delay}
                        animationTimingFunction={item.animation.timingFunction}
                        lengthAnimated={item.animation.lengthAnimated}
                        startPositionAnimated={item.animation.startPositionAnimated}

                    />
                ))}
            <circle
                cx={radius}
                cy={radius}
                r={holeRadius}
                fill={holeColor}
            />
        </svg>
    );
};

export default PieChart;
