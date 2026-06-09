"use client";
import { useSession } from "@/lib/auth-client";
import StatCardGrid from "@/components/dashboard/stat/StatCardGrid";
import RecentApplications from "@/components/dashboard/applications/RecentApplications";
import TopCompanies from "@/components/dashboard/applications/TopCompanies";
import FileText from "@gravity-ui/icons/FileText";
import Persons from "@gravity-ui/icons/Persons";
import Thunderbolt from "@gravity-ui/icons/Thunderbolt";
import CircleCheck from "@gravity-ui/icons/CircleCheck";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <h1>Sesstion isLoading</h1>;
  }
  const user = session?.user;

  const stats = [
    { key: "posts", icon: FileText, label: "Total Job Posts", value: 48 },
    { key: "applicants", icon: Persons, label: "Total Applicants", value: 1284 },
    { key: "active", icon: Thunderbolt, label: "Active Jobs", value: 18 },
    { key: "closed", icon: CircleCheck, label: "Jobs Closed", value: 32 },
  ];

  const applications = [
    { id: "1", name: "Julianne Moore", role: "Senior Product Designer", dateApplied: "Oct 24, 2023", experience: "6 years", status: "Interviewing" },
    { id: "2", name: "Robert Downey", role: "Backend Engineer", dateApplied: "Oct 23, 2023", experience: "4 years", status: "New" },
    { id: "3", name: "Emma Stone", role: "Marketing Lead", dateApplied: "Oct 22, 2023", experience: "8 years", status: "Reviewing" },
    { id: "4", name: "Chris Pratt", role: "Product Manager", dateApplied: "Oct 21, 2023", experience: "5 years", status: "Rejected" },
  ];

  const companies = [
    { id: "1", name: "Google Inc.", industry: "Technology", location: "Mountain View", activeJobs: 24 },
    { id: "2", name: "Meta Platforms", industry: "Social Media", location: "Menlo Park", activeJobs: 18 },
    { id: "3", name: "Stripe", industry: "Fintech", location: "San Francisco", activeJobs: 12 },
    { id: "4", name: "Tesla", industry: "Automotive", location: "Austin", activeJobs: 31 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Welcome Back, {user?.name}</h1>
      </div>
      <StatCardGrid stats={stats} />

      <div className="grid grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <RecentApplications applications={applications} />
        </div>
        <div className="lg:col-span-1">
          <TopCompanies companies={companies} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
