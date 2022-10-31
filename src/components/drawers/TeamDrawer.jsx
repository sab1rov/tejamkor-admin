import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import useLanguage from "../../hooks/useLanguage.js";

function TeamDrawer({ open, setOpen, getData, editingData, setEditingData }) {
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
    await $authHost.post("/team", values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

  const editData = async (values) => {
    await $authHost.patch(`/team/${editingData.id}`, values);
    setOpen(false);
    getData();
    setLoadingIcon(false);
    form.resetFields();
  };

  const FormItems = () => {
    return (
      <>
        <Form.Item
          name="name"
          label={translate("name")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("name")} />
        </Form.Item>
        <Form.Item
          name="name_ru"
          label={translate("name_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("name_ru")} />
        </Form.Item>
        <Form.Item
          name="job"
          label={translate("job")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("job")} />
        </Form.Item>
        <Form.Item
          name="job_ru"
          label={translate("job_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("job_ru")} />
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

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, name: editingData.name });
    }
  }, [editingData]);

  return (
    <>
      <Drawer open={open} onClose={onClose} width={600} title="Drawer">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <FormItems />
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

export default TeamDrawer;
