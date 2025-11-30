import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../store/reducers/comments";
import { Table, Button, Modal, Form, Input, Space, Tag, message } from "antd";

const Comments = () => {
  const dispatch = useDispatch<any>();
  const { items = [], loading = false } = useSelector(
    (state: any) => state.comments || {}
  );
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      if (editing) {
        await dispatch(
          updateComment({ id: editing.id, content: values.content })
        ).unwrap();
        message.success("Comment updated");
      } else {
        await dispatch(createComment(values)).unwrap();
        message.success("Comment created");
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
    } catch {
      message.error("Operation failed");
    }
  };

  const columns = [
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Author",
      render: (_: any, r: any) => <Tag>{r.User?.name || "—"}</Tag>,
      key: "author",
    },
    {
      title: "Actions",
      render: (_: any, r: any) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setEditing(r);
              form.setFieldsValue({ content: r.content });
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            danger
            onClick={() => dispatch(deleteComment(r.id))}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          New Comment
        </Button>
      </div>

      <Table
        dataSource={Array.isArray(items) ? items : []}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editing ? "Edit Comment" : "New Comment"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="content" rules={[{ required: true, min: 3 }]}>
            <Input.TextArea rows={4} placeholder="Write your comment..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Comments;
