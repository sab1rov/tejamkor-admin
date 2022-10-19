import React, { useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import { $authHost } from "../../http";
import NewsDrawer from "../../components/drawers/NewsDrawer";

function News() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

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
              <Button
                type="primary"
                 onClick={() => editItem(item)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this company"
                // onConfirm={deleteItem}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                  //  onClick={setId(item.id)}
                >
                  O'chirish
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

  const editItem = () => {
    
  } 

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {

  }, [])

  return (
    <>
      <PageHeader
        className="site-page-header"
        extra={[<Button onClick={() => setOpen(true)}>Add</Button>]}
      />
      <NewsDrawer open={open} setOpen={setOpen} />
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default News;