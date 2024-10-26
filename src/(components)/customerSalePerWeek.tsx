"use client";

import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
  ScriptableContext,
  TooltipItem,
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { format, eachDayOfInterval, parseISO } from "date-fns";
import { useAppSelector } from "@/redux/hooks";
import { MatrixDataPoint } from "@/types/type";

ChartJS.register(
  MatrixController,
  MatrixElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const isMatrixDataPoint = (dataPoint: any): dataPoint is MatrixDataPoint => {
  return dataPoint && typeof dataPoint.v === "number";
};

const generateDateLabels = (startDate: Date, endDate: Date) => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

const generateTimeLabels = () => {
  return ["12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
};

const filterDataByDateRange = (
  data: MatrixDataPoint[],
  startDate: Date,
  endDate: Date
): MatrixDataPoint[] => {
  const startOfDay = new Date(startDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(endDate);
  endOfDay.setHours(23, 59, 59, 999);

  return data.filter((point) => {
    const pointDate = parseISO(point.x);
    return pointDate >= startOfDay && pointDate <= endOfDay;
  });
};

const WeekScheduleMatrixChart: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date("2024-08-1"));
  const [endDate, setEndDate] = useState<Date>(new Date("2024-08-07"));
  const dateState = useAppSelector((state: any) => state.date);

  const dateLabels = useMemo(
    () => generateDateLabels(startDate, endDate),
    [startDate, endDate]
  );
  const timeLabels = useMemo(() => generateTimeLabels(), []);

  const initialData: MatrixDataPoint[] = [
    { x: "2024-08-01", y: "12PM", v: 1080 },
    { x: "2024-08-01", y: "1PM", v: 1080 },
    { x: "2024-08-01", y: "2PM", v: 1080 },
    { x: "2024-08-01", y: "3PM", v: 1080 },
    { x: "2024-08-01", y: "4PM", v: 1080 },
    { x: "2024-08-01", y: "5PM", v: 1080 },
    { x: "2024-08-02", y: "12PM", v: 11080 },
    { x: "2024-08-02", y: "1PM", v: 12300 },
    { x: "2024-08-02", y: "2PM", v: 4280 },
    { x: "2024-08-02", y: "3PM", v: 5000 },
    { x: "2024-08-02", y: "4PM", v: 1200 },
    { x: "2024-08-02", y: "5PM", v: 21100 },
    { x: "2024-08-03", y: "12PM", v: 11080 },
    { x: "2024-08-03", y: "1PM", v: 12300 },
    { x: "2024-08-03", y: "2PM", v: 4280 },
    { x: "2024-08-03", y: "3PM", v: 5000 },
    { x: "2024-08-03", y: "4PM", v: 1200 },
    { x: "2024-08-03", y: "5PM", v: 21100 },
    { x: "2024-08-04", y: "12PM", v: 1080 },
    { x: "2024-08-04", y: "1PM", v: 1080 },
    { x: "2024-08-04", y: "2PM", v: 1080 },
    { x: "2024-08-04", y: "3PM", v: 1080 },
    { x: "2024-08-04", y: "4PM", v: 1080 },
    { x: "2024-08-04", y: "5PM", v: 1080 },
    { x: "2024-08-05", y: "12PM", v: 1080 },
    { x: "2024-08-05", y: "1PM", v: 18200 },
    { x: "2024-08-05", y: "2PM", v: 12080 },
    { x: "2024-08-05", y: "3PM", v: 1000 },
    { x: "2024-08-05", y: "4PM", v: 10200 },
    { x: "2024-08-05", y: "5PM", v: 200 },
    { x: "2024-08-06", y: "12PM", v: 1080 },
    { x: "2024-08-06", y: "1PM", v: 1200 },
    { x: "2024-08-06", y: "2PM", v: 1280 },
    { x: "2024-08-06", y: "3PM", v: 1000 },
    { x: "2024-08-06", y: "4PM", v: 10200 },
    { x: "2024-08-06", y: "5PM", v: 200 },
    { x: "2024-08-07", y: "12PM", v: 11080 },
    { x: "2024-08-07", y: "1PM", v: 12300 },
    { x: "2024-08-07", y: "2PM", v: 4280 },
    { x: "2024-08-07", y: "3PM", v: 5000 },
    { x: "2024-08-07", y: "4PM", v: 1200 },
    { x: "2024-08-07", y: "5PM", v: 21100 },
  ];

  const filteredData = useMemo(
    () => filterDataByDateRange(initialData, startDate, endDate),
    [startDate, endDate]
  );

  const data: ChartData<"matrix", MatrixDataPoint[]> = {
    datasets: [
      {
        label: "",
        data: filteredData,
        backgroundColor: (context: ScriptableContext<"matrix">) => {
          const { dataIndex, dataset } = context;
          const dataPoint = dataset.data[dataIndex];

          if (!isMatrixDataPoint(dataPoint)) {
            return "#FFFFFF";
          }

          const value = dataPoint.v;

          if (value <= 1000) {
            return "#E7D7FF";
          } else if (value <= 5000) {
            return "#9A55FF";
          } else {
            return "#47178E";
          }
        },
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 0,
        width: ({ chart }) =>
          (chart.chartArea?.width || 0) / Math.max(dateLabels.length, 1) - 9,
        height: ({ chart }) =>
          (chart.chartArea?.height || 0) / Math.max(timeLabels.length, 1) - 7,
        borderRadius: 3,
      },
    ],
  };

  const options: ChartOptions<"matrix"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: dateLabels?.map((date: any) => format(date, "yyyy-MM-dd")),
        offset: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          autoSkip: false,
          callback: (value, index) => {
            const date = dateLabels[index];
            return format(date, "d MMMM");
          },
        },
      },
      y: {
        type: "category",
        labels: timeLabels,
        offset: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"matrix">) => {
            const dataPoint =
              tooltipItem?.dataset?.data[tooltipItem?.dataIndex];
            if (!isMatrixDataPoint(dataPoint)) {
              return "Free";
            }
            const formattedDate = format(parseISO(dataPoint.x), "d M=MMM");
            const value = dataPoint.v;

            return value
              ? `${formattedDate}: Sales ${value}`
              : `${formattedDate}: Free`;
          },
        },
      },
    },
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    if (newDate <= endDate) {
      setStartDate(newDate);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="relative lg:w-[600px] lg:h-64">
        <Chart type="matrix" data={data} options={options} />
      </div>
    </div>
  );
};

export default WeekScheduleMatrixChart;
