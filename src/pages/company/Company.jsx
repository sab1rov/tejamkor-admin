import React, { useContext, useEffect, useState } from "react";
import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import CompanyDrawer from "../../components/drawers/CompanyDrawer";
import { $authHost } from "../../http";
import useLanguage from "../../hooks/useLanguage.js";
import { LanguageContext } from "../../context/LanguageContext";

function Company() {
  const { language } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const translate = useLanguage();

  const tableColumns = [
    {
      key: 1,
      title: translate("name"),
      dataIndex: language === "uz" ? "name" : "name_ru",
    },
    {
      key: 2,
      title: translate("logo"),
      dataIndex: "logo",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 4,
      title: translate("phone"),
      dataIndex: "phone",
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

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/company/${item.id}`);
    getData();
  };

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
            {translate("add")}
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

// dataIndex: `name${langObj[language]}`,

// const langObj ={
//   uz:'',
//   ru:'_ru'
// }
