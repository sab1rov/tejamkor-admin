import React, { useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import { $authHost } from "../../http";
import NewsDrawer from "../../components/drawers/NewsDrawer";

function News() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: 2,
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: 4,
      render: (item) => {
        return <p>{item?.length > 40 ? item?.slice(0, 20) + "..." : item}</p>;
      },
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
                <Button danger type="text">
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
    const res = await $authHost.get("/news");
    setData(res.data.data);
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/news/${item.id}`, item);
    getData();
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
      <NewsDrawer
        open={open}
        setOpen={setOpen}
        editingData={editingData}
        getData={getData}
      />
      <Table columns={columns} dataSource={data} rowKey={(item) => item.id} />
    </>
  );
}

export default News;
