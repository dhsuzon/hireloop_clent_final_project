"use server";

import { redirect } from "next/navigation";
import { getSessionToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_API_HOST;
// server get fetch mutaion
export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`);
  return handleStatusCode(res);
};

const authHeader = async () => {
  const token = await getSessionToken();
  const header = token ? { authorization: `Bearer ${token}` } : {};
  return header;
};

// protected fetch function
export const protectedFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    headers: await authHeader(),
  });
  return handleStatusCode(res);
};
//  severpost mutaion
export const serverMutaion = async (api, data, method = "POST") => {
  const res = await fetch(`${baseURL}${api}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(res);
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/auth/login");
  } else if (res.status == 403) {
    redirect("/forbidden");
  }
  return res.json();
};
