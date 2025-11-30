import { useState } from "react";
import { Button, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/reducers/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", values);
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      toast.success("Logged in");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
        <div className="mt-4 text-center">
          No account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}
