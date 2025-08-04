"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { sendRequest } from "@/utils/api";

interface DataType {
  goicuoc: string;
  gia: string;
  tinhnang: number;
  giaTVGT: string;
  giaTVDC: string;
  giaCamera: string;
  tags: string[];
}

const CustomerTable: React.FC = () => {
  const [listWifi, setListWifi] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await sendRequest<{ data: DataType[] }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wifi`,
        method: "GET",
      });

      setListWifi(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const columns = [
    {
      title: "Gói Cước",
      dataIndex: "goicuoc",
      key: "goicuoc",
      render: (text: string) => <a>{text}</a>,
    },

    {
      title: "Tính Năng",
      dataIndex: "tinhnang",
      key: "tinhnang",
      render: (tinhnang: string) => <Tag color="red">{tinhnang} Mbps</Tag>,
    },
    {
      title: "Số thiết bị phát",
      dataIndex: "numberdevices",
      key: "numberdevices",
      render: (numberdevices: string) => (
        <Tag color="red">{numberdevices} thiết bị</Tag>
      ),
    },

    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (gia: string) => <Tag color="green">{gia}.000 Đồng</Tag>,
    },

    {
      title: "Giá TVGT + WIFI",
      dataIndex: "giaTVGT",
      key: "giaTVGT",
      render: (giaTVGT: string) => <Tag color="blue">{giaTVGT}.000 Đồng</Tag>,
    },
    {
      title: "Giá TVDC + WIFI",
      dataIndex: "giaTVDC",
      key: "giaTVDC",
      render: (giaTVDC: string) => <Tag color="purple">{giaTVDC}.000 Đồng</Tag>,
    },
    {
      title: "Giá Camera",
      dataIndex: "giaCamera",
      key: "giaCamera",
      render: (giaCamera: string) => (
        <Tag color="volcano">{giaCamera}.000 Đồng</Tag>
      ),
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={listWifi}
      rowKey={(record) => record.goicuoc + record.gia}
      pagination={false}
    />
  );
};

export default CustomerTable;
