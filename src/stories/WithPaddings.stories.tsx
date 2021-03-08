import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PieChart from '../PieChart';
import { hidedProps } from './common';

export default {
  title: 'PieChart',
  component: PieChart,
  argTypes: {
    ...hidedProps,
    lineWidth: {
      name: 'line width',
      defaultValue: 100,
      control: {
        type: 'number',
        min: 0,
        max: 249,
      },
      table: {
        disable: false
      }
    },
    paddingAngle: {
      name: 'padding angle',
      defaultValue: 15,
      control: {
        type: 'number',
        min: 0,
        max: 89,
      },
      table: {
        disable: false
      }
    }
  }
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

const Template: Story = ({ lineWidth, paddingAngle }) => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChart data={data} radius={250} lineWidth={lineWidth} paddingAngle={paddingAngle} />
      </div>
  );
}

export const WithPaddings = Template.bind({});
