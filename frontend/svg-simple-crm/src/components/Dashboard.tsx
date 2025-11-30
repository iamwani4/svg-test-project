import { Card, Row, Col } from "antd";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Products">12</Card>
        </Col>
        <Col span={8}>
          <Card title="Total Clients">45</Card>
        </Col>
        <Col span={8}>
          <Card title="Total Orders">89</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
