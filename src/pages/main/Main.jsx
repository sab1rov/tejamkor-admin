import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import { Layout, Menu, PageHeader, Select } from "antd";
import { LanguageContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
import { sidebarData } from "../../utils/Data";
import { publicRoutes } from "../../components/routes/Routes";
import Logo from "../../assets/img/tejamkor__logo.svg";

const { Sider, Content } = Layout;
const { Option } = Select;

function Main() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [activeKey, setActiveKey] = useState(["1"]);
  const location = useLocation();
  const translate = useLanguage();

  const handleLangChange = (target) => {
    localStorage.setItem("language", target);
    setLanguage(target);
  };

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
            mode="inline"
            selectedKeys={activeKey}
            items={sidebarData.map((item) => ({
              label: <Link to={item.path}>{translate(item.label)}</Link>,
              key: item.key,
            }))}
            style={{ marginTop: "20px" }}
          />
        </Sider>
        <Layout className="site-layout">
          <PageHeader
            className="header"
            extra={
              <Select
                defaultValue={language}
                style={{ width: 120 }}
                onChange={handleLangChange}
              >
                <Option value="uz">Uzbekcha</Option>
                <Option value="ru">Русский</Option>
              </Select>
            }
          />
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
                  />
                );
              })}
              <Route path="/login" element={<Navigate to="/" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
