import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Tabs } from "antd";
import useLanguage from "../../hooks/useLanguage.js";
import { $authHost } from "../../http";
import MediaUpload from "../MediaUpload";

function CompanyDrawer({
  open,
  setOpen,
  getData,
  editingData,
  setEditingData,
}) {
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
    await $authHost.post("/company", values);
    setLoadingIcon(false);
    setOpen(false);
    form.resetFields();
    getData();
  };

  const editData = async (values) => {
    await $authHost.patch(`/company/${editingData.id}`, values);
    setOpen(false);
    form.resetFields();
    setLoadingIcon(false);
    getData();
  };

  const FirstTab = () => {
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
          name="companyFeatureTitle"
          label={translate("companyFeatureTitle")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("companyFeatureTitle")} />
        </Form.Item>
        <Form.Item
          name="companyFeatureSubTitle"
          label={translate("companyFeatureSubtitle")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("companyFeatureTitle")} />
        </Form.Item>
      </>
    );
  };

  const SecondTab = () => {
    return (
      <>
        <Form.Item
          name="address"
          label={translate("address")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("address")} />
        </Form.Item>
        <Form.Item
          name="address_ru"
          label={translate("address_ru")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("address_ru")} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={translate("phone")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("phone")} />
        </Form.Item>
        <Form.Item
          name="logo"
          label={translate("logo")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MediaUpload form={form} name="logo" />
        </Form.Item>
      </>
    );
  };

  const ThirdTab = () => {
    return (
      <>
        <Form.Item
          name="telegram"
          label={translate("telegram")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("link")} />
        </Form.Item>
        <Form.Item
          name="instagram"
          label={translate("instagram")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("link")} />
        </Form.Item>
        <Form.Item
          name="facebook"
          label={translate("facebook")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("link")} />
        </Form.Item>
        <Form.Item
          name="youtube"
          label={translate("youtube")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={translate("link")} />
        </Form.Item>
        <Form.Item
          name="counts"
          label={translate("counts")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="counts" />
        </Form.Item>
      </>
    );
  };

  const tabItem = [
    {
      key: 1,
      label: `${translate("name")}, ${translate("feature")}`,
      children: <FirstTab />,
    },
    {
      key: 2,
      label: `${translate("address")}, ${translate("phone")}, ${translate(
        "logo"
      )}`,
      children: <SecondTab />,
    },
    {
      key: 3,
      label: translate("link"),
      children: <ThirdTab />,
    },
  ];

  useEffect(() => {
    if (Boolean(editingData)) {
      form.setFieldsValue({ ...editingData, name: editingData.name });
    }
  }, [editingData]);

  return (
    <>
      <Drawer title="Drawer" onClose={onClose} open={open} width={600}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
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

export default CompanyDrawer;
