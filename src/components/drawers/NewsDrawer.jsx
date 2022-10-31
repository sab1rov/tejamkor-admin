import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Tabs } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import moment from "moment";
import useLanguage from "../../hooks/useLanguage.js";

function NewsDrawer({ open, setOpen, editingData, setEditingData, getData }) {
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [form] = Form.useForm();
  const translate = useLanguage();

  const postData = async (values) => {
    await $authHost.post("/news", values);
    setOpen(false);
    getData();
    form.resetFields();
    setLoadingIcon(false)
  };

  const editData = async (values) => {
    let id = editingData.id;
    await $authHost.patch(`/news/${id}`, values);
    setOpen(false);
    getData();
    form.resetFields();
    setLoadingIcon(false)
  };

  const onFinish = async (values) => {
    setEditingData(null);
    values.date = values["date"].format("YYYY-MM-DD");
    editingData ? editData(values) : postData(values);
    setLoadingIcon(true)
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
          label={translate("title")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("title")} />
        </Form.Item>
        <Form.Item
          name="title_ru"
          label={translate("title_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("title_ru")} />
        </Form.Item>
        <Form.Item
          name="intro"
          label={translate("intro")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("intro")} />
        </Form.Item>
        <Form.Item
          name="intro_ru"
          label={translate("intro_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("intro_ru")} />
        </Form.Item>
      </>
    );
  };

  const TabTwo = () => {
    return (
      <>
        <Form.Item
          name="content"
          label={translate("content")}
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
          label={translate("content_ru")}
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
          label={translate("image")}
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
          label={translate("date")}
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
            label={translate("author")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate("author")} />
          </Form.Item>
        </Col>
      </>
    );
  };

  const tabItems = [
    {
      label: `${translate("title")}, ${translate("intro")}`,
      key: 1,
      children: <TabOne />,
    },
    {
      label: translate("content"),
      key: 2,
      children: <TabTwo />,
    },
    {
      label: `${translate("image")}, ${translate("date")}, ${translate(
        "author"
      )}`,
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
              loading={loadingIcon}
            >
              {translate("submit")}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default NewsDrawer;
