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

    const gradient = <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor='white' />
                            <stop offset="60%" stopColor='#e66465'/>
                            <stop offset="80%" stopColor='white'/>
                    </radialGradient>;

    const data2 = [
        {
            id: 1,
            color: 'url(#grad1)',
            percentage: 15,
        },
        {
            id: 2,
            color: 'url(#grad1)',
            percentage: 25,
        },
        {
            id: 3,
            color: 'url(#grad1)',
            percentage: 20,
        },
        {
            id: 4,
            color: 'url(#grad1)',
            percentage: 40,
        },
    ];

    const GradientsTemplate: Story = () => {
        return (
            <div style={{ maxWidth: '400px' }}>
                <PieChart
                    data={data2}
                    radius={6}
                    // @ts-ignore
                    svgResources={gradient}
                />
            </div>
        );
    }

    export const Gradients = GradientsTemplate.bind({});
