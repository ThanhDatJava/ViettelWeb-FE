import CustomerTable from "@/components/customer/customer.table";
import CustomerTablePackage5G from "@/components/customer/customer.table.package5G";

const CustomerPagePackage5G = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <h1>CÁC GÓI 5G TRẢ TRƯỚC</h1>
      </div>

      <CustomerTablePackage5G />
    </div>
  );
};

export default CustomerPagePackage5G;
