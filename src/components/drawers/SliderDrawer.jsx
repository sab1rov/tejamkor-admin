import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Tabs } from "antd";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import useLanguage from "../../hooks/useLanguage.js";

function SliderDrawer({ open, setOpen, getData, editingData, setEditingData }) {
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [form] = Form.useForm();
  const translate = useLanguage();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setEditingData(null);
  };

  const onFinish = (values) => {
    setLoadingIcon(true);
    editingData ? editData(values) : postData(values);
  };

  const postData = async (values) => {
    await $authHost.post("/slider", values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

  const editData = async (values) => {
    await $authHost.patch(`/slider/${editingData.id}`, values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

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
          name="subtitle"
          label={translate("subtitle")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("subtitle")} />
        </Form.Item>
        <Form.Item
          name="subtitle_ru"
          label={translate("subtitle_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("subtitle_ru")} />
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
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
          name="video"
          label={translate("video")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("link")} />
        </Form.Item>
      </>
    );
  };

  const tabItem = [
    {
      key: 1,
      label: `${translate("title")}, ${translate("subtitle")}`,
      children: <FirstTab />,
    },
    {
      key: 2,
      label: `${translate("image")}, ${translate("video")}`,
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
            <Button
              htmlType="submit"
              block
              size="large"
              type="primary"
              loading={loadingIcon}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default SliderDrawer;
