import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import CompanyDrawer from "../../components/drawers/CompanyDrawer";
import { $authHost } from "../../http";

function Company() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const tableColumns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
    },
    {
      key: 2,
      title: "Logo",
      dataIndex: "logo",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 4,
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: 5,
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

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true)
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/company/${item.id}`)
    getData()
  }


  const getData = async () => {
    const res = await $authHost.get("company");
    setData(res.data.data);
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
      <CompanyDrawer
        open={open}
        setOpen={setOpen}
        getData={getData}
        editingData={editingData}
        setEditingData={setEditingData}
      />
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
    </>
  );
}

export default Company;
