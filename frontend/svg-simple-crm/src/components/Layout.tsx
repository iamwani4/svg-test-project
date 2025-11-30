import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout as AntLayout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../store/reducers/auth";

const { Header, Content, Sider } = AntLayout;

const Layout = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userFromLocalStorage || !token) {
      navigate("/login", { replace: true });
    } else {
      if (!user) {
        dispatch(
          setCredentials({
            token,
            user: JSON.parse(userFromLocalStorage),
          })
        );
      }
    }
  }, [user, navigate]);

  if (!user) return null;

  const menuItems = [
    { key: "/", label: "Dashboard" },
    { key: "/products", label: "Products" },
    { key: "/clients", label: "Clients" },
    { key: "/orders", label: "Orders" },
    { key: "/comments", label: "Comments" },
    user.isAdmin && { key: "/users", label: "Users" },
  ].filter(Boolean) as any[];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="p-4 text-white text-xl">Client Manager</div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={() => dispatch(logout())}
            className="text-white hover:underline"
          >
            Logout
          </button>
        </div>
      </Sider>

      <AntLayout>
        <Header className="bg-white shadow flex items-center">
          <h1 className="text-2xl">Welcome, {user.name}</h1>
        </Header>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
