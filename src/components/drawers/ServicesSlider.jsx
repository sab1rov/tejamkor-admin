import { Button, Drawer, Form, Input, Tabs } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function ServicesSlider({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();

  const FirstTab = () => {
    return (
      <>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          name="title_ru"
          label="Title Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="title_ru" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="description" />
        </Form.Item>
        <Form.Item
          name="description_ru"
          label="Description Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="description_ru" />
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
    return (
      <>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="content" />
        </Form.Item>
        <Form.Item
          name="content_ru"
          label="Content Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="content_ru" />
        </Form.Item>
        <Form.Item
          name="slug"
          label="Slug"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="slug" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MediaUpload form={form} />
        </Form.Item>
      </>
    );
  };

  const tabItems = [
    {
      key: 1,
      label: "Title and Description",
      children: <FirstTab />,
    },
    {
      key: 2,
      label: "Content, Slug and Image",
      children: <SecondTab />,
    },
  ];

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    editingData ? editData(values) : postData(values);
  };

  const postData = async (values) => {
    await $authHost.post("/services", values);
    setOpen(false);
    getData();
  };

  const editData = async (values) => {
    await $authHost.patch(`/services/${editingData.id}`, values);
    setOpen(false);
    getData();
  };

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, title: editingData.title });
    }
  }, [editingData]);

  return (
    <>
      <Drawer open={open} onClose={onClose} width={600} title="Drawer">
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Tabs items={tabItems} />
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default ServicesSlider;
