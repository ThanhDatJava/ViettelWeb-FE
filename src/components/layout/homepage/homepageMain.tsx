"use client";
import "./homepageMain.css";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const MenuHomePageMain = ["WIFI", "GÓI CƯỚC", "CAMERA", "TIVI"];

const items1: MenuProps["items"] = MenuHomePageMain.map((key) => ({
  key,
  label: <div onClick={() => console.log("Click vào mục:", key)}>{key}</div>,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const HomePageMain: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        className="header-homepagemain"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div className="demo-logo">.</div>
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

      <div style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>HomePageMain</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomePageMain;
