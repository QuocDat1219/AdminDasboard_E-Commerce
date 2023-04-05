import MainLayout from "./MainLayout.js";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

function RootLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <div className="flex gap-5">
      <MainLayout />
      <main className="max-w-5xl flex-1 mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;