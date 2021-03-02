import PieChart from './PieChart';
import withPush from './hocs/withPush';
import withTooltip from './hocs/withTooltip';
import withElevation from './hocs/withElevation';

export { default } from './PieChart';
export * from './PieChart';

const PieChartWithTooltip = withTooltip(PieChart);
export { PieChartWithTooltip };

const PieChartWithPush = withPush(PieChart);
export { PieChartWithPush };

const PieChartWithElevation = withElevation(PieChart);
export { PieChartWithElevation };
