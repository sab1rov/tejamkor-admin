import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { $authHost } from "../../http";
import axios from "axios";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Menu = () => {
  const [data, setData] = useState({});
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  const handleClick = () => {
    setTimeout(() => {
      form.setFieldsValue({
        note: "Hi, man!",
        email: "Hiiiiiiiii",
      });
    }, 1000 * 5);
  };

  console.log(form);
  const fetchData = async () => {
    const res = await axios.get(
      "https://tejamkor-api.main-gate.appx.uz/api/v1/company/view/4"
    );
    const { data } = res.data;
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
        <Button htmlType="button" onClick={handleClick}>
          handle click
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Menu;
