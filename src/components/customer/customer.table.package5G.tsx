// "use client";

// import React, { useEffect, useState } from "react";
// import { Table, Tag, Typography } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { sendRequest } from "@/utils/api";

// const { Title } = Typography;

// interface DataType {
//   goicuoc: string;
//   gia: string;
//   tinhnang: number;
//   type: string;
//   tags: string[];

//   mybox: string;
//   offline: string;
//   internalnetwork: string;
// }

// const CustomerTablePackage5G: React.FC = () => {
//   const [listWifi, setListWifi] = useState<DataType[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await sendRequest<{ data: DataType[] }>({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mobile-network/get-all`,
//         method: "GET",
//       });

//       setListWifi(res.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     }
//   };

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Gói Cước",
//       dataIndex: "goicuoc",
//       key: "goicuoc",
//       render: (text: string) => <a>{text}</a>,
//     },
//     {
//       title: "Giá",
//       dataIndex: "gia",
//       key: "gia",
//       render: (gia: string) => <Tag color="green">{gia}.000 Đồng</Tag>,
//     },
//     {
//       title: "Miễn Phí Data",
//       dataIndex: "tinhnang",
//       key: "tinhnang",
//       render: (tinhnang: number) => <Tag color="red">{tinhnang}GB/Ngày</Tag>,
//     },

//     {
//       title: "Khuyến mãi",
//       dataIndex: "mybox",
//       key: "mybox",
//       render: (mybox: number) => <Tag color="red">{mybox}GB</Tag>,
//     },
//   ];

//   // Phân chia dữ liệu theo type
//   const data5G = listWifi.filter((item) => item.type === "data");
//   const combo5G = listWifi.filter((item) => item.type === "combo");
//   const dacbiet5G = listWifi.filter((item) => item.type === "dacbiet");

//   return (
//     <>
//       <Title level={3}>Gói 5G DATA</Title>
//       <Table<DataType>
//         columns={columns}
//         dataSource={data5G}
//         rowKey={(record) => `${record.goicuoc}-${record.gia}`}
//         pagination={false}
//       />

//       <Title level={3} style={{ marginTop: 32 }}>
//         Gói 5G COMBO
//       </Title>
//       <Table<DataType>
//         columns={columns}
//         dataSource={combo5G}
//         rowKey={(record) => `${record.goicuoc}-${record.gia}`}
//         pagination={false}
//       />

//       <Title level={3} style={{ marginTop: 32 }}>
//         Gói 5G ĐẶC BIỆT
//       </Title>
//       <Table<DataType>
//         columns={columns}
//         dataSource={dacbiet5G}
//         rowKey={(record) => `${record.goicuoc}-${record.gia}`}
//         pagination={false}
//       />
//     </>
//   );
// };

// export default CustomerTablePackage5G;

"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { sendRequest } from "@/utils/api";

const { Title } = Typography;

interface DataType {
  goicuoc: string;
  gia: string;
  tinhnang: number;
  type: string;
  tags: string[];

  mybox: string;
  offline: string;
  internalnetwork: string;
}

const CustomerTablePackage5G: React.FC = () => {
  const [listWifi, setListWifi] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await sendRequest<{ data: DataType[] }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mobile-network/get-all`,
        method: "GET",
      });

      // Gắn thêm các tags tùy theo dữ liệu `type`
      const dataWithTags = res.data.map((item) => ({
        ...item,
        tags:
          item.type === "data"
            ? [
                "Miễn phí kho phim TV360 4K",
                `Miễn Phí lưu trữ Mybox ${item.mybox}GB  `,
              ]
            : [
                `Miễn Phí gọi nội mạng ${item.internalnetwork} phút/cuộc`,
                `Miễn Phí gọi ngoại mạng ${item.offline} phút`,
                "Miễn phí kho phim TV360 4K",
                `Miễn Phí lưu trữ Mybox ${item.mybox}GB  `,
              ],
      }));

      setListWifi(dataWithTags);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Gói Cước",
      dataIndex: "goicuoc",
      key: "goicuoc",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (gia: string) => <Tag color="green">{gia}.000 Đồng</Tag>,
    },
    {
      title: "Miễn Phí Data",
      dataIndex: "tinhnang",
      key: "tinhnang",
      render: (tinhnang: number) => <Tag color="red">{tinhnang}GB/Ngày</Tag>,
    },
    {
      title: "Khuyến mãi",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag, index) => {
            let color = "blue";
            if (tag.includes("GB")) color = "red";
            else if (tag.includes("TV360")) color = "green";
            else if (tag.includes("nội mạng")) color = "geekblue";
            else if (tag.includes("ngoại mạng")) color = "volcano";

            return (
              <Tag color={color} key={index}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data5G = listWifi.filter((item) => item.type === "data");
  const combo5G = listWifi.filter((item) => item.type === "combo");
  const dacbiet5G = listWifi.filter((item) => item.type === "dacbiet");

  return (
    <>
      <Title level={3}>Gói 5G DATA</Title>
      <Table<DataType>
        columns={columns}
        dataSource={data5G}
        rowKey={(record) => `${record.goicuoc}-${record.gia}`}
        pagination={false}
      />

      <Title level={4} style={{ marginTop: 32 }}>
        Gói 5G COMBO
      </Title>
      <Table<DataType>
        columns={columns}
        dataSource={combo5G}
        rowKey={(record) => `${record.goicuoc}-${record.gia}`}
        pagination={false}
      />

      <Title level={3} style={{ marginTop: 32 }}>
        Gói 5G ĐẶC BIỆT
      </Title>
      <Table<DataType>
        columns={columns}
        dataSource={dacbiet5G}
        rowKey={(record) => `${record.goicuoc}-${record.gia}`}
        pagination={false}
      />
    </>
  );
};

export default CustomerTablePackage5G;
