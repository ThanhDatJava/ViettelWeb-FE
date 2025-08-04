import { auth } from "@/auth";
import CustomerContent from "@/components/layout/customer/layoutCustomer/customer.content";
import CustomerFooter from "@/components/layout/customer/layoutCustomer/customer.footer";
import CustomerHeader from "@/components/layout/customer/layoutCustomer/customer.header";
import CustomerSideBar from "@/components/layout/customer/layoutCustomer/customer.sidebar";
import { CustomerContextProvider } from "@/library/customer.context";

const CustomerLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <CustomerContextProvider>
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <CustomerSideBar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <CustomerHeader session={session} />
          <CustomerContent>{children}</CustomerContent>
          <CustomerFooter />
        </div>
      </div>
    </CustomerContextProvider>
  );
};

export default CustomerLayout;
