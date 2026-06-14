import { serverMutaion } from "../core/server";

export const getCompaines = async (companyInfo) => {
  return serverMutaion("/api/my/companies", companyInfo);
};
