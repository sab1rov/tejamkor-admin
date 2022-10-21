import { Button, Drawer, Form, Input, Tabs } from "antd";
import React from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function CompanySliderDrawer({ open, setOpen }) {
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const postData = async (values) => {
    await $authHost.post('/company/slider', values)
  }

  const onFinish = async (values) => {
    postData  (values);
  };

  const TabOne = () => {
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
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          name="subtitle"
          label="Subtitle"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subtitle_ru"
          label="Subtitle Ru"
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

  const TabTwo = () => {
    return (
      <>
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
        <Form.Item
          name="video"
          label="Video"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  const tabItem = [
    {
      key: 1,
      label: "Title and Subtitle",
      children: <TabOne />,
    },
    {
      key: 2,
      label: "Image and Video",
      children: <TabTwo />,
    },
  ];

  return (
    <>
      <Drawer title="Drawer" onClose={onClose} open={open} width={600}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs items={tabItem} />
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

export default CompanySliderDrawer;
