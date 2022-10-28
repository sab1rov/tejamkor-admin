import { Button, Drawer, Form, Input } from "antd";
import React, { useEffect } from "react";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";
import useLanguage from "../../hooks/useLanguage.js";

function TeamDrawer({ open, setOpen, getData, editingData }) {
  const [form] = Form.useForm();
  const translate = useLanguage()

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
          label={translate("name")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("name")}/>
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
              {translate("submit")}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TeamDrawer;
