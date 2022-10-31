import React, { useContext, useState } from "react";
import { Form, Input, Button, Row, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { domain } from "../../utils/urls";
import { userContext } from "../../context/UserContext";

function Login() {
  const { setUser } = useContext(userContext);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [finishValues, setFinishValues] = useState(null);

  const onFinish = async (values) => {
    setLoadingIcon(true);
    setFinishValues(values);
    const response = await axios.post(`${domain}/admin/login`, values);
    const { data } = response.data;
    const tokens = await data?.tokens;
    if (Boolean(data)) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("id", data.id);
      localStorage.setItem("user", true);

      setUser(true);
      setLoadingIcon(false);
    } else {
      setLoadingIcon(false);
    }
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
        title="Login"
        style={{
          width: 300,
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Login"
            name="username"
            rules={[
              {
                required: true,
                message: "Iltimos loginni kiriting!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Login"
            />
          </Form.Item>
          <Form.Item
            label="Parol"
            name="pwd"
            rules={[
              {
                required: true,
                message: "Iltimos parolni kiriting!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Parol"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={loadingIcon}
              onClick={() => {
                if (Boolean(finishValues)) {
                  setLoadingIcon(true);
                }
              }}
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

// {
//   username,
//   pwd,
// }
