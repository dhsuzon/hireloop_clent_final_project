import { requiredRole } from "@/lib/core/session";

const RecruiterLayout = async ({ children }) => {
  await requiredRole("recruiter");
  return children;
};
export default RecruiterLayout;
