import { Button, Drawer, Form, Input, Tabs } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import useLanguage from "../../hooks/useLanguage.js";

function ServicesSlider({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();
  const translate = useLanguage()

  const FirstTab = () => {
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
          name="description"
          label={translate("description")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("description")} />
        </Form.Item>
        <Form.Item
          name="description_ru"
          label={translate("description_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("description_ru")}/>
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
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
          <Input placeholder={translate("content")} />
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
          <Input placeholder={translate("content_ru")} />
        </Form.Item>
        <Form.Item
          name="slug"
          label={translate("slug")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("slug")} />
        </Form.Item>
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
      </>
    );
  };

  const tabItems = [
    {
      key: 1,
      label: `${translate("title")}, ${translate("description")}`,
      children: <FirstTab />,
    },
    {
      key: 2,
      label: `${translate('content')}, ${translate("slug")}, ${translate("image")}`,
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
