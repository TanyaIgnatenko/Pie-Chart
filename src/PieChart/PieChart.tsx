import React, { FC, useCallback } from 'react';
import { useMemo } from 'react';
import cn from 'classnames';

import styles from './PieChart.module.scss';

export type PieChartItem = {
    percentage: number;
    color: string;
};

export type PieChartProps = {
    data: PieChartItem[];
    radius: number;
    className?: string;
};

export type PieChartMappedItem = {
    length: number;
    offset: number;
    color: string;
};

const PieChart: FC<PieChartProps> = ({data, radius, className}) => {
    const circleLength = useMemo(() => {
        return 2 * Math.PI * radius;
    }, [radius]);

    const toCircleLength = useCallback((percentage) => {
        return percentage * (circleLength / 100);
    }, [circleLength]);

    const { mappedData } = data.reduce((state, item) => {
        const itemLength = toCircleLength(item.percentage);
        const mappedItem = {
            color: item.color,
            length: itemLength,
            offset: state.nextItemOffset,
        }

        return {
            mappedData: state.mappedData.concat(mappedItem),
            nextItemOffset: state.nextItemOffset + itemLength,
        };
    }, {
        mappedData: [] as PieChartMappedItem[],
        nextItemOffset: 0,
    });

    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${2*radius} ${2*radius}`}
            className={cn(styles.pieChart, className)}
        >
            {
                mappedData.map(item => (
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        strokeWidth={2*radius}
                        strokeDasharray={`${item.length} ${circleLength}`}
                        strokeDashoffset={-item.offset}
                        stroke={item.color}
                    />
                ))
            }
        </svg>
    );
};

export default PieChart;
