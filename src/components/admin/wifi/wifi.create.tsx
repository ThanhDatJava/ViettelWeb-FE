import {
  handleCreateUserAction,
  handleCreateWifiAction,
} from "@/utils/actions";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const WifiCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await handleCreateWifiAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      message.success("Create succeed!");
    } else {
      notification.error({
        message: "Create User error",
        description: res?.message,
      });
    }
  };

  return (
    <Modal
      title="Add new wifi"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Gói Cước"
                name="goicuoc"
                rules={[
                  { required: true, message: "Please input your goicuoc!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giá"
                name="gia"
                rules={[{ required: true, message: "Please input your gia!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item
              label="Tính năng"
              name="tinhnang"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Giá TVGT"
                name="giaTVGT"
                rules={[
                  { required: true, message: "Please input your giaTVGT!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Giá TVDC"
                name="giaTVDC"
                rules={[
                  { required: true, message: "Please input your giaTVDC!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Giá Camera"
                name="giaCamera"
                rules={[
                  { required: true, message: "Please input your giaCamera!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Row>
      </Form>
    </Modal>
  );
};

export default WifiCreate;
