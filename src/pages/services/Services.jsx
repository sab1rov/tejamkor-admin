import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ServicesSlider from "../../components/drawers/ServicesSlider";
import { $authHost } from "../../http";

function Services() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const tableColumns = [
    {
      key: 1,
      title: "Title",
      dataIndex: "title",
    },
    {
      key: 2,
      title: "Image",
      dataIndex: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 3,
      title: "Description",
      dataIndex: "description",
      render: (item) => {
        return <p>{item?.length > 40 ? item?.slice(0, 20) + "..." : item}</p>;
      },
    },
    {
      title: "Action",
      key: 4,
      render: (item) => {
        return (
          <>
            <Space direction="vertical">
              <Button type="link" onClick={() => editItem(item)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this company"
                onConfirm={() => deleteItem(item)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const getData = async () => {
    const res = await $authHost.get("/services");
    setData(res.data.data);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/services/${item.id}`, item);
    getData();
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        extra={[
          <Button key="1" onClick={() => setOpen(true)}>
            Add
          </Button>,
        ]}
      />
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
      <ServicesSlider
        open={open}
        setOpen={setOpen}
        getData={getData}
        editingData={editingData}
      />
    </>
  );
}

export default Services;
