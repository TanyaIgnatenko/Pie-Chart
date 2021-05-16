import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PieChartWithTooltip } from '../PieChart';
import { hidedProps } from './common';

export default {
  title: 'PieChart',
  component: PieChartWithTooltip,
  argTypes: {
    ...hidedProps,
  },
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

const Template: Story = () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChartWithTooltip data={data} />
    </div>
  );
};

export const Tooltip = Template.bind({});
