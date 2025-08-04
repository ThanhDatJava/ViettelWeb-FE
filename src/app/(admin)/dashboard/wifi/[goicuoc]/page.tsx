"use client";

import CardWifi from "@/components/admin/wifi/wifi.card";
import WifiTable from "@/components/admin/wifi/wifi.table";
import { sendRequest } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ManageWifiPackage = () => {
  const params = useParams();
  const goicuoc = params.goicuoc as string;

  return (
    <>
      <CardWifi goicuoc={params.goicuoc} />
    </>
  );
};

export default ManageWifiPackage;
