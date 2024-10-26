import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesPerWeekChart = () => {
  const salesData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Daily Sales",
        data: [120, 150, 170, 180, 200, 220, 240],
        backgroundColor: "#47178E",
        borderRadius: 5,
      },
      {
        label: "Weekly Sales",
        data: [850, 900, 950, 980, 1020, 1050, 1100],
        backgroundColor: "#9A55FF",
        borderRadius: 5,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "false",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `Sales: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "618px", height: "355px" }}>
      <h2>Sales Chart</h2>
      <Bar data={salesData} options={options} />
    </div>
  );
};

export default SalesPerWeekChart;
