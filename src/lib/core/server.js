"use server";

const baseURL = process.env.NEXT_PUBLIC_API_HOST;
// server get fetch mutaion
export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`);
  return await res.json();
};

//  severpost mutaion
export const serverMutaion = async (api, data) => {
  const res = await fetch(`${baseURL}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
};
