import { PieChartDataItem, AnimationProps } from '../PieChart';
import { useMemo } from 'react';
import sumBy from 'lodash/sumBy';
import { SliceAnimationProps } from '../Slice';

export type SliceProps = {
  id: number;
  startAngle: number;
  endAngle: number;
  color?: string;
  image?: string;
  label?: string;
  labelStyle?: object;
  animation: SliceAnimationProps;
};

type UseSlicesProps = (
  data: PieChartDataItem[],
  chartStartAngle: number,
  paddingAngle: number,
  animation: AnimationProps,
) => SliceProps[];

export const useSlicesProps: UseSlicesProps = (
  data,
  chartStartAngle,
  paddingAngle,
  animation,
) => {
  const { slicesProps } = useMemo(() => {
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
        const endAngle = startAngle + itemDegree;

        const {
          delayBetweenSlices = 0,
          duration = 0,
          timingFunction = 'linear',
          startPositionAnimated = false,
          lengthAnimated = false,
        } = animation;

        const animationDelay = state.nextItemDelay;
        const animationDuration =
          typeof duration === 'function'
            ? duration(startAngle, endAngle)
            : duration;

        const sliceProps = {
          id: item.id,
          color: item.color,
          image: item.image,
          label: item.label,
          labelStyle: item.labelStyle,
          startAngle,
          endAngle,
          animation: {
            delay: animationDelay,
            duration: animationDuration,
            startPositionAnimated: startPositionAnimated,
            timingFunction: timingFunction || 'linear',
            lengthAnimated: lengthAnimated,
          },
        };

        return {
          slicesProps: state.slicesProps.concat(sliceProps),
          nextItemStartAngle: sliceProps.endAngle + paddingAngle,
          nextItemDelay: delayBetweenSlices
            ? animationDelay + animationDuration + delayBetweenSlices
            : 0,
        };
      },
      {
        slicesProps: [] as SliceProps[],
        nextItemStartAngle: chartStartAngle,
        nextItemDelay: animation.startDelay || 0,
      },
    );
  }, [animation, chartStartAngle, data, paddingAngle]);

  return slicesProps;
};
