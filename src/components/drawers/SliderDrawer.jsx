import { Button, Drawer, Form, Input, Tabs } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function SliderDrawer({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    editingData ? editData(values) : postData(values);
  };

  const postData = async (values) => {
    await $authHost.post("/slider", values);
    setOpen(false);
    getData();
  };

  const editData = async (values) => {
    await $authHost.patch(`/slider/${editingData.id}`, values);
    setOpen(false);
    getData();
  };

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
          name="subtitle"
          label="Subtitle"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="subtitle" />
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
          <Input placeholder="subtitle_ru" />
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
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
              required: true,
            },
          ]}
        >
          <Input placeholder="video link" />
        </Form.Item>
      </>
    );
  };

  const tabItem = [
    {
      key: 1,
      label: "Title and Subtitle",
      children: <FirstTab />,
    },
    {
      key: 2,
      label: "Image and Video",
      children: <SecondTab />,
    },
  ];

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, title: editingData.title });
    }
  }, [editingData]);

  return (
    <>
      <Drawer open={open} onClose={onClose} width={600} title="Drawer">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs items={tabItem} />
          <Form.Item>
            <Button htmlType="submit" block size="large" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default SliderDrawer;
