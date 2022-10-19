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
  isNew: true,
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
  const [refresh, setRefresh] = useState(false);
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

  const f = () => {

  }

  const handleAddress = (e) => {
    setInputValue({...inputValue, address: e.target.value})
  }

  const editItem = (item) => {
    setId(item.id);
    setInputValue({
      isNew: false,
      name: item?.name,
      name_ru: item?.name_ru,
      logo: "https://sdb-storage.s3.us-east-2.amazonaws.com/tejamkor/88d34863-6332-4eb9-9e5c-4c8d15529047-logo-horizontal2-1.png",
      companyFeatureTitle: item?.companyFeatureTitle,
      companyFeatureSubTitle: item?.companyFeatureSubTitle,
      address: item?.address,
      address_ru: item?.address_ru,
      phone: item?.phone,
      instagram: item?.instagram,
      facebook: item?.facebook,
      telegram: item?.telegram,
      youtube: item?.youtube,
      counts: "asa",
    });
    setOpen(true);
    // setData(inputValue)
  };

  const deleteItem = () => {};

  const postData = async () => {
    let res = await $authHost.post("/company", inputValue);
    setData(res.data.data);
    setOpen(false);
    setInputValue(initialValue);
    setRefresh(true);
    if (refresh) {
      setRefresh(!refresh);
    }
    console.log(res, "res");
  };

  const patchData = async () => {
    let res = await $authHost.patch(`/company/${id}`, inputValue);

    console.log(res);
  };

  const fetchData = async () => {
    let res = await $authHost.get("/company");
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(inputValue);

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
              onClick={inputValue?.isNew ? postData : patchData}
              type="primary"
            >
              {inputValue?.isNew ? "Add" : "Edit"}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                // message: "Please input!",
              },
            ]}
          >
            <Input
              placeholder="input placeholder"
              // name="name"
              value={inputValue.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Name Ru"
            name="name ru"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              placeholder="input placeholder"
              name="name ru"
              value={inputValue.name_ru}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              placeholder="address"
              value={inputValue.address}
              onChange={handleAddress}
            />
          </Form.Item>
          <Form.Item
            label="Address Ru"
            name="address_ru"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="address ru"
              value={inputValue.address_ru}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Company Featue Title"
            name="companyFeatureTitle"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="feature title"
              value={inputValue.companyFeatureTitle}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Company Featue Subtitle"
            name="companyFeatureSubTitle"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="feature subtitle"
              value={inputValue.companyFeatureSubTitle}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="number"
              value={inputValue.phone}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
        <Form>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Instagram"
                name="instagram"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  placeholder="insta link"
                  value={inputValue.instagram}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Telegram"
                name="telegram"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  placeholder="telegram link"
                  value={inputValue.telegram}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Facebook"
                name="facebook"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  placeholder="facebook link"
                  value={inputValue.facebook}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="YouTube"
                name="youtube"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  placeholder="youtube link"
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
