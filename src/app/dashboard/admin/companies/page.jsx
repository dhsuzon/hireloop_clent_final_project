import { getAllCompanies } from "@/lib/api/companies";
import CompaniesTable from "./CompaniesTable";

const AdminCompanyPage = async () => {
  const allCompany = await getAllCompanies();
  return (
    <div>
      <CompaniesTable data={allCompany} />
    </div>
  );
};

export default AdminCompanyPage;
