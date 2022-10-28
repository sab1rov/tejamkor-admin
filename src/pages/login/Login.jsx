import React, { useContext, useState } from "react";
import { Form, Input, Button, Row, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { domain } from "../../utils/urls";
import { userContext } from "../../context/UserContext";

function Login() {
  const { user, setUser } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${domain}/admin/login`, {
      username,
      pwd,
    });
    const { data } = response.data;
    const { tokens } = data;
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("id", data.id);
    localStorage.setItem("user", true);

    setUser(true);
  };

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card
        title="Kirish"
        style={{
          width: 300,
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="Login"
            rules={[
              {
                required: true,
                message: "Iltimos loginni kiriting!",
              },
            ]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Login"
            />
          </Form.Item>
          <Form.Item
            name="Parol"
            rules={[
              {
                required: true,
                message: "Iltimos parolni kiriting!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Parol"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loadingIcon}
              onClick={(e) => handleSubmit(e)}
              block
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default Login;
