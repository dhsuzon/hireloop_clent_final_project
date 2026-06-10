"use server";

import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const createJobs = async(jobsData) => {
    const res = await fetch(`${baseURL}/api/jobs/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobsData)
    });

    const data = await res.json();
    if (data.acknowledged) {
        redirect("/dashboard/recruiter/jobs");
    }

    return data;
};