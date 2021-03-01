import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import sumBy from 'lodash/sumBy';

import PartialCircle from '../PartialCircle';

import styles from './PieChart.module.scss';

export type PieChartItem = {
  percentage: number;
  color: string;
  label?: string;
};

export type PieChartProps = {
  data: PieChartItem[];
  radius: number;
  lineWidth?: number;
  startAngle?: number;
  paddingAngle?: number;
  roundedCorners?: boolean;
  showLabels?: boolean;
  className?: string;
};

export type PieChartMappedItem = {
  startAngle: number;
  endAngle: number;
  color: string;
  label?: string;
};

const PieChart: FC<PieChartProps> = ({
  data,
  radius,
  lineWidth = radius,
  startAngle: chartStartAngle = -90,
  paddingAngle = 0,
  roundedCorners = false,
  showLabels = false,
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
      (state, item) => {
        const itemDegree = item.percentage * (dataDegrees / 100);
        const startAngle = state.nextItemStartAngle;
        const mappedItem = {
          color: item.color,
          label: item.label,
          startAngle,
          endAngle: startAngle + itemDegree,
        };

        return {
          mappedData: state.mappedData.concat(mappedItem),
          nextItemStartAngle: mappedItem.endAngle + paddingAngle,
        };
      },
      {
        mappedData: [] as PieChartMappedItem[],
        nextItemStartAngle: chartStartAngle,
      },
    );
  }, [chartStartAngle, data, paddingAngle]);

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${2 * radius} ${2 * radius}`}
      className={cn(styles.pieChart, className)}
    >
      {mappedData.map((item) => (
        <PartialCircle
          key={item.color}
          cx={radius}
          cy={radius}
          radius={radius}
          startAngle={item.startAngle}
          endAngle={item.endAngle}
          lineWidth={lineWidth}
          color={item.color}
          label={item.label}
          rounded={roundedCorners}
          showLabel={showLabels}
        />
      ))}
    </svg>
  );
};

export default PieChart;
