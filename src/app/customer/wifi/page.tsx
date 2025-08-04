"use client";

import CustomerTable from "@/components/customer/customer.table";
import { sendRequest } from "@/utils/api";
import { Button, Divider, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";

interface Register {
  name: string;
  addres: string;
  number: string;
}

const CustomerPageWifi = () => {
  const { Paragraph, Text } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const sectionStyle: React.CSSProperties = {
    background: "#fafafa",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (values: any) => {
    console.log("Form Submitted:", values);

    try {
      const res = await sendRequest<Register>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register/register-wifi`,
        method: "POST",
        body: {
          name: values.name,
          address: values.address,
          number: values.number,
        },
      });

      console.log("Response:", res);
      // TODO: Hiển thị thông báo thành công, reset form, đóng modal...
    } catch (error) {
      console.error("Error submitting form:", error);
      // TODO: Hiển thị thông báo lỗi cho người dùng
    }
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
    form.resetFields();
    handleCancel();
  };

  return (
    <>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 5px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#d4380d" }}>
            HỖ TRỢ TƯ VẤN VÀ LẮP ĐẶT WIFI VIETTEL
          </h1>
        </div>

        <CustomerTable />

        <div style={{ display: "flex", flexDirection: "row", gap: "5rem" }}>
          {/* Ưu đãi 1 */}
          <div style={sectionStyle}>
            <Divider />
            <Paragraph>
              <Text strong type="danger">
                • Phí hòa mạng:
              </Text>{" "}
              300.000 vnđ/thuê bao.
            </Paragraph>
            <Paragraph>
              <Text strong type="danger">
                • Tặng 1 tháng cước
              </Text>{" "}
              khi đóng trước 12 tháng.
            </Paragraph>
            <Paragraph>
              <Text strong type="danger">
                • Trang bị miễn phí Camera
              </Text>{" "}
              an ninh trên đường Internet.
            </Paragraph>
            <Paragraph>
              <Text strong type="danger">
                • Tặng thêm 50 Mbps
              </Text>{" "}
              băng thông cho mỗi camera.
            </Paragraph>
            <Divider dashed />
          </div>

          {/* Ưu đãi 2 */}
          <div style={sectionStyle}>
            <Divider />
            <Paragraph>
              <Text strong type="danger">
                • Gói Giải trí:
              </Text>{" "}
              hơn 100 kênh, hơn 2500 bộ phim.
              <br />
              <Text italic>
                Giá áp dụng cho SmartTV, dùng đầu thu cộng thêm 20.000
                vnđ/tháng.
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong type="danger">
                • Gói Đẳng cấp:
              </Text>{" "}
              hơn 160 kênh, kho phim 4K, độc quyền C1.
              <br />
              <Text italic>Trang bị đầu thu miễn phí.</Text>
            </Paragraph>
            <Paragraph>
              <Text strong type="danger">
                • Lắp TV1:
              </Text>{" "}
              tặng miễn phí TV2.
            </Paragraph>
            <Divider dashed />
          </div>
        </div>
      </div>

      {/* Nút Đăng ký cố định */}
      <Button
        type="primary"
        shape="round"
        style={{
          position: "fixed",
          top: "50%",
          right: "40px",
          backgroundColor: "#d4380d",
          color: "#fff",
          zIndex: 999,
        }}
        onClick={showModal}
      >
        Đăng ký ngay !
      </Button>

      {/* Modal đăng ký */}
      <Modal
        title="Đăng ký lắp đặt Wifi Viettel"
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          handleCancel();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="number"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{9,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Gửi đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerPageWifi;
