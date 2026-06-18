import { requiredRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await requiredRole("admin");
  return children;
};

export default AdminDashboardLayout;
