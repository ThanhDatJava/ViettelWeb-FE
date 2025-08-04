import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { sendRequest } from "@/utils/api";

const { Meta } = Card;

interface Wifi {
  key: React.Key;
  _id: string;
  goicuoc: string;
  gia: string;
  tinhnang: string;
  giaTVGT: string;
  giaTVDC: string;
  giaCamera: string;
  image: string;
}

interface IProps {
  goicuoc: any;
}

const CardWifi = (props: IProps) => {
  const { goicuoc } = props;

  const [listWifi, setListWifi] = useState<Wifi[]>([]);
  const [selectedWifi, setSelectedWifi] = useState<Wifi | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await sendRequest<{ data: Wifi[] }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wifi`,
        method: "GET",
      });

      const wifiWithKeys = res?.data.map((item, index) => ({
        ...item,
        key: item._id || index,
      }));

      setListWifi(wifiWithKeys || []);

      // Lấy gói cước tương ứng
      const matched = wifiWithKeys.find((item) => item.goicuoc === goicuoc);
      setSelectedWifi(matched || null);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={selectedWifi?.goicuoc}
        description={selectedWifi?.gia}
      />
    </Card>
  );
};

export default CardWifi;
