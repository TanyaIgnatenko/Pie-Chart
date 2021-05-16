import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PieChartWithElevation, PieChartWithPush } from '../PieChart';
import { hidedProps } from './common';

export default {
  title: 'PieChart/WithElevationOnHover',
  component: PieChartWithPush,
  argTypes: {
    ...hidedProps,
  },
} as Meta;

const data = [
  {
    id: 1,
    color: '#F5D695',
    percentage: 15,
    label: '15%',
    labelStyle: {
      fontSize: '41.5px',
      fill: 'white',
    },
  },
  {
    id: 2,
    color: '#F5876E',
    percentage: 25,
    label: '25%',
    labelStyle: {
      fontSize: '41.5px',
      fill: 'white',
    },
  },
  {
    id: 3,
    color: '#F54F72',
    percentage: 20,
    label: '20%',
    labelStyle: {
      fontSize: '41.5px',
      fill: 'white',
    },
  },
  {
    id: 4,
    color: '#AB4470',
    percentage: 40,
    label: '40%',
    labelStyle: {
      fontSize: '41.5px',
      fill: 'white',
    },
  },
];

const Template: Story = () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChartWithElevation data={data} radius={250} />
    </div>
  );
};

export const WithElevationOnHover = Template.bind({});

const DonutTemplate: Story = () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChartWithElevation
        data={data}
        radius={250}
        lineWidth={200}
        holeColor="#fff"
      />
    </div>
  );
};

export const WithElevationOnHoverDonut = DonutTemplate.bind({});
