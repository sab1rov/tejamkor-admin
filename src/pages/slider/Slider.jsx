import React, { useContext, useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import { LanguageContext } from "../../context/LanguageContext";
import { $authHost } from "../../http";
import useLanguage from "../../hooks/useLanguage.js";
import SliderDrawer from "../../components/drawers/SliderDrawer";

function Slider() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { language } = useContext(LanguageContext);

  const translate = useLanguage();

  const tableColumns = [
    {
      title: translate("title"),
      dataIndex: language === "uz" ? "title" : "title_ru",
      key: 1,
    },
    {
      title: translate("image"),
      dataIndex: "image",
      key: 4,
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: translate("subtitle"),
      dataIndex: language === "uz" ? "subtitle" : "subtitle_ru",
      key: 2,
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
                <Button type="text" danger>
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
    const res = await $authHost.get("/slider");
    setData(res.data.data);
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/slider/${item.id}`, item);
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
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
      <SliderDrawer
        open={open}
        setOpen={setOpen}
        getData={getData}
        editingData={editingData}
        setEditingData={setEditingData}
      />
    </>
  );
}

export default Slider;
