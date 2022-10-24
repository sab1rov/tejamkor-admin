import { Button, Drawer, Form, Input, Tabs } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function CompanyDrawer({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    editingData ? editData(values) : postData(values);
  };

  const postData = async (values) => {
    await $authHost.post("/company", values);
    setOpen(false);
    getData();
  };

  const editData = async (values) => {
    await $authHost.patch(`/company/${editingData.id}`, values);
    setOpen(false);
    getData();
  };

  const FirstTab = () => {
    return (
      <>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name_ru"
          label="Name Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyFeatureTitle"
          label="Company Feature Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyFeatureSubTitle"
          label="Company Feature SubTitle"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
    return (
      <>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address_ru"
          label="Address Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="logo"
          label="Logo"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MediaUpload form={form} name="logo" />
        </Form.Item>
      </>
    );
  };

  const ThirdTab = () => {
    return (
      <>
        <Form.Item
          name="telegram"
          label="Telegram"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="instagram"
          label="Instagram"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="facebook"
          label="Facebook"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="youtube"
          label="Youtube"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="counts"
          label="Counts"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="counts" />
        </Form.Item>
      </>
    );
  };

  const tabItem = [
    {
      key: 1,
      label: "Name and Feature",
      children: <FirstTab />,
    },
    {
      key: 2,
      label: "Address, Phone and Logo",
      children: <SecondTab />,
    },
    {
      key: 3,
      label: "Links",
      children: <ThirdTab />,
    },
  ];

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, name: editingData.name });
    }
  }, [editingData]);

  return (
    <>
      <Drawer title="Drawer" onClose={onClose} open={open} width={600}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Tabs items={tabItem} />
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>
              {editingData ? "Edit" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default CompanyDrawer;
