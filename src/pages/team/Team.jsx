import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import TeamDrawer from "../../components/drawers/TeamDrawer";
import { $authHost } from "../../http";

function Team() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null)

  const tableCoumns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
    },
    {
      key: 2,
      title: "Job",
      dataIndex: "job",
    },
    {
      key: 3,
      title: "Image",
      dataIndex: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: "Action",
      key: 4,
      render: (item) => {
        return (
          <>
            <Space direction="vertical">
              <Button
                type="link"
                onClick={() => editItem(item)}
              >
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
    const res = await $authHost.get("/team");
    setData(res.data.data);
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true)
  }

  const deleteItem = async (item) => {
    await $authHost.delete(`/team/${item.id}`, item)
    getData()
  }

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
        columns={tableCoumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
      <TeamDrawer open={open} setOpen={setOpen} getData={getData} editingData={editingData} />
    </>
  );
}

export default Team;
