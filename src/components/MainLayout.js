import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  FiShoppingBag,
  FiAlignCenter,
  FiHome,
  FiBox,
  FiList,
  FiLink,
  FiLayers,
  FiSend,
  FiGrid,
  FiTrello,
  FiPlusSquare,
  FiPackage,
  FiPaperclip,
  FiSettings
} from "react-icons/fi";

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">AD</span>
            <span className="lg-logo">ADMIN</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "Catalogs",
              icon: <FiList className="fs-4" />,
              label: "Quản lý danh mục hàng hóa",
              children: [
                {
                  key: "category",
                  icon: <FiPlusSquare className="fs-4" />,
                  label: "Thêm danh mục hàng hóa",
                },
                {
                  key: "list-category",
                  icon: <FiLayers className="fs-4" />,
                  label: "Tổng hợp danh mục",
                },
              ],
            },
            {
              key: "Catalog",
              icon: <FiShoppingBag className="fs-4" />,
              label: "Hàng Hóa",
              children: [
                {
                  key: "product",
                  icon: <FiPlusSquare className="fs-4" />,
                  label: "Thêm hàng hóa",
                },
                {
                  key: "list-product",
                  icon: <FiPackage className="fs-4" />,
                  label: "Danh sách hàng hóa",
                },
              ],
            },
            {
              key: "Catalogg",
              icon: <FiTrello className="fs-4" />,
              label: "Quản lý menu",
              children: [
                {
                  key: "menu",
                  icon: <FiPlusSquare className="fs-4" />,
                  label: "Thêm Menu",
                },
                {
                  key: "menu-list",
                  icon: <FiGrid className="fs-4" />,
                  label: "Danh sách menu",
                },
              ],
            },
            {
              key: "ConfigChat",
              icon: <FiList className="fs-4" />,
              label: "Cài đặt chat fb",
              children: [
                {
                  key: "config",
                  icon: <FiAlignCenter className="fs-4" />,
                  label: "Cài đặt",
                },
                {
                  key: "config-list",
                  icon: <FiBox className="fs-4" />,
                  label: "Xem cài đặt",
                },
              ],
            },
            {
              key: "linkssss",
              icon: <FiLink className="fs-4" />,
              label: "Quản lý liên kết",
              children: [
                {
                  key: "add-link",
                  icon: <FiPlusSquare className="fs-4" />,
                  label: "Thêm Link",
                },
                {
                  key: "link-list",
                  icon: <FiPaperclip className="fs-4" />,
                  label: "Danh sách Link",
                },
              ],
            },
            {
              key: "setting",
              icon: <FiSettings className="fs-4" />,
              label: "Cài đặt",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Navdeep</h5>
                <p className="mb-2">navdeepdahiya753@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
