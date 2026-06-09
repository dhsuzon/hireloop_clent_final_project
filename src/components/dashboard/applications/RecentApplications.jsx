import Image from "next/image";
import { Table, Chip } from "@heroui/react";
import EmptyState from "@/components/dashboard/EmptyState";

// Maps a backend status string to a chip color.
const STATUS_COLOR = {
  Interviewing: "success",
  New: "default",
  Reviewing: "warning",
  Rejected: "danger",
  Hired: "success",
};

const Avatar = ({ src, name }) =>
  src ? (
    <Image
      src={src}
      alt={name}
      width={28}
      height={28}
      className="size-7 rounded-full object-cover"
    />
  ) : (
    <span className="size-7 shrink-0 rounded-full bg-default" />
  );

const StatusChip = ({ status }) => (
  <Chip size="sm" variant="soft" color={STATUS_COLOR[status] ?? "default"}>
    {status}
  </Chip>
);

const RecentApplications = ({ applications = [], onViewAll }) => {
  const isEmpty = applications.length === 0;

  return (
    <div className="rounded-2xl border border-default bg-content1 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground sm:text-lg">
          Recent Applications
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
          title="No applications found"
          description="New candidate applications will appear here."
        />
      ) : (
        <>
          {/* Desktop / tablet: full table */}
          <div className="hidden md:block">
            <Table aria-label="Recent applications">
              <Table.Content>
                <Table.Header>
                  <Table.Column isRowHeader>Candidate Name</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Date Applied</Table.Column>
                  <Table.Column>Experience</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>
                <Table.Body items={applications}>
                  {(item) => (
                    <Table.Row id={item.id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar src={item.avatar} name={item.name} />
                          <span className="font-medium text-foreground">
                            {item.name}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-muted">{item.role}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-muted">{item.dateApplied}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-muted">{item.experience}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <StatusChip status={item.status} />
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table>
          </div>

          {/* Mobile: stacked cards showing every field, no scroll */}
          <ul className="flex flex-col gap-3 md:hidden">
            {applications.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-default p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar src={item.avatar} name={item.name} />
                    <span className="truncate font-medium text-foreground">
                      {item.name}
                    </span>
                  </div>
                  <StatusChip status={item.status} />
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex flex-col">
                    <dt className="text-xs text-muted">Role</dt>
                    <dd className="text-foreground">{item.role}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-xs text-muted">Experience</dt>
                    <dd className="text-foreground">{item.experience}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-xs text-muted">Date Applied</dt>
                    <dd className="text-foreground">{item.dateApplied}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecentApplications;
