import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PieChart from '../PieChart';

export default {
  title: 'PieChart',
  component: PieChart,
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

const Template: Story = (args) => {
  return (
      <div style={{ maxWidth: '400px' }}>
        <PieChart data={data} radius={250} lineWidth={100} paddingAngle={15} />
      </div>
  );
}

export const WithPaddings = Template.bind({});
