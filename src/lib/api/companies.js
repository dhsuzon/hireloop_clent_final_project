import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getMyCompany = async (recruiterId) => {
  return protectedFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getAllCompanies = async () => {
  return protectedFetch("/api/my/companies/all");
};

export const getLoggedRecruiterCompany = async () => {
  const user = await getUserSession();
  return getMyCompany(user?.id);
};
