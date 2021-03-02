import withTooltip from './hocs/withTooltip';
import withPush from './hocs/withPush';
import PieChart from './PieChart';

export { default } from './PieChart';
export * from './PieChart';

const PieChartWithTooltip = withTooltip(PieChart);
export { PieChartWithTooltip };

const PieChartWithPush = withPush(PieChart);
export { PieChartWithPush };
