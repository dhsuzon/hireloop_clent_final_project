import DashboardSidebarLayout from "@/components/dashboard/DashboardSidebarLayout";


const DashboardLayout = ({children}) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebarLayout />
      <div className="flex-1">{children}</div>
    </div>
  );
}


export default DashboardLayout;