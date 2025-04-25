import GraphLine from "@/components/admin/admin.graph";

const DashboardPage = () => {
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
        <h1>Thống kê số lượng</h1>
      </div>
      <GraphLine />
    </div>
  );
};

export default DashboardPage;
