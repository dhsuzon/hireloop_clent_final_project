import { getLoggedRecruiterCompany } from "@/lib/api/companies";
import NewJobPostClient from "./NewJobPostClient";

const NewJobPostSever = async () => {
  const company = await getLoggedRecruiterCompany();
  return (
    <div>
      <NewJobPostClient company={company} />
    </div>
  );
};

export default NewJobPostSever;
