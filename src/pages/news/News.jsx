import React, { useContext, useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import { $authHost } from "../../http";
import NewsDrawer from "../../components/drawers/NewsDrawer";
import useLanguage from "../../hooks/useLanguage.js";
import { LanguageContext } from "../../context/LanguageContext";

function News() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { language } = useContext(LanguageContext);

  const translate = useLanguage();

  const columns = [
    {
      title: translate("title"),
      dataIndex: language === "uz" ? "title" : "title_ru",
      key: 1,
    },
    {
      title: translate("image"),
      dataIndex: "image",
      key: 2,
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: translate("content"),
      dataIndex: language === "uz" ? "content" : "content_ru",
      key: 4,
      render: (item) => {
        return <p>{item?.length > 40 ? item?.slice(0, 20) + "..." : item}</p>;
      },
    },
    {
      title: translate("action"),
      key: 5,
      render: (item) => {
        return (
          <>
            <Space direction="vertical">
              <Button type="link" onClick={() => editItem(item)}>
                {translate("edit")}
              </Button>
              <Popconfirm
                title="Are you sure to delete this company"
                onConfirm={() => deleteItem(item)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="text">
                  {translate("delete")}
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
            {translate("add")}
          </Button>,
        ]}
      />
      <NewsDrawer
        open={open}
        setOpen={setOpen}
        editingData={editingData}
        setEditingData={setEditingData}
        getData={getData}
      />
      <Table columns={columns} dataSource={data} rowKey={(item) => item.id} />
    </>
  );
}

export default News;
