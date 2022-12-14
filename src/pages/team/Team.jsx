import React, { useContext, useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import TeamDrawer from "../../components/drawers/TeamDrawer";
import { $authHost } from "../../http";
import useLanguage from "../../hooks/useLanguage.js";
import { LanguageContext } from "../../context/LanguageContext";

function Team() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { language } = useContext(LanguageContext);

  const translate = useLanguage();

  const tableCoumns = [
    {
      key: 1,
      title: translate("name"),
      dataIndex: language === "uz" ? "name" : "name_ru",
    },
    {
      key: 2,
      title: translate("image"),
      dataIndex: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 3,
      title: translate("job"),
      dataIndex: language === "uz" ? "job" : "job_ru",
    },
    {
      title: translate("action"),
      key: 4,
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
    const res = await $authHost.get("/team");
    setData(res.data.data);
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/team/${item.id}`, item);
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
        columns={tableCoumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
      <TeamDrawer
        open={open}
        setOpen={setOpen}
        getData={getData}
        editingData={editingData}
        setEditingData={setEditingData}
      />
    </>
  );
}

export default Team;
