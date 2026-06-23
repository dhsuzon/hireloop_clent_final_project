import { Chip } from "@heroui/react";

// Shows which company the job is posted under + approval gate messaging.
const CompanyBanner = ({ company, isApproved }) => (
  <>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-default bg-default/40 p-4">
      <div>
        <p className="text-xs text-muted">Posting as</p>
        <p className="font-medium text-foreground">
          {company?.name ?? "No company registered"}
        </p>
      </div>
      {company ? (
        <Chip
          size="sm"
          variant="soft"
          color={isApproved ? "success" : "warning"}
        >
          {isApproved ? "Approved" : "Pending approval"}
        </Chip>
      ) : null}
    </div>
  </>
);

export default CompanyBanner;
