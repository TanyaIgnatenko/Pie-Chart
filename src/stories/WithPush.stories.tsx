import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PieChartWithPush } from '../PieChart';

export default {
  title: 'PieChart/withPushOnInteraction',
  component: PieChartWithPush,
} as Meta;

const data = [
  {
    id: 1,
    color: '#F5D695',
    percentage: 15,
    tooltipContent: 'Value: 15%',
  },
  {
    id: 2,
    color: '#F5876E',
    percentage: 25,
    tooltipContent: 'Value: 25%',
  },
  {
    id: 3,
    color: '#F54F72',
    percentage: 20,
    tooltipContent: 'Value: 20%',
  },
  {
    id: 4,
    color: '#AB4470',
    percentage: 40,
    tooltipContent: 'Value: 40%',
  },
];

const DefaultTemplate: Story = () => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChartWithPush data={data} radius={50} />
      </div>
  );
}

export const Default = DefaultTemplate.bind({});

const CustomTemplate: Story = () => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChartWithPush data={data} radius={50} distanceOnPush={7}/>
      </div>
  );
}

export const Custom = CustomTemplate.bind({});

const DonutTemplate: Story = () => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChartWithPush data={data} radius={50} lineWidth={30} distanceOnPush={7}/>
      </div>
  );
}

export const Donut = DonutTemplate.bind({});

const withLabelsData = data.map((item) => ({
  ...item,
  label: item.percentage + '%',
  labelStyle: {
    fill: 'white',
    fontSize: '27.5px',
  }
}));

const WithLabelsTemplate: Story = () => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChartWithPush data={withLabelsData} radius={250} lineWidth={100} showLabels distanceOnPush={7}/>
      </div>
  );
}

export const WithLabels = WithLabelsTemplate.bind({});

const OnHoverTemplate: Story = () => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChartWithPush data={withLabelsData} radius={250} lineWidth={100} showLabels distanceOnPush={7} event="hover"/>
      </div>
  );
}

export const OnHover = OnHoverTemplate.bind({});
