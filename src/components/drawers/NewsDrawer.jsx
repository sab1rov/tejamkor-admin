import React, { useEffect } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Tabs } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import moment from "moment";

function NewsDrawer({ open, setOpen, editingData, getData }) {
  const [form] = Form.useForm();

  const postData = async (values) => {
    await $authHost.post("/news", values);
    setOpen(false);
    getData();
  };

  const editData = async (values) => {
    let id = editingData.id;
    await $authHost.patch(`/news/${id}`, values);
    setOpen(false);
    getData();
  };

  const onFinish = async (values) => {
    values.date = values["date"].format("YYYY-MM-DD");
    editingData ? editData(values) : postData(values);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
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
          name="intro"
          label="Intro"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="intro_ru"
          label="Intro Ru"
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
          name="content"
          label="Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{ height: "100px", margin: "10px 0 40px 0" }}
          />
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
          <ReactQuill
            theme="snow"
            style={{ height: "100px", margin: "10px 0 40px 0" }}
          />
        </Form.Item>
      </>
    );
  };

  const TabThree = () => {
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
          name="date"
          label="Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Col span={12}>
          <Form.Item
            name="author"
            label="Author"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="author" />
          </Form.Item>
        </Col>
      </>
    );
  };

  const tabItems = [
    {
      label: "Title and Intro",
      key: 1,
      children: <TabOne />,
    },
    {
      label: "Content",
      key: 2,
      children: <TabTwo />,
    },
    {
      label: "Image, Date and Author",
      key: 3,
      children: <TabThree />,
    },
  ];

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, date: moment(editingData.date) });
    }
  }, [editingData]);

  return (
    <>
      <Drawer title="Drawer" open={open} onClose={onClose} width={600}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs items={tabItems} />
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{ marginTop: "20px" }}
              block
            >
              {editingData ? "Edit" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default NewsDrawer;
