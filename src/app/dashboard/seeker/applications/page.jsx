import { getApplicationByApplicantId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import ApplicationsTableClient from "./applicationTableClient";

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const allApplications = (await getApplicationByApplicantId(user?.id)) || [];

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-100 p-6 sm:p-10">
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-200">
          All Applications ({allApplications.length})
        </h1>
      </div>

      {/* 💡 ডেটা প্রপ্স আকারে ক্লায়েন্ট টেবিলে পাস করা হলো */}
      <ApplicationsTableClient applications={allApplications} />
    </div>
  );
};

export default ApplicationsPage;
