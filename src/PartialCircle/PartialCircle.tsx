import React, { FC, useMemo } from 'react';
import partialCircle from 'svg-partial-circle';

import { toRadians } from '../utils/angle';

type TPartialCircleProps = {
    cx: number;
    cy: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    width: number;
    color: string;
};

const PartialCircle: FC<TPartialCircleProps> = ({
                                                    cx,
                                                    cy,
                                                    radius,
                                                    startAngle,
                                                    endAngle,
                                                    width,
                                                    color,
                                                    ...props
                                                }) => {

    const pathCommands = useMemo(() => {
        return partialCircle(
            cx,
            cy,
            radius,
            toRadians(startAngle),
            toRadians(endAngle),
        )
            .map((command) => {
                return command.join(' ')
            })
            .join();
    }, [cx, cy, endAngle, radius, startAngle]);

    return (
        <path
            d={pathCommands}
            fill="none"
            strokeWidth={width}
            stroke={color}
            {...props}
        />
    );
};

export default PartialCircle;
