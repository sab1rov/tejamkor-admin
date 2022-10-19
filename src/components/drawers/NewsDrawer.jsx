import React, { useState } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Tabs } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function NewsDrawer({ open, setOpen }) {
  const [form] = Form.useForm();
  const [data, setData] = useState({});

  const dateChange = (date, dateString) => {};

  const postData = async () => {
    await $authHost.post("/news", data);
  };

  const onFinish = async (values) => {
    values.date = values["date"].format("YYYY-MM-DD");
    setData(values);
    postData();
  };

  const onClose = () => {
    setOpen(false);
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
        <Row>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                onChange={(dateString) => {
                  dateChange(dateString);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
        </Row>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            style={{ marginTop: "20px" }}
            block
          >
            Submit
          </Button>
        </Form.Item>
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

  return (
    <>
      <Drawer title="Drawer" open={open} onClose={onClose} width={600}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs items={tabItems} />
        </Form>
      </Drawer>
    </>
  );
}

export default NewsDrawer;
