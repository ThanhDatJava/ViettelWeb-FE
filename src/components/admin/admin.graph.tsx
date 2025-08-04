"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: any[];
  dataKey: string;
}) => {
  return (
    <div>
      <h3 style={{ marginBottom: "1rem" }}>{title}</h3>
      <LineChart width={350} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

// Component chính
const GraphLine = () => {
  // const [chartsData, setChartsData] = useState<
  //   { title: string; data: any[] }[]
  // >([]);

  // useEffect(() => {
  //   // Ví dụ mock API
  //   const fetchData = async () => {
  //     // Giả lập API
  //     const response = await fetch("/api/data"); // Thay bằng endpoint thật
  //     const result = await response.json();

  //     // Giả sử API trả về dạng: [{ title: "Biểu đồ 1", data: [...] }, {...}]
  //     setChartsData(result);
  //   };

  //   fetchData();
  // }, []);

  const chartsData = [
    {
      title: "Wifi",
      dataKey: "wifi",
      data: [
        { name: "Tuần 1", wifi: 50 },
        { name: "Tuần 2", wifi: 75 },
        { name: "Tuần 3", wifi: 90 },
        { name: "Tuần 4", wifi: 120 },
      ],
    },
    {
      title: "Tivi",
      dataKey: "tivi",
      data: [
        { name: "Tuần 1", tivi: 20 },
        { name: "Tuần 2", tivi: 40 },
        { name: "Tuần 3", tivi: 80 },
        { name: "Tuần 4", tivi: 100 },
      ],
    },
    {
      title: "Camera",
      dataKey: "camera",
      data: [
        { name: "Tuần 1", camera: 20 },
        { name: "Tuần 2", camera: 40 },
        { name: "Tuần 3", camera: 80 },
        { name: "Tuần 4", camera: 100 },
      ],
    },
    {
      title: " Gói 5g",
      dataKey: "package",
      data: [
        { name: "Tuần 1", package: 20 },
        { name: "Tuần 2", package: 40 },
        { name: "Tuần 3", package: 80 },
        { name: "Tuần 4", package: 100 },
      ],
    },
    {
      title: "Sim",
      dataKey: "sim",
      data: [
        { name: "Tuần 1", sim: 20 },
        { name: "Tuần 2", sim: 40 },
        { name: "Tuần 3", sim: 80 },
        { name: "Tuần 4", sim: 100 },
      ],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "center",
      }}
    >
      {chartsData && chartsData.length > 0 ? (
        chartsData.map((chart, index) => (
          <Chart
            key={index}
            title={chart.title}
            data={chart.data}
            dataKey={chart.dataKey}
          />
        ))
      ) : (
        <p>Không có dữ liệu để hiển thị biểu đồ.</p>
      )}
    </div>
  );
};

export default GraphLine;
