import React from 'react';
import { PieChartWithElevation } from './PieChart';

const data = [
    {
      id: 1,
      color: '#FFF9C4',
      percentage: 20,
      label: '10%',
      labelStyle: {
        color: 'grey',
      },
      tooltipContent: 'Value: 40%',
    },
    {
      id: 2,
      color: '#B39DDB',
      percentage: 30,
      label: '20%',
      labelStyle: {
        color: 'grey',
      },
      tooltipContent: 'Value: 30%',
    },
    {
      id: 3,
      color: '#3F51B5',
      percentage: 50,
      label: '70%',
      labelStyle: {
        color: 'grey',
      },
      tooltipContent: 'Value: 30%',
    },
  ];

const Demo = () => (
    <div className="App">
        <PieChartWithElevation
            holeColor="white"
            data={data}
            radius={250}
            lineWidth={200}
            showLabels
            labelOffsetFromCenter={0}
            animation={{
                delayBetweenSlices: 0,
                startDelay: 0,
                duration: 1,
                timingFunction: 'ease-out',
                startPositionAnimated: true,
                lengthAnimated: true,
            }}
        />
  </div>
);

export default Demo;