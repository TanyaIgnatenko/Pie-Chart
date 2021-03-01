import React from 'react';
import ReactDOM from 'react-dom';

import PieChart from './PieChart';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import './reset.scss';

const data = [
  {
    color: '#FFF9C4',
    percentage: 40,
    label: '40%',
    labelStyle: {
      fill: 'grey',
    },
  },
  {
    color: '#B39DDB',
    percentage: 30,
    label: '30%',
    labelStyle: {
      fill: 'grey',
    },
  },
  {
    color: '#3F51B5',
    percentage: 30,
    label: '30%',
    labelStyle: {
      fill: 'grey',
    },
  },
];

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <PieChart
        data={data}
        radius={250}
        lineWidth={200}
        showLabels
        labelOffsetFromCenter={0}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
