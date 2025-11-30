import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton
        expand
        duration={5000}
        toastOptions={{
          style: { fontSize: "14px" },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
