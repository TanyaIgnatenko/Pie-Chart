import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PieChart from '../PieChart';
import { getAngle } from '../utils/math';
import { hidedProps } from './common';

export default {
    title: 'PieChart/Animations',
    component: PieChart,
    argTypes: {
        ...hidedProps,
    },
} as Meta;

const data = [
    {
        id: 1,
        color: '#F5D695',
        percentage: 15,
    },
    {
        id: 2,
        color: '#F5876E',
        percentage: 25,
    },
    {
        id: 3,
        color: '#F54F72',
        percentage: 20,
    },
    {
        id: 4,
        color: '#AB4470',
        percentage: 40,
    },
];

const LengthAndPositionTemplate: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0,
                    startDelay: 0,
                    duration: 1,
                    timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                    startPositionAnimated: true,
                    lengthAnimated: true,
                }}
            />
        </div>
    );
}

export const LengthAndPosition = LengthAndPositionTemplate.bind({});

const OnlyLengthTemplate: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0,
                    startDelay: 0,
                    duration: 0.7,
                    timingFunction: 'ease-out',
                    startPositionAnimated: false,
                    lengthAnimated: true,
                }}
            />
        </div>
    );
}

export const OnlyLength = OnlyLengthTemplate.bind({});

const OnlyPositionTemplate: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0,
                    startDelay: 0,
                    duration: 0.9,
                    timingFunction: 'ease-out',
                    startPositionAnimated: true,
                    lengthAnimated: false,
                }}
            />
        </div>
    );
}

export const OnlyPosition = OnlyPositionTemplate.bind({});

const DurationBasedOnLengthTemplate: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0,
                    startDelay: 0,
                    duration: (startAngle, endAngle) => {
                        return 1.2 / 180 * getAngle(startAngle, endAngle);
                    },
                    timingFunction: 'ease-out',
                    startPositionAnimated: false,
                    lengthAnimated: true,
                }}
            />
        </div>
    );
}

export const DurationBasedOnLength = DurationBasedOnLengthTemplate.bind({});

const SequentiallyTemplate: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0,
                    startDelay: 0,
                    duration: 0.4,
                    timingFunction: 'linear',
                    lengthAnimated: true,
                }}
            />
        </div>
    );
}

export const Sequentially = SequentiallyTemplate.bind({});

const WithDelays1Template: Story = (args) => {
    return (
        <div style={{ maxWidth: '400px' }}>
            <PieChart
                data={data}
                radius={250}
                lineWidth={100}
                animation={{
                    delay: 0.2,
                    startDelay: 0,
                    duration: 0.3,
                    timingFunction: 'ease-out',
                    lengthAnimated: true,
                }}
            />
        </div>
    );
}

export const WithDelays = WithDelays1Template.bind({});
