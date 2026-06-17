import { serverMutaion } from "../core/server";

export const creatPlanSubscription = async (subsInfo) => {
  return serverMutaion("/api/subscriptions/new", subsInfo);
};
