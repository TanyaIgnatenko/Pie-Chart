import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';

import PieChart, { PieChartProps } from '../PieChart';
import { pushSliceNode, unpushSliceNode } from './utils/push';

export type TInjectedProps = {
  onSliceEnter?: (sliceNode: ReactNode, midAngle: number) => void;
  onSliceLeave?: (sliceNode: ReactNode, midAngle: number) => void;
  onSliceClick?: (id: number, sliceNode: ReactNode, midAngle: number) => void;
};

function withPush(Component: typeof PieChart) {
  type OuterProps = Omit<PieChartProps, keyof TInjectedProps> & {
    event?: 'click' | 'hover';
    distanceOnPush?: number;
  };

  const PieChartWithPush: FC<OuterProps> = ({
    data,
    event = 'click',
    distanceOnPush = 2,
    ...props
  }) => {
    const initialPushedStates = useMemo(() => {
      return mapValues(keyBy(data, 'id'), () => false);
    }, [data]);

    const [pushedStates, setPushedStates] = useState(initialPushedStates);

    useEffect(() => {
      setPushedStates(initialPushedStates);
    }, [initialPushedStates]);

    const handleSliceClick = useCallback(
      ({ id, sliceNode, midAngle }) => {
        pushedStates[id]
          ? unpushSliceNode(sliceNode)
          : pushSliceNode(sliceNode, midAngle, distanceOnPush);

        setPushedStates((states) => ({
          ...states,
          [id]: !states[id],
        }));
      },
      [distanceOnPush, pushedStates],
    );

    const handleSliceEnter = useCallback(
      ({ sliceNode, midAngle }) => {
        pushSliceNode(sliceNode, midAngle, distanceOnPush);
      },
      [distanceOnPush],
    );

    const handleSliceLeave = useCallback(({ sliceNode }) => {
      unpushSliceNode(sliceNode);
    }, []);

    return (
      <Component
        data={data}
        onSliceClick={event === 'click' ? handleSliceClick : undefined}
        onSliceEnter={event === 'hover' ? handleSliceEnter : undefined}
        onSliceLeave={event === 'hover' ? handleSliceLeave : undefined}
        sliceCursor="pointer"
        {...props}
      />
    );
  };

  return PieChartWithPush;
}

export default withPush;
