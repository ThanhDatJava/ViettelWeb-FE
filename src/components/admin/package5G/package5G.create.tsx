import {
  handleCreatePackage5GAction,
  handleCreateUserAction,
  handleCreateWifiAction,
} from "@/utils/actions";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
} from "antd";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const Package5GCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const { Option } = Select;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await handleCreatePackage5GAction(values);
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
          <Col span={24}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Vui lòng chọn loại gói!" }]}
            >
              <Select placeholder="Chọn loại gói">
                <Option value="data">Data</Option>
                <Option value="combo">Combo</Option>
                <Option value="dacbiet">Đặc biệt</Option>
              </Select>
            </Form.Item>
          </Col>
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

            <Col span={12}>
              <Form.Item
                label="Dung lượng data"
                name="tinhnang"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mybox"
                name="mybox"
                rules={[
                  { required: true, message: "Please input your mybox!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Gọi nội mạng"
                name="internalnetwork"
                rules={[
                  {
                    required: true,
                    message: "Please input your internalnetwork!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Gọi ngoại mạng"
                name="offline"
                rules={[
                  { required: true, message: "Please input your offline!" },
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

export default Package5GCreate;
