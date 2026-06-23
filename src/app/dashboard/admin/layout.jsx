import { requiredRole } from "@/lib/core/session";
import { ToastContainer } from "react-toastify";

const AdminDashboardLayout = async ({ children }) => {
  await requiredRole("admin");
  <ToastContainer position="top-center" />;
  return children;
};

export default AdminDashboardLayout;
