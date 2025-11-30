import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setOrders, addOrder } from "../store/reducers/orders";
import { searchClients } from "../store/reducers/clients";
import axios from "../lib/axios";
import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Space,
  Tag,
  Typography,
  message,
  Input,
} from "antd";

const { Text } = Typography;

const Orders = () => {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector(
    (state: any) => state.orders || {}
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [clientSearch, setClientSearch] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("/orders");
        dispatch(setOrders([...res.data]));
      } catch {
        message.error("Failed to load orders");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetch();
  }, [dispatch]);

  const handleClientSearch = async (value: string) => {
    setClientSearch(value);
    if (value.length > 1) {
      const res = await dispatch(searchClients(value) as any);
      setClients(res.payload || []);
    }
  };

  const addItem = () =>
    setOrderItems([...orderItems, { name: "", price: 0, quantity: 1 }]);

  const removeItem = (i: number) =>
    setOrderItems(orderItems.filter((_, idx) => idx !== i));

  const onFinish = async (values: any) => {
    const total = orderItems.reduce((s, it) => s + it.price * it.quantity, 0);
    const cash = Number(values.cashAmount || 0);
    const card = Number(values.cardAmount || 0);

    if (total !== cash + card) {
      message.error("Cash + Card must equal total amount");
      return;
    }

    try {
      const res = await axios.post("/orders", {
        clientId: values.clientId || null,
        items: orderItems.map((it) => ({
          productId: 0,
          quantity: it.quantity,
          price: it.price,
        })),
        cashAmount: cash,
        cardAmount: card,
      });
      dispatch(addOrder({ ...res.data }));
      message.success("Order created");
      setModalOpen(false);
      form.resetFields();
      setOrderItems([]);
    } catch {
      message.error("Failed to create order");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Client",
      render: (_: any, r: any) => r.Client?.name || "-",
      key: "client",
    },
    {
      title: "Total",
      render: (_: any, r: any) => `$${r.totalAmount}`,
      key: "total",
    },
    {
      title: "Payment",
      render: (_: any, r: any) => (
        <Space>
          {r.cashAmount > 0 && <Tag color="green">Cash ${r.cashAmount}</Tag>}
          {r.cardAmount > 0 && <Tag color="blue">Card ${r.cardAmount}</Tag>}
        </Space>
      ),
      key: "payment",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
          New Order
        </Button>
      </div>

      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Create Order"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={900}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="clientId"
            label="Client"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              onSearch={handleClientSearch}
              placeholder="Search client"
            >
              {clients.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Text strong>Items</Text>
          {orderItems.map((it, i) => (
            <Space key={i} className="block mb-2">
              <Input
                placeholder="Name"
                value={it.name}
                onChange={(e) => {
                  const newItems = [...orderItems];
                  newItems[i].name = e.target.value;
                  setOrderItems(newItems);
                }}
              />
              <InputNumber
                placeholder="Price"
                min={0}
                value={it.price}
                onChange={(v) => {
                  const newItems = [...orderItems];
                  newItems[i].price = Number(v);
                  setOrderItems(newItems);
                }}
              />
              <InputNumber
                placeholder="Qty"
                min={1}
                value={it.quantity}
                onChange={(v) => {
                  const newItems = [...orderItems];
                  newItems[i].quantity = Number(v);
                  setOrderItems(newItems);
                }}
              />
              <Button danger onClick={() => removeItem(i)}>
                Remove
              </Button>
            </Space>
          ))}
          <Button onClick={addItem} className="mb-4">
            Add Item
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="cashAmount" label="Cash Amount">
              <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="cardAmount" label="Card Amount">
              <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" block>
            Create Order
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
