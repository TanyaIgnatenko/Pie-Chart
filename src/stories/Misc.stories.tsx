    import React from 'react';
    // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
    import { Story, Meta } from '@storybook/react/types-6-0';

    import PieChart, { PieChartWithPush } from '../PieChart';
    import KiwiImage from './img/kiwi.svg';

    export default {
    title: 'PieChart/Misc',
    component: PieChart,
    } as Meta;

    const data = [
        {
            id: 1,
            image: KiwiImage,
            percentage: 15,
        },
        {
            id: 2,
            image: KiwiImage,
            percentage: 25,
        },
        {
            id: 3,
            image: KiwiImage,
            percentage: 20,
        },
        {
            id: 4,
            image: KiwiImage,
            percentage: 40,
        },
    ];

    const PatternsTemplate: Story = () => {
        return (
            <div style={{ maxWidth: '400px' }}>
                <PieChartWithPush data={data} radius={6} distanceOnPush={1}/>
            </div>
        );
    }

    export const Patterns = PatternsTemplate.bind({});
