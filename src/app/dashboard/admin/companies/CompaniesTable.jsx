"use client";

import { updateCompany } from "@/lib/actions/companies";
import { Table, Chip, Button, Card } from "@heroui/react";
import { format } from "date-fns";
import { toast } from "react-toastify";

const CompaniesTable = ({ data }) => {
  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approved" });
    console.log(result);
    if (result.acknowledged) {
      toast.success("company status update successfully");
    }
  };

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Rejected" });
    if (result.acknowledged) {
      toast.warning(`admin rejected your company status approval`);
    }
  };

  return (
    <>
      {/* 📝 Heading and Subheading Section */}
      <div className="px-4 my-4 ">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          All Companies
        </h1>
        <p className="mt-1 text-sm text-default-400">
          Review, approve, or reject registered companies and manage their
          statuses.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden mx-4 md:block">
        <Table className="text-white text-justify">
          <Table.ScrollContainer>
            <Table.Content aria-label="Companies management table">
              <Table.Header>
                <Table.Column isRowHeader>Company Name</Table.Column>
                <Table.Column>Recruiter Email</Table.Column>
                <Table.Column>Industry</Table.Column>
                <Table.Column>Jobs</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Date Submitted</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {data.map((company) => {
                  const status = company.status.toLowerCase();
                  const getStatusClasses = () => {
                    if (status === "approved")
                      return "text-success border-success bg-success/20";
                    if (status === "rejected")
                      return "text-danger border-danger bg-danger/20";
                    return "text-warning border-warning bg-warning/20";
                  };

                  return (
                    <Table.Row key={company._id}>
                      <Table.Cell className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full  bg-default-200 font-bold">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        {company.name}
                      </Table.Cell>
                      <Table.Cell>recruiter@gmail.com</Table.Cell>
                      <Table.Cell>
                        <Chip size="sm" variant="flat">
                          {company.industry}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="w-8 h-8 rounded-full bg-default-200 text-center">
                        {company.applications}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="dot"
                          className={getStatusClasses()}
                        >
                          {company.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        {format(new Date(company.createAt), "MMM dd, yyyy")}
                      </Table.Cell>
                      <Table.Cell className="flex gap-2">
                        {status !== "approved" && (
                          <Button
                            size="sm"
                            radius="none"
                            variant="flat"
                            onClick={() => handleApprove(company._id)}
                            className="font-bold text-success rounded-sm bg-success/20 hover:bg-success/30"
                          >
                            Approve
                          </Button>
                        )}
                        {status !== "rejected" && (
                          <Button
                            size="sm"
                            radius="none"
                            variant="flat"
                            onClick={() => handleReject(company._id)}
                            className="font-bold text-danger rounded-sm bg-danger/20 hover:bg-danger/30"
                          >
                            Reject
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 md:hidden px-4">
        {data.map((company) => {
          const status = company.status.toLowerCase();
          return (
            <Card key={company._id} className="p-4">
              <Card.Header className="flex justify-between items-start">
                <div>
                  <Card.Title className="text-lg font-bold">
                    {company.name}
                  </Card.Title>
                  <Card.Description className="text-sm text-default-500">
                    recruiter@gmail.com
                  </Card.Description>
                </div>
                <Chip
                  size="sm"
                  variant="dot"
                  className={
                    status === "approved"
                      ? "text-success"
                      : status === "rejected"
                        ? "text-danger"
                        : "text-warning"
                  }
                >
                  {company.status}
                </Chip>
              </Card.Header>
              <Card.Content className="py-2 text-sm">
                {company.applications}
                <p>Industry: {company.industry}</p>
                <p>
                  Submitted:{" "}
                  {format(new Date(company.createAt), "MMM dd, yyyy")}
                </p>
              </Card.Content>
              <Card.Footer className="flex gap-2 pt-2">
                {status !== "approved" && (
                  <Button
                    size="sm"
                    radius="none"
                    variant="flat"
                    onClick={() => handleApprove(company._id)}
                    className="flex-1 font-bold text-success bg-success/20"
                  >
                    Approve
                  </Button>
                )}
                {status !== "rejected" && (
                  <Button
                    size="sm"
                    radius="none"
                    variant="flat"
                    onClick={() => handleReject(company._id)}
                    className="flex-1 font-bold text-danger bg-danger/20"
                  >
                    Reject
                  </Button>
                )}
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default CompaniesTable;
