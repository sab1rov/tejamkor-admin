import {
  Button,
  Image,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import CompanySliderDrawer from "../../components/drawers/CompanySliderDrawer";
import { $authHost } from "../../http";

function CompanySlider() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const tableColumns = [
    {
      key: 1,
      title: "Title",
      dataIndex: "title",
    },
    {
      key: 3,
      title: "Image",
      dataIndex: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      key: 2,
      title: "Subtitle",
      dataIndex: "subtitle",
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
                //  onClick={() => editItem(item)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this company"
                // onConfirm={() => deleteItem(item)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        extra={[<Button key="1" onClick={() => setOpen(true)}>Add</Button>]}
      />
      <CompanySliderDrawer 
        open={open}
        setOpen={setOpen}
      />
      <Table
        columns={tableColumns}
        dataSource={data.map((item) => ({
          key: item?.id,
          title: item?.title,
          subtitle:
            item?.subtitle?.length > 40
              ? item?.subtitle?.slice(0, 20) + "..."
              : item?.subtitle,
          image: item?.image,
        }))}
      />
    </>
  );
}

export default CompanySlider;
