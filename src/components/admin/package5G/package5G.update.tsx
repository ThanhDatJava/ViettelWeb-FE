import { handleUpdateUserAction } from "@/utils/actions";
import { sendRequest } from "@/utils/api";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const Package5GUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        goicuoc: dataUpdate.goicuoc,
        gia: dataUpdate.gia,
        tinhnang: dataUpdate.tinhnang,
        giaTVGT: dataUpdate.giaTVGT,
        giaTVDC: dataUpdate.giaTVDC,
        giaCamera: dataUpdate.giaCamera,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const handleUpdateWifiAction = async (data: any) => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mobile-network/edit`,
      method: "PATCH",

      body: { ...data },
    });

    return res;
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { goicuoc, gia, tinhnang, giaCamera, giaTVDC, giaTVGT } = values;
      const res = await handleUpdateWifiAction({
        _id: dataUpdate._id,
        goicuoc,
        gia,
        tinhnang,
        giaTVGT,
        giaTVDC,
        giaCamera,
      });
      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Update user succeed");
      } else {
        notification.error({
          message: "Update User error",
          description: res?.message,
        });
      }
    }
  };

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
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
        </Row>
      </Form>
    </Modal>
  );
};

export default Package5GUpdate;
