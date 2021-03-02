import withTooltip from './hocs/withTooltip';
import PieChart from './PieChart';

export { default } from './PieChart';
export * from './PieChart';

const PieChartWithTooltip = withTooltip(PieChart);
export { PieChartWithTooltip };
