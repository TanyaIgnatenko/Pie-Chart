import React from 'react';
import ReactDOM from 'react-dom';

import { PieChartWithPush } from './PieChart';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import './reset.scss';

const data = [
  {
    id: 1,
    color: '#FFF9C4',
    percentage: 40,
    label: '40%',
    labelStyle: {
      fill: 'grey',
    },
    tooltipContent: 'Value: 40%',
  },
  {
    id: 2,
    color: '#B39DDB',
    percentage: 30,
    label: '30%',
    labelStyle: {
      fill: 'grey',
    },
    tooltipContent: 'Value: 30%',
  },
  {
    id: 3,
    color: '#3F51B5',
    percentage: 30,
    label: '30%',
    labelStyle: {
      fill: 'grey',
    },
    tooltipContent: 'Value: 30%',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <PieChartWithPush
        data={data}
        radius={250}
        lineWidth={200}
        showLabels
        labelOffsetFromCenter={0}
        distanceOnPush={50}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
