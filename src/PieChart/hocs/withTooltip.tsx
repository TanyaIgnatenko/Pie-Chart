import React, { FC, useCallback, useState } from 'react';

import PieChart, { PieChartProps } from '../PieChart';
import ReactTooltip from 'react-tooltip';

export type TInjectedProps = {
  onHoveredPieChange: (id: number | null) => void;
};

function withTooltip(Component: typeof PieChart) {
  type OuterProps = Omit<PieChartProps, keyof TInjectedProps> & {
    tooltipClassName?: string;
  };

  const PieChartWithTooltip: FC<OuterProps> = ({
    data,
    tooltipClassName,
    ...props
  }) => {
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);

    const handleHoveredSliceChange = useCallback(
      ({ id }) => {
        setTooltipContent(() =>
          id ? data.find((item) => item.id === id)!.tooltipContent! : null,
        );
      },
      [data],
    );

    return (
      <div data-tip="" data-for="chart">
        <Component
          data={data}
          onHoveredSliceChange={handleHoveredSliceChange}
          {...props}
        />
        <ReactTooltip
          id="chart"
          getContent={() => tooltipContent}
          className={tooltipClassName}
        />
      </div>
    );
  };

  return PieChartWithTooltip;
}

export default withTooltip;
