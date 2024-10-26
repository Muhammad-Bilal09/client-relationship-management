import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CustomerChart: NextPage = () => {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("/api/getOrder");
        const orders = response.data;

        const monthlyProfit: { [key: string]: number } = {};

        orders.forEach((order: any) => {
          const date = new Date(order.date);
          const month =
            date.toLocaleString("default", { month: "short" }) +
            " " +
            date.getFullYear();

          if (!monthlyProfit[month]) monthlyProfit[month] = 0;

          order.items.forEach((item: any) => {
            const total = parseFloat(item.total);
            monthlyProfit[month] += total;
          });
        });

        const labels = Object.keys(monthlyProfit);
        const data = Object.values(monthlyProfit);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Total Profit",
              data: data,
              borderColor: "#41A5FF",
              backgroundColor: "rgba(65, 165, 255, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CustomerChart;
