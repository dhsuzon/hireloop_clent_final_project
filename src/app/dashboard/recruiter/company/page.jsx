import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./CompanyProfile";
import { getMyCompany } from "@/lib/api/companies";

const page = async () => {
  const user = await getUserSession();
  console.log("session", user);
  const company = await getMyCompany(user?.id);
  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default page;
