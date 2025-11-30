import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../store/reducers/products";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";

const Products = () => {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector(
    (state: any) => state.product || {}
  );
  const [form] = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      if (editing) {
        await dispatch(updateProduct({ id: editing.id, ...values })).unwrap();
        message.success("Product updated");
      } else {
        await dispatch(createProduct(values)).unwrap();
        message.success("Product created");
      }
      setModalVisible(false);
      setEditing(null);
      form.resetFields();
    } catch (err) {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      message.success("Product deleted");
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${Number(price).toFixed(2)}`,
    },
    { title: "Description", dataIndex: "description", key: "description" },
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
          <Button size="small" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Product
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
        title={editing ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
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

export default Products;
