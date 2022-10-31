import { Button, Drawer, Form, Input, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import useLanguage from "../../hooks/useLanguage.js";

function CompanySliderDrawer({
  open,
  setOpen,
  editingData,
  setEditingData,
  getData,
}) {
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [form] = Form.useForm();
  const translate = useLanguage();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setEditingData(null);
  };

  const postData = async (values) => {
    await $authHost.post("/company/slider", values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

  const editData = async (values) => {
    let id = editingData.id;
    await $authHost.patch(`/company/slider/${id}`, values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoadingIcon(true);
    editingData ? editData(values) : postData(values);
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

  const TabTwo = () => {
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
      children: <TabOne />,
    },
    {
      key: 2,
      label: `${translate("image")}, ${translate("video")}`,
      children: <TabTwo />,
    },
  ];

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, title: editingData.title });
    }
  }, [editingData]);

  return (
    <>
      <Drawer title="Drawer" onClose={onClose} open={open} width={600}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs items={tabItem} />
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
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

export default CompanySliderDrawer;
