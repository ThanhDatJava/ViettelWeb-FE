"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  CameraOutlined,
  DesktopOutlined,
  MailOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";
import { MdWifi } from "react-icons/md";
import { BiSignal5 } from "react-icons/bi";
import { sendRequest } from "@/utils/api";

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

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const [listWifi, setListWifi] = useState<Wifi[]>([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const res = await sendRequest<{ data: Wifi[] }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wifi`,
        method: "GET",
      });
      const wifiWithKeys = res?.data.map((item, index) => ({
        ...item,
        key: item._id || index, // assign unique key
      }));
      setListWifi(wifiWithKeys || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Thành Đạt Viettel Cờ Đỏ",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "users",
          label: <Link href={"/dashboard/user"}>Manage Users</Link>,
          icon: <TeamOutlined />,
        },

        {
          key: "wifi",
          label: <Link href={"/dashboard/wifi"}>Wifi</Link>,
          icon: <MdWifi style={{ fontSize: 20 }} />,
        },

        {
          key: "package5G",
          label: <Link href={"/dashboard/package5G"}>Manage Package</Link>,
          icon: <BiSignal5 style={{ fontSize: 20 }} />,
          children: [
            { key: "5", label: "Trả trước" },
            { key: "6", label: "Trả sau" },
          ],
        },

        {
          key: "camera",
          label: <Link href={"/dashboard/camera"}>Manage Camera</Link>,
          icon: <CameraOutlined style={{ fontSize: 20 }} />,
          children: [
            { key: "9", label: "Option 9" },
            { key: "10", label: "Option 10" },
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },

        {
          key: "tv",
          label: <Link href={"/dashboard/tv"}>Manage Tivi</Link>,
          icon: <DesktopOutlined style={{ fontSize: 20 }} />,
          children: [
            { key: "9", label: "Option 9" },
            { key: "10", label: "Option 10" },
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{ height: "100vh" }}
      />
    </Sider>
  );
};

export default AdminSideBar;
