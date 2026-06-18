import { requiredRole } from "@/lib/core/session";

const seekerLayout = async ({ children }) => {
  await requiredRole("seeker");
  return children;
};
export default seekerLayout;
