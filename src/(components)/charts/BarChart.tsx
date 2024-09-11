import React, { useEffect, useState } from "react";
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

interface Order {
  date: string;
  items: { total: number }[];
}

interface Props {
  orderDetails?: Order[];
}

const BarChart: React.FC<Props> = ({ orderDetails = [] }) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: ["#9A55FF", "#41A5FF", "#ED4D5C"],
      },
    ],
  });

  useEffect(() => {
    if (!orderDetails || orderDetails.length === 0) return;
    const aggregatedData: { [key: string]: number } = {};

    orderDetails.forEach((order) => {
      const orderMonth = new Date(order.date).toLocaleString("default", {
        month: "long",
      });
      const totalAmount = order.items.reduce(
        (total, item: any) => total + parseFloat(item.total),
        0
      );

      if (aggregatedData[orderMonth]) {
        aggregatedData[orderMonth] += totalAmount;
      } else {
        aggregatedData[orderMonth] = totalAmount;
      }
    });

    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    setChartData({
      labels,
      datasets: [
        {
          label: "Income",
          data,
          backgroundColor: ["#9A55FF", "#41A5FF", "#ED4D5C"],
        },
      ],
    });
  }, [orderDetails]);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: function (value: number) {
            return `${value}K`;
          },
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
