import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface OverallSalesChartProps {
  labels: string[];
  dataValues: number[];
}

const OverallSalesChart: React.FC<OverallSalesChartProps> = ({
  labels,
  dataValues,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales Per User",
        data: dataValues,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Total Sales: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        type: "category" as const,
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
        type: "linear" as const,
        title: {
          display: true,
          text: "Total Sales ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default OverallSalesChart;
