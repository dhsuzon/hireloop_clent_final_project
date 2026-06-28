import { serverFetch } from "../core/server";
//  get a company related job
export const getCompanyJobs = async (companyId, status = "active") => {
  return serverFetch(`/api/jobs?companyId=${companyId}&status=${status}`);
};

export const getJobs = async (queryString) => {
  return serverFetch(`/api/jobs?${queryString}`);
};

export const getSingleJobDetailsById = async (job_Id) => {
  return serverFetch(`/api/jobs/${job_Id}`);
};
