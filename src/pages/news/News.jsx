import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
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
      title: "Intro",
      dataIndex: "intro",
      key: 3,
    },
    {
      title: "Content",
      dataIndex: "content",
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
                onConfirm={() => deleteItem(item)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                >
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
    await $authHost.delete(`/news/${item.id}`, item)
    getData()
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        extra={[<Button onClick={() => setOpen(true)}>Add</Button>]}
      />
      <NewsDrawer
        open={open}
        setOpen={setOpen}
        editingData={editingData}
        getData={getData}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default News;
