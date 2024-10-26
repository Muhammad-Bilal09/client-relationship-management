import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CenterTextPlugin = {
  id: "centerText",
  afterDatasetsDraw(chart: any) {
    const { ctx, width, height } = chart;
    const dataset = chart.config.data.datasets[0];
    const total = dataset.data.reduce((acc: any, val: any) => acc + val, 0);

    ctx.save();
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0d0c0c";
    ctx.fillText("100%", width / 2, height / 2);
    ctx.restore();
  },
};

export const AnalyticalPieChart: React.FC = () => {
  const data = {
    labels: ["Color 1", "Color 2", "Color 3"],
    datasets: [
      {
        data: [33, 33, 34],
        backgroundColor: ["#41A5FF", "#ED4D5C", "#62912C"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: false,
      },
      centerText: {
        display: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="w-32 h-32">
      <Doughnut data={data} options={options} plugins={[CenterTextPlugin]} />
    </div>
  );
};
