import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { sendRequest } from "@/utils/api";
import WifiCreate from "./wifi.create";
import WifiUpdate from "./wifi.update";

import { DeleteTwoTone } from "@ant-design/icons";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface Wifi {
  key: React.Key;
  _id: string;
  goicuoc: string;
  gia: string;
  tinhnang: string;
  giaTVGT: string;
  giaTVDC: string;
  giaCamera: string;
  image: string;
}

const columns: TableColumnsType<Wifi> = [
  { title: "Gói Cước", dataIndex: "goicuoc" },
  { title: "Giá", dataIndex: "gia" },
  { title: "Tính năng", dataIndex: "tinhnang" },
  { title: "Giá wifi + TVGT", dataIndex: "giaTVGT" },
  { title: "Giá wifi + TVDC", dataIndex: "giaTVDC" },
  { title: "Giá wifi + camera", dataIndex: "giaCamera" },
];

const WifiTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [listWifi, setListWifi] = useState<Wifi[]>([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [isCreateModalOpen, isUpdateModalOpen]);

  const fetchData = async () => {
    try {
      const res = await sendRequest<{ data: Wifi[] }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wifi`,
        method: "GET",
      });
      const wifiWithKeys = res?.data.map((item, index) => ({
        ...item,
        key: item._id || index, // assign unique key
      }));
      setListWifi(wifiWithKeys || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Wifi> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleDeleteWifiAction = async (_id: any) => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wifi/delete`,
      method: "DELETE",
      body: { _id: _id },
    });

    return res;
  };

  return (
    <>
      <WifiCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        MANAGE WIFI
      </h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Wifi</Button>

        {/* <Button onClick={() => setIsUpdateModalOpen(true)}>Edit Wifi</Button> */}

        <Button
          onClick={() => {
            // Giả sử bạn chỉ cho phép chỉnh sửa 1 bản ghi tại 1 thời điểm
            const selectedId = selectedRowKeys[0]; // hoặc xử lý theo cách bạn muốn
            const selectedData = listWifi.find(
              (item) => item.key === selectedId
            );

            if (selectedData) {
              setDataUpdate(selectedData);
              setIsUpdateModalOpen(true);
            }
          }}
        >
          Edit Wifi
        </Button>

        <Popconfirm
          placement="leftTop"
          title="Xác nhận xóa Wifi"
          description="Bạn có chắc chắn muốn xóa các Wifi đã chọn không?"
          onConfirm={async () => {
            await Promise.all(
              selectedRowKeys.map(async (id) => {
                await handleDeleteWifiAction(id); // hoặc handleLocalDelete
              })
            );
            fetchData();
            setSelectedRowKeys([]);
          }}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <span style={{ cursor: "pointer" }}>
            <DeleteTwoTone twoToneColor="#ff4d4f" />
          </span>
        </Popconfirm>
      </div>

      <Table<Wifi>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={listWifi}
      />

      <WifiUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default WifiTable;
