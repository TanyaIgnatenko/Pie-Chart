import React, { FC, useCallback, useState } from 'react';

import PieChart, { PieChartItem, PieChartProps } from '../PieChart';
import ReactTooltip from 'react-tooltip';

export type TInjectedProps = {
  onHoveredPieChange: (id: number | null) => void;
};

export type TooltipState = {
  content?: string;
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

    const handleHoveredPieChange = useCallback(
      (id) => {
        setTooltipContent(() =>
          id
            ? data.find((item: PieChartItem) => item.id === id)!.tooltipContent!
            : null,
        );
      },
      [data],
    );
    return (
      <div data-tip="" data-for="chart">
        <Component
          data={data}
          onHoveredPieChange={handleHoveredPieChange}
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
