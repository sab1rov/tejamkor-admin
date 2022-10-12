import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { sidebarData } from "../../utils/Data";
import { publicRoutes } from "../../components/routes/Routes";
import { Layout, Menu } from "antd";
import Logo from "../../assets/img/tejamkor__logo.svg";
import { Header } from "antd/lib/layout/layout";
const { Sider, Content } = Layout;

function Main() {
  const [activeKey, setActiveKey] = useState(["1"]);
  const location = useLocation();

  useEffect(() => {
    for (let item of sidebarData) {
      if (item.path === location.pathname) {
        setActiveKey([`${item.key}`]);
      }
    }
  }, [location]);

  return (
    <>
      <Layout style={{ marginTop: "20px" }}>
        <Sider trigger={null} theme={"light"}>
          <img src={Logo} alt="logo" />
          <Menu
            className="sidebar"
            theme="light"
            mode="inline"
            defaultSelectedKeys={activeKey}
            items={sidebarData.map((item) => ({
              label: <Link to={item.path}>{item.label}</Link>,
            }))}
            style={{ marginTop: "20px" }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ width: "100%", background: "white" }}></Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "white",
            }}
          >
            <Routes>
              {publicRoutes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={item.component}
                    exact
                  />
                );
              })}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
