import React, { FC, ReactNode, useCallback, useMemo } from 'react';
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
};

export type PieChartMappedItem = {
  id: number;
  startAngle: number;
  endAngle: number;
  color: string;
  label?: string;
  labelStyle?: object;
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
          id: item.id,
          color: item.color,
          label: item.label,
          labelStyle: item.labelStyle,
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

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${2 * radius} ${2 * radius}`}
      className={cn(styles.pieChart, className)}
    >
      {mappedData.map((item) => (
        <PartialCircle
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
