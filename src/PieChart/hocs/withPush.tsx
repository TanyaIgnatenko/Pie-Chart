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
import { pushPieItemNode, unpushPieItemNode } from './utils/push';

export type TInjectedProps = {
  onPieItemEnter?: (pieNode: ReactNode, midAngle: number) => void;
  onPieItemLeave?: (pieNode: ReactNode, midAngle: number) => void;
  onPieItemClick?: (id: number, pieNode: ReactNode, midAngle: number) => void;
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

    const handlePieItemClick = useCallback(
      (id, pieNode, midAngle) => {
        pushedStates[id]
          ? unpushPieItemNode(pieNode)
          : pushPieItemNode(pieNode, midAngle, distanceOnPush);

        setPushedStates((states) => ({
          ...states,
          [id]: !states[id],
        }));
      },
      [distanceOnPush, pushedStates],
    );

    const handlePieItemEnter = useCallback(
      (pieNode, midAngle) => {
        pushPieItemNode(pieNode, midAngle, distanceOnPush);
      },
      [distanceOnPush],
    );

    const handlePieItemLeave = useCallback((pieNode) => {
      unpushPieItemNode(pieNode);
    }, []);

    return (
      <Component
        data={data}
        onPieItemClick={event === 'click' ? handlePieItemClick : undefined}
        onPieItemEnter={event === 'hover' ? handlePieItemEnter : undefined}
        onPieItemLeave={event === 'hover' ? handlePieItemLeave : undefined}
        pieItemCursor="pointer"
        {...props}
      />
    );
  };

  return PieChartWithPush;
}

export default withPush;
