"use client";

import { createContext, useContext, useState } from "react";

interface ICustomerContext {
  collapseMenu: boolean;
  setCollapseMenu: (v: boolean) => void;
}

export const CustomerContext = createContext<ICustomerContext | null>(null);

export const CustomerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <CustomerContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
