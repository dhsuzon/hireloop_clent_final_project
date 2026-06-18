import DashboardSideBarServerLayout from "@/components/dashboard/DashboardSideBarServerLayout";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSideBarServerLayout />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
