import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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

const ProfitChart = () => {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("/api/getOrder");
        const orders = response.data;
        const monthlyProfit: { [key: string]: number } = {};

        orders.forEach((order: any) => {
          const month = new Date(order.date).toLocaleString("default", {
            month: "short",
          });
          if (!monthlyProfit[month]) {
            monthlyProfit[month] = 0;
          }
          order.items.forEach((item: any) => {
            monthlyProfit[month] += parseFloat(item.total);
          });
        });

        const labels = Object.keys(monthlyProfit);
        const data = Object.values(monthlyProfit);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Profit",
              data,
              borderColor: "#62912C",
              backgroundColor: "rgba(98, 145, 44, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, []);

  const options = {
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
          display: false,
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
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProfitChart;
