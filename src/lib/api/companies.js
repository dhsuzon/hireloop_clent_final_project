import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getMyCompany = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedRecruiterCompany = async () => {
  const user = await getUserSession();
  return getMyCompany(user?.id);
};
