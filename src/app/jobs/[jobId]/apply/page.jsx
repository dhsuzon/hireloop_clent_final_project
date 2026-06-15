import { getSingleJobDetailsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import ApplyJob from "./ApplyJob";

const page = async ({ params }) => {
  const { jobId } = await params;
  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${jobId}/apply`);
  }

  if (user.role !== "seekar") {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-white p-4 bg-zinc-950">
        <p className="text-lg text-zinc-400">
          Only job seekar can apply for this Positon, Please Sign in with a job
          seekar account to proced
        </p>
      </div>
    );
  }

  const jobinfo = await getSingleJobDetailsById(jobId);

  return (
    <div>
      <ApplyJob applicant={user} jobinfo={jobinfo} />
    </div>
  );
};

export default page;
