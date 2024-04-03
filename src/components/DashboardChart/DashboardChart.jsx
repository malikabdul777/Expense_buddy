import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./DashboardChart.module.css";
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";
import moment from "moment/moment";

const data = [
  { name: "1", income: 0, expense: 80 },
  { name: "2", income: 0, expense: 120 },
  { name: "3", income: 100, expense: 90 },
  { name: "4", income: 0, expense: 110 },
  { name: "5", income: 50, expense: 100 },
  { name: "6", income: 10, expense: 140 },
  { name: "7", income: 20, expense: 130 },
  { name: "8", income: 200, expense: 150 },
  { name: "9", income: 100, expense: 100 },
  { name: "10", income: 200, expense: 120 },
  { name: "11", income: 0, expense: 110 },
  { name: "12", income: 0, expense: 100 },
  { name: "13", income: 0, expense: 0 },
  { name: "14", income: 0, expense: 0 },
  { name: "15", income: 0, expense: 0 },
  { name: "16", income: 0, expense: 0 },
  { name: "17", income: 0, expense: 0 },
  { name: "18", income: 0, expense: 0 },
  { name: "19", income: 0, expense: 0 },
  { name: "20", income: 0, expense: 0 },
  { name: "21", income: 0, expense: 0 },
  { name: "22", income: 0, expense: 0 },
  { name: "23", income: 0, expense: 0 },
  { name: "24", income: 0, expense: 0 },
  { name: "25", income: 0, expense: 0 },
  { name: "26", income: 0, expense: 0 },
  { name: "27", income: 0, expense: 0 },
  { name: "28", income: 0, expense: 0 },
  { name: "29", income: 0, expense: 0 },
  { name: "30", income: 0, expense: 0 },
];
const CustomTooltip = ({ active, payload, label, chartIsMonthly }) => {
  const currentMonth = moment().format("MMMM");
  const currentYear = moment().format("YYYY");

  if (active && payload && payload.length) {
    // console.log(payload);
    return (
      <div className={styles.tooltipContainer}>
        <div>
          <p>
            On {payload[0].payload.name}
            {chartIsMonthly ? `${currentMonth} ${currentYear}` : null}
          </p>
        </div>
        <p className={styles.tooltipIncomeValue}>
          <span className={styles.tooltipHeadings}>Income </span>- ${" "}
          {payload[0].value}
        </p>
        <p className={styles.tooltipExpenseValue}>
          <span className={styles.tooltipHeadings}>Expense</span> - ${" "}
          {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const DashboardChart = (props) => {
  const { data, isMonthly } = props;
  return (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip
          content={<CustomTooltip chartIsMonthly={isMonthly} />}
          cursor={{ fill: "transparent" }}
        />

        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3fb53b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3fb53b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#df6555" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#df6555" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#ddd" />
        <XAxis dataKey="name" />
        <YAxis unit=" $" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#3fb53b"
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#df6555"
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
