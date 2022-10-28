import { Button, Image, PageHeader, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import CompanySliderDrawer from "../../components/drawers/CompanySliderDrawer";
import { $authHost } from "../../http";
import useLanguage from "../../hooks/useLanguage.js";

function CompanySlider() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const translate = useLanguage();

  const tableColumns = [
    {
      key: 1,
      title: translate("title"),
      dataIndex: "title",
    },
    {
      key: 3,
      title: translate("image"),
      dataIndex: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 2,
      title: translate("subtitle"),
      dataIndex: "subtitle",
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
    const res = await $authHost.get("/company/slider");
    setData(res.data.data);
  };

  const editItem = (item) => {
    setEditingData(item);
    setOpen(true);
  };

  const deleteItem = async (item) => {
    await $authHost.delete(`/company/slider/${item.id}`, item);
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
      <CompanySliderDrawer
        open={open}
        setOpen={setOpen}
        editingData={editingData}
        getData={getData}
      />
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey={(item) => item.id}
      />
    </>
  );
}

export default CompanySlider;
