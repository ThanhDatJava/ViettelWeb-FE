"use client";
import { Layout } from "antd";

const CustomerFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Thành Đạt Viettel Cờ Đỏ ©{new Date().getFullYear()} Created by
        @thanhdatvietelcodo
      </Footer>
    </>
  );
};

export default CustomerFooter;
