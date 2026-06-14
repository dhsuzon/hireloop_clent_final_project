"use server";

import { redirect } from "next/navigation";
import { serverMutaion } from "../core/server";



export const createJobs = async(jobsData) => {
    const resData = await serverMutaion("/api/jobs/new", jobsData);
    if (resData.acknowledged) {
        redirect("/dashboard/recruiter/jobs");
    }
    return resData;
};