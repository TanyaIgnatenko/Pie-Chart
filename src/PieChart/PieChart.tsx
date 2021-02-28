import React, { FC } from 'react';
import cn from 'classnames';

import PartialCircle from '../PartialCircle';

import styles from './PieChart.module.scss';

export type PieChartItem = {
    percentage: number;
    color: string;
};

export type PieChartProps = {
    startAngle?: number;
    data: PieChartItem[];
    radius: number;
    className?: string;
};

export type PieChartMappedItem = {
    startAngle: number;
    endAngle: number;
    color: string;
};

const PieChart: FC<PieChartProps> = ({
                                         startAngle: chartStartAngle = -90,
                                         data,
                                         radius,
                                         className
                                     }) => {
    const { mappedData } = data.reduce((state, item) => {
        const itemDegree = item.percentage * (360 / 100);
        const startAngle = state.nextItemStartAngle;
        const mappedItem = {
            color: item.color,
            startAngle,
            endAngle: startAngle + itemDegree,
        }

        return {
            mappedData: state.mappedData.concat(mappedItem),
            nextItemStartAngle: mappedItem.endAngle,
        };
    }, {
        mappedData: [] as PieChartMappedItem[],
        nextItemStartAngle: chartStartAngle,
    });

    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${2 * radius} ${2 * radius}`}
            className={cn(styles.pieChart, className)}
        >
            {
                mappedData.map(item => (
                    <PartialCircle
                        key={item.color}
                        cx={radius}
                        cy={radius}
                        radius={radius}
                        startAngle={item.startAngle}
                        endAngle={item.endAngle}
                        width={2 * radius}
                        color={item.color}
                    />
                ))
            }
        </svg>
    );
};

export default PieChart;
