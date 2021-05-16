import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PieChart from '../PieChart';
import { hidedProps } from './common';

export default {
  title: 'PieChart/Labels',
  component: PieChart,
  argTypes: {
    ...hidedProps,
  },
} as Meta;

const defaultData = [
  {
    id: 1,
    color: '#F5D695',
    percentage: 15,
    label: '15%',
    labelStyle: {
      fill: 'white',
    },
  },
  {
    id: 2,
    color: '#F5876E',
    percentage: 25,
    label: '25%',
    labelStyle: {
      fill: 'white',
    },
  },
  {
    id: 3,
    color: '#F54F72',
    percentage: 20,
    label: '20%',
    labelStyle: {
      fill: 'white',
    },
  },
  {
    id: 4,
    color: '#AB4470',
    percentage: 40,
    label: '40%',
    labelStyle: {
      fill: 'white',
    },
  },
];

const DefaultTemplate: Story = (args) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChart data={defaultData} showLabels radius={100} />
    </div>
  );
};

export const Default = DefaultTemplate.bind({});

const DonutTemplate: Story = (args) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChart data={defaultData} radius={250} lineWidth={100} showLabels />
    </div>
  );
};

export const Donut = DonutTemplate.bind({});

const innerData = defaultData.map((item) => ({
  ...item,
  labelStyle: {
    ...item.labelStyle,
    fill: 'black',
  },
}));

const InnerTemplate: Story = (args) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <PieChart
        data={innerData}
        radius={250}
        lineWidth={100}
        showLabels
        labelOffsetFromCenter={-100}
      />
    </div>
  );
};

export const Inner = InnerTemplate.bind({});

const outerData = innerData;

const OuterTemplate: Story = (args) => {
  return (
    <div style={{ maxWidth: '400px', padding: '50px' }}>
      <PieChart
        data={outerData}
        radius={250}
        lineWidth={100}
        showLabels
        labelOffsetFromCenter={100}
      />
    </div>
  );
};

export const Outer = OuterTemplate.bind({});

const CenterLabelTemplate: Story = (args) => {
  return (
    <div style={{ maxWidth: '400px', padding: '50px' }}>
      <PieChart
        data={outerData}
        radius={250}
        lineWidth={100}
        centerLabel={{
          text: '+70%',
          style: {
            fill: '#282828',
          },
        }}
      />
    </div>
  );
};

export const CenterLabel = CenterLabelTemplate.bind({});
