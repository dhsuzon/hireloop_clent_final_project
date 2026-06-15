import { getSingleJobDetailsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import ApplyJob from "./ApplyJob";
import { getApplicationByApplicantId } from "@/lib/api/applications";
import Link from "next/link";
import { CircleInfo, Rocket, Lock, CircleExclamation } from "@gravity-ui/icons";

const page = async ({ params }) => {
  const plan = {
    name: "Free Plan",
    maxApplicationPerMont: 3,
  };

  const { jobId } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${jobId}/apply`);
  }

  // Role verification state ("seekar")
  if (user.role !== "seekar") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-md w-full text-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
            Only job seekers can apply for this position. Please sign in with a
            candidate account to proceed.
          </p>
          <Link
            href="/"
            className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const applicantAllApplication = await getApplicationByApplicantId(user.id);
  const currentCount = applicantAllApplication.length;
  const maxCount = plan.maxApplicationPerMont;
  const hasRemainingApplications = currentCount < maxCount;

  // Calculate usage percentage for the progress bar
  const usagePercentage = Math.min((currentCount / maxCount) * 100, 100);

  const jobinfo = await getSingleJobDetailsById(jobId);

  return (
    /* Outer layout changed to flex with justify-center and items-center to center content both horizontally and vertically */
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Inner layout container given w-full to correctly fit its max-w constraint within flex rules */}
      <div className="w-full max-w-3xl space-y-8">
        {/* Application Limit/Usage Tracker Dashboard Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <CircleInfo className="w-5 h-5 text-purple-500" />
                Monthly Application Usage
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
                You have submitted{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {currentCount}
                </span>{" "}
                out of{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {maxCount}
                </span>{" "}
                applications allowed this month.
              </p>
            </div>

            {/* Right Top Corner Side Content Block */}
            <div className="flex flex-col items-start sm:items-end gap-3 self-start">
              {/* Current Plan Badge - Placed prominently in the upper right row */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
                Current Plan: {plan.name}
              </span>

              {/* Upgrade Plan Link Right Below Badge */}
              <Link
                href="/plans"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 rounded-xl transition-all shadow-sm shadow-purple-100 dark:shadow-none"
              >
                Upgrade Plan
                <Rocket className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden mt-6">
            <div
              className={`h-full transition-all duration-500 ${
                usagePercentage >= 100
                  ? "bg-rose-500"
                  : usagePercentage >= 75
                    ? "bg-amber-500"
                    : "bg-purple-600"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>

        {/* Dynamic Context Render: Application form OR Limit Reached Block */}
        {hasRemainingApplications ? (
          <div className="transition-all duration-300 transform">
            <ApplyJob applicant={user} jobinfo={jobinfo} key={jobinfo._id} />
          </div>
        ) : (
          <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-4">
              <CircleExclamation className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-rose-950 dark:text-rose-400 mb-1">
              Monthly Limit Reached
            </h3>
            <p className="text-sm text-rose-700/80 dark:text-rose-400/70 max-w-md mx-auto leading-relaxed">
              You have used all applications allotted to your Free Plan for this
              billing period. Upgrade your plan using the dashboard link above
              to apply for more roles instantly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
