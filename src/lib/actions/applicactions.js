import { serverMutaion } from "../core/server";

export const submitJobseekarApplication = async (applicationData) => {
  return serverMutaion("/api/applications/new", applicationData);
};
