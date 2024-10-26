import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface AnalyticalBarChartProps {
  labels: string[];
  dataValues: number[];
}

const AnalyticalBarChart: React.FC<AnalyticalBarChartProps> = ({
  labels,
  dataValues,
}) => {
  const cleanedDataValues = dataValues.map((value) => Number(value) || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: cleanedDataValues,
        backgroundColor: "#C9F19C",
        hoverBackgroundColor: "#62912C",
        borderColor: "#3e95cd",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Total Sales: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Users",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalyticalBarChart;
