"use client";
import { Layout } from "antd";

const AdminFooter = () => {
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

export default AdminFooter;
