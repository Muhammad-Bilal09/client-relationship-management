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
import { css } from "@emotion/react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DailySalesChart: React.FC = () => {
  const salesData = [
    {
      category: "Category A",
      dailySales: [
        { total: "100" },
        { total: "200" },
        { total: "150" },
        { total: "300" },
        { total: "250" },
        { total: "400" },
        { total: "350" },
      ],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      category: "Category B",
      dailySales: [
        { total: "200" },
        { total: "250" },
        { total: "300" },
        { total: "350" },
        { total: "400" },
        { total: "450" },
        { total: "500" },
      ],
      backgroundColor: "rgba(153,102,255,0.4)",
      borderColor: "rgba(153,102,255,1)",
    },
  ];
  const totalSalesPerDay = Array(7).fill(0);
  salesData.forEach((item) => {
    const dailySales = Array.isArray(item.dailySales) ? item.dailySales : [];
    dailySales.forEach((sale: any, index: number) => {
      if (index < totalSalesPerDay.length) {
        totalSalesPerDay[index] += parseFloat(sale.total) || 0;
      }
    });
  });

  const salesDataWithTotal = salesData.map((item) => {
    const dailySales = Array.isArray(item.dailySales) ? item.dailySales : [];
    const totalSales = dailySales.reduce((total: number, item: any) => {
      const itemTotal = parseFloat(item.total);
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    return {
      ...item,
      totalSales: !isNaN(totalSales) ? totalSales : 0,
    };
  });

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      ...salesDataWithTotal.map((item) => ({
        label: `${item?.category} (Total: $${item?.totalSales?.toFixed(2)})`,
        data: (Array?.isArray(item?.dailySales) ? item?.dailySales : []).map(
          (sale: any) => parseFloat(sale?.total) || 0
        ),
        fill: false,
        backgroundColor: item?.backgroundColor || "rgba(75,192,192,0.4)",
        borderColor: item?.borderColor || "rgba(75,192,192,1)",
        tension: 0.1,
      })),
      {
        label: "Total Sales",
        data: totalSalesPerDay,
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.4)",
        tension: 0.1,
        borderDash: [10, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Sales: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  const cardStyle = css`
    width: 631px;
    height: 397px;
    margin-top: 156px;
    margin-left: 321px;
    border-radius: 10.5px;
    border: 0.75px solid #ddd;
    padding: 24px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  return (
    <div className="lg:w-[600px] lg:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DailySalesChart;
