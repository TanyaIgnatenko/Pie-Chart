import React, { FC, ReactNode, useCallback } from 'react';
import { makeAsFirstChildOf } from '../../utils/node';

import PieChart, { PieChartProps } from '../PieChart';

export type TInjectedProps = {
  onSliceEnter?: (sliceNode: ReactNode) => void;
  onSliceLeave?: (sliceNode: ReactNode) => void;
};

function withPush(Component: typeof PieChart) {
  type OuterProps = Omit<PieChartProps, keyof TInjectedProps> & {
    elevationDistance?: number;
  };

  const PieChartWithPush: FC<OuterProps> = ({
    elevationDistance = 30,
    ...props
  }) => {
    const handleSliceEnter = useCallback(
      // Group of pie and its label
      ({ sliceNode: currentSliceGroup }) => {
        const currentSliceNode = currentSliceGroup.firstChild;
        const allSlicesParent = currentSliceGroup.parentNode;

        makeAsFirstChildOf(allSlicesParent, currentSliceGroup);

        currentSliceNode.style.strokeWidth =
          parseInt(currentSliceNode.getAttribute('stroke-width'), 10) +
          elevationDistance;
      },
      [elevationDistance],
    );

    const handleSliceLeave = useCallback(({ sliceNode: sliceNodeGroup }) => {
      const sliceNode = sliceNodeGroup.firstChild;
      sliceNode.style.strokeWidth = sliceNode.getAttribute('stroke-width');
    }, []);

    return (
      <Component
        onSliceEnter={handleSliceEnter}
        onSliceLeave={handleSliceLeave}
        sliceCursor="pointer"
        {...props}
      />
    );
  };

  return PieChartWithPush;
}

export default withPush;
