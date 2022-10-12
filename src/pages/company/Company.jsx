import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  PageHeader,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { $authHost } from "../../http";

const initialValue = {
  isOk: true,
  name: "",
  name_ru: "",
  logo: "https://sdb-storage.s3.us-east-2.amazonaws.com/tejamkor/88d34863-6332-4eb9-9e5c-4c8d15529047-logo-horizontal2-1.png",
  companyFeatureTitle: "",
  companyFeatureSubTitle: "",
  address: "",
  address_ru: "",
  phone: "",
  instagram: "",
  facebook: "",
  telegram: "",
  youtube: "",
  counts: "asa",
};

function Company() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [id, setId] = useState(null);

  const onClose = () => {
    setOpen(false);
    setInputValue(initialValue);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: 1,
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: 2,
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: 3,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: 4,
    },
    {
      title: "Action",
      key: 5,
      render: (item) => {
        return (
          <>
            <Space direction="vertical">
              <Button type="primary" onClick={() => editItem(item)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this company"
                onConfirm={deleteItem}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" onClick={setId(item.id)}>
                  O'chirish
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const editItem = () => {

  };

  const deleteItem = () => {};

  const postData = async() => {
    let res = await $authHost.post('/company', inputValue)
    setData(res.data.data)
    setOpen(false)
    setInputValue(initialValue)
    setRefresh(true)
    if(refresh) {
      setRefresh(!refresh)
    }
    console.log(res, 'res');
  }

  // const patchData = () => {

  // }

  const fetchData = async () => {
    let res = await $authHost.get("/company");
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        extra={[
          <Button key="1" onClick={() => setOpen(true)}>
            Add
          </Button>,
        ]}
      />

      <Drawer
        title="Adding new Menu"
        width={600}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={postData}
              type="primary"
            >
              {inputValue.isOk ? "Add" : "Edit"}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              placeholder="input placeholder"
              name="name"
              value={inputValue.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Name Ru">
            <Input
              placeholder="input placeholder"
              name="name_ru"
              value={inputValue.name_ru}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              placeholder="address"
              name="address"
              value={inputValue.address}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Address Ru">
            <Input
              placeholder="address ru"
              name="address_ru"
              value={inputValue.address_ru}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Featue Title">
            <Input
              placeholder="feature title"
              name="companyFeatureTitle"
              value={inputValue.companyFeatureTitle}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Featue Subtitle">
            <Input
              placeholder="feature subtitle"
              name="companyFeatureSubTitle"
              value={inputValue.companyFeatureSubTitle}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input
              placeholder="number"
              name="phone"
              value={inputValue.phone}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
        <Form>
          <Row>
            <Col span={12}>
              <Form.Item label="Instagram">
                <Input
                  placeholder="insta link"
                  name="instagram"
                  value={inputValue.instagram}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Telegram">
                <Input
                  placeholder="telegram link"
                  name="telegram"
                  value={inputValue.telegram}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Facebook">
                <Input
                  placeholder="facebook link"
                  name="facebook"
                  value={inputValue.facebook}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="YouTube">
                <Input
                  placeholder="youtube link"
                  name="youtube"
                  value={inputValue.youtube}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default Company;
