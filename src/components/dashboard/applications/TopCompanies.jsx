import Image from "next/image";
import { Button } from "@heroui/react";
import Briefcase from "@gravity-ui/icons/Briefcase";
import EmptyState from "@/components/dashboard/EmptyState";

const TopCompanies = ({ companies = [], onViewAll }) => {
  const isEmpty = companies.length === 0;

  return (
    <div className="flex flex-col rounded-2xl border border-default bg-content1 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground sm:text-lg">
          My Top Companies
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          View all
        </button>
      </div>

      {isEmpty ? (
        <EmptyState
          icon={Briefcase}
          title="No companies found"
          description="Companies you follow will show up here."
        />
      ) : (
        <ul className="flex flex-col">
          {companies.map((company) => (
            <li
              key={company.id ?? company.name}
              className="flex items-center gap-3 border-b border-default py-3 last:border-b-0"
            >
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-default">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={36}
                  height={36}
                  className="size-full object-cover"
                />
              ) : (
                <Briefcase className="size-4 text-muted" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
                {company.name}
              </p>
              <p className="truncate text-xs text-muted">
                {company.industry}
                {company.location ? ` • ${company.location}` : ""}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-foreground">
                {company.activeJobs}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-muted">
                Active Jobs
              </p>
            </div>
            </li>
          ))}
        </ul>
      )}

      <Button variant="secondary" className="mt-4 w-full" onPress={onViewAll}>
        View All Companies
      </Button>
    </div>
  );
};

export default TopCompanies;
