"use server";
import { revalidatePath } from "next/cache";
import { serverMutaion } from "../core/server";

export const createCompaines = async (companyInfo) => {
  return serverMutaion("/api/my/companies", companyInfo);
};

export const updateCompany = async (id, data) => {
  const result = serverMutaion(`/api/my/companies/${id}`, data, "PATCH");

  revalidatePath("/dashboard/admin/companies");
  return result;
};
