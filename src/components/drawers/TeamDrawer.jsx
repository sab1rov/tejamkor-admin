import { Button, Drawer, Form, Input } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function TeamDrawer({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    editingData ? editData(values) : postData(values)
  };

  const postData = async(values) => {
    await $authHost.post('/team', values)
    setOpen(false)
    getData()
  }

  const editData = async (values) => {
    await $authHost.patch(`/team/${editingData.id}`, values)
    setOpen(false)
    getData()
  }

  const FormItems = () => {
    return (
      <>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          name="name_ru"
          label="Name Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="name_ru" />
        </Form.Item>
        <Form.Item
          name="job"
          label="Job"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="job" />
        </Form.Item>
        <Form.Item
          name="job_ru"
          label="Job Ru"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="job_ru" />
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

  useEffect(() => {
    if(Boolean(editingData)){
        form.setFieldsValue({...editingData, name: editingData.name})
    }
  }, [editingData])

  return (
    <>
      <Drawer open={open} onClose={onClose} width={600} title="Drawer">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <FormItems />
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

export default TeamDrawer;
