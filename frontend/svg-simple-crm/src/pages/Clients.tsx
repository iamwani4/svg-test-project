import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from "../store/reducers/clients";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";

const Clients = () => {
  const dispatch = useDispatch();
  const { items = [], loading = false } = useSelector(
    (state: any) => state.client || {}
  );
  const [form] = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      if (editing) {
        await dispatch(updateClient({ id: editing.id, ...values })).unwrap();
        message.success("Client updated");
      } else {
        await dispatch(createClient(values)).unwrap();
        message.success("Client created");
      }
      setModalVisible(false);
      setEditing(null);
      form.resetFields();
    } catch {
      message.error("Operation failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button
            size="small"
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>{" "}
          <Button
            size="small"
            danger
            onClick={() => dispatch(deleteClient(record.id))}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Client
        </Button>
      </div>

      <Table
        loading={loading}
        dataSource={Array.isArray(items) ? items : []}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? "Edit Client" : "Add Client"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editing ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
