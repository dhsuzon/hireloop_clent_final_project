import DashboardSidebarLayout from "@/components/dashboard/DashboardSidebarLayout";
import { getUserSession } from "@/lib/core/session";

const DashboardSideBarServerLayout = async ({ children }) => {
  // ১. সার্ভার সাইড ফাংশন দিয়ে ইউজার বের করা হলো
  const user = await getUserSession();

  const recruiter = [
    {
      icon: "LayoutDashboard",
      label: "Dashboard",
      href: "/dashboard/recruiter",
    },
    {
      icon: "Building2",
      label: "Company Profile",
      href: "/dashboard/recruiter/company",
    },
    {
      icon: "BriefcaseBusiness",
      label: "Manage Jobs",
      children: [
        { label: "New", href: "/dashboard/recruiter/jobs/new" },
        { label: "Jobs", href: "/dashboard/recruiter/jobs" },
      ],
    },
    {
      icon: "FileText",
      label: "Applications",
      href: "/dashboard/applications",
    },
    { icon: "Settings", label: "Settings", href: "/dashboard/settings" },
  ];

  const seeker = [
    { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard/seeker" },
    { icon: "Search", label: "Jobs", href: "/dashboard/seeker/jobs" }, // 💡 OfficeBadge থেকে Magnifier করা হলো
    {
      icon: "Bookmark",
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: "FileText",
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: "CreditCard",
      label: "Billing",
      href: "/dashboard/seeker/billing",
    },
    { icon: "Settings", label: "Settings", href: "/dashboard/settings" },
  ];
  const admin = [
    { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard/admin" },
    { icon: "Users", label: "Users", href: "/admin/users" },
    {
      icon: "Building2",
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    { icon: "BriefcaseBusiness", label: "Jobs", href: "/dashboard/admin/jobs" },
    {
      icon: "CreditCard",
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    { icon: "Settings", label: "Settings", href: "/dashboard/admin/settings" },
  ];

  const DynamicSideBar = {
    seeker: seeker,
    recruiter: recruiter,
    admin: admin,
  };

  const currentNavItems = DynamicSideBar[user?.role || "seeker"];

  return (
    <div className="flex min-h-screen">
      {/* 💡 রেডিমেড ফিল্টারড মেনু আইটেমস প্রপ্স আকারে ক্লায়েন্ট সাইডবারে পাঠানো হলো */}
      <DashboardSidebarLayout currentNavItems={currentNavItems} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardSideBarServerLayout;
