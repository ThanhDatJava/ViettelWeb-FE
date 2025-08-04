"use client";
import { CustomerContext } from "@/library/customer.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useContext } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Link from "next/link";

const CustomerHeader = (props: any) => {
  // const { data: session, status } = useSession();
  const { session } = props;

  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(CustomerContext)!;

  const MenuHomePageMain = ["WIFI", "GÓI CƯỚC", "CAMERA", "TIVI"];

  const keyMapping: Record<string, string> = {
    WIFI: "wifi",
    "GÓI CƯỚC": "package5G",
    CAMERA: "camera",
    TIVI: "tv",
  };

  const items1: MenuProps["items"] = MenuHomePageMain.map((key) => {
    const mappedKey = keyMapping[key];
    return {
      key: mappedKey,
      label: <Link href={`/customer/${mappedKey}`}>{key}</Link>, // Hiển thị tên gốc, link theo key chuẩn hóa
    };
  });

  return (
    <>
      <Header
        className="header-homepagemain"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
            marginLeft: 20,
            fontSize: 20,
            fontFamily: "sans-serif",
          }}
        />
      </Header>
    </>
  );
};

export default CustomerHeader;
