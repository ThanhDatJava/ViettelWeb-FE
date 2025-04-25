import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { sendRequest } from "@/utils/api";

import { DeleteTwoTone, PlusCircleFilled } from "@ant-design/icons";
import Package5GCreate from "./package5G.create";
import Package5GUpdate from "./package5G.update";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface Wifi {
  key: React.Key;
  _id: string;
  goicuoc: string;
  gia: string;
  tinhnang: string;

  image: string;
}

const columns: TableColumnsType<Wifi> = [
  { title: "Gói Cước", dataIndex: "goicuoc" },
  { title: "Giá", dataIndex: "gia" },
  { title: "Tính năng", dataIndex: "tinhnang" },
];

const Package5GTable: React.FC = () => {
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
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mobile-network/get-all`,
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
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mobile-network/delete`,
      method: "DELETE",
      body: { _id: _id },
    });

    return res;
  };

  return (
    <>
      <Package5GCreate
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
        MANAGE PACKAGE 5G
      </h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircleFilled size={16} />
          Create Wifi
        </Button>

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
        </Button> */}

        <Button
          type="primary"
          style={{
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            color: "#fff",
          }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircleFilled style={{ marginRight: 5 }} />
          Create Package 5G
        </Button>

        <Button
          type="primary"
          style={{
            backgroundColor: "#ffc107",
            borderColor: "#ffc107",
            color: "#212529",
          }}
          onClick={() => {
            const selectedId = selectedRowKeys[0];
            const selectedData = listWifi.find(
              (item) => item.key === selectedId
            );
            if (selectedData) {
              setDataUpdate(selectedData);
              setIsUpdateModalOpen(true);
            }
          }}
        >
          Edit Package 5G
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

      <Package5GUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default Package5GTable;
