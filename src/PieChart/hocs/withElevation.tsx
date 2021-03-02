import React, { FC, ReactNode, useCallback } from 'react';
import { makeAsFirstChildOf } from '../../utils/node';

import PieChart, { PieChartProps } from '../PieChart';

export type TInjectedProps = {
  onPieItemEnter?: (pieNode: ReactNode) => void;
  onPieItemLeave?: (pieNode: ReactNode) => void;
};

function withPush(Component: typeof PieChart) {
  type OuterProps = Omit<PieChartProps, keyof TInjectedProps> & {
    elevationDistance?: number;
  };

  const PieChartWithPush: FC<OuterProps> = ({
    elevationDistance = 30,
    ...props
  }) => {
    const handlePieItemEnter = useCallback(
        // Group of pie and its label
      (currentPieGroup) => {
        const currentPieNode = currentPieGroup.firstChild;
        const allPiesParent = currentPieGroup.parentNode;

        makeAsFirstChildOf(allPiesParent, currentPieGroup);

        currentPieNode.style.strokeWidth =
          parseInt(currentPieNode.getAttribute('stroke-width'), 10) +
          elevationDistance;
      },
      [elevationDistance],
    );

    const handlePieItemLeave = useCallback((pieNodeGroup) => {
      const pieNode = pieNodeGroup.firstChild;
      pieNode.style.strokeWidth = pieNode.getAttribute('stroke-width');
    }, []);

    return (
      <Component
        onPieItemEnter={handlePieItemEnter}
        onPieItemLeave={handlePieItemLeave}
        pieItemCursor="pointer"
        {...props}
      />
    );
  };

  return PieChartWithPush;
}

export default withPush;
