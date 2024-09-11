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

const HorizentalBarChart = () => {
  const dummyData = [
    { country: "USA", total: 5000 },
    { country: "India", total: 3000 },
    { country: "Pakistan", total: 2000 },
    { country: "USA", total: 1500 },
    { country: "India", total: 1000 },
  ];

  const highestSales =
    dummyData.length > 0 ? Math.max(...dummyData.map((item) => item.total)) : 0;

  const chartData = {
    labels: dummyData.map((item) => item.country),
    datasets: [
      {
        label: "Total Sales",
        data: dummyData.map((item) => item.total),
        backgroundColor: dummyData.map((item) =>
          item.total === highestSales ? "#41A5FF" : "#BADAFF"
        ),
        borderColor: dummyData.map((item) =>
          item.total === highestSales ? "#3E7CB1" : "#A8C6FF"
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales ($)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Countries",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default HorizentalBarChart;
