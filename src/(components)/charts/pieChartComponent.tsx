import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CenterTextPlugin = {
  id: "centerText",
  beforeDraw(chart: any) {
    const { ctx, width, height, config } = chart;
    const dataset = config?.data?.datasets[0];
    const total = dataset.data.reduce(
      (acc: number, val: number) => acc + val,
      0
    );
    const percentage = Math?.round((dataset.data[0] / total) * 100);

    ctx.save();
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${percentage}%`, width / 2, height / 2);
    ctx.restore();
  },
};

interface PieComponentProps {
  orderDetails: any[];
}

export const PieComponent: React.FC<PieComponentProps> = ({ orderDetails }) => {
  if (!orderDetails || !Array.isArray(orderDetails)) {
    return (
      <div className="w-32 h-32 flex items-center justify-center">
        <p>No Data</p>
      </div>
    );
  }
  const aggregatedData = orderDetails?.reduce(
    (acc: { [key: string]: number }, order: any) => {
      const country = order?.country;
      const total = order?.items?.reduce(
        (sum: number, item: any) => sum + parseFloat(item?.total),
        0
      );

      acc[country] = (acc[country] || 0) + total;
      return acc;
    },
    {}
  );

  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const chartData = {
    labels: labels.length ? labels : ["No Data"],
    datasets: [
      {
        data: data.length ? data : [0],
        backgroundColor: ["#ffffff", "#808080"],
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
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: false,
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
      <Doughnut
        data={chartData}
        options={options}
        plugins={[CenterTextPlugin]}
      />
    </div>
  );
};
