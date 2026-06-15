import { getSingleJobDetailsById } from "@/lib/api/jobs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Component

// HeroUI v3 Components
import { Card, Button, Chip } from "@heroui/react";

// Gravity-UI Icons
import {
  CircleDollar,
  Calendar,
  Briefcase,
  ChevronLeft,
  ArrowRight,
} from "@gravity-ui/icons";

const singleJobDetailspage = async ({ params }) => {
  const { jobId } = await params;
  const singleJobInfo = await getSingleJobDetailsById(jobId);

  if (!singleJobInfo) {
    notFound();
  }

  const {
    title,
    category,
    type,
    salary,
    remote,
    location,
    applicationDeadline,
    responsibilities,
    requirements,
    benefits,
    company,
    companyLogo,
  } = singleJobInfo;

  // Deadline date formatting
  const formattedDeadline = new Date(applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        {/* Back Button Container */}
        <div className="mb-6">
          <Link href="/jobs" passHref>
            <Button
              variant="light"
              color="default"
              size="sm"
              className="font-medium flex items-center gap-1 "
            >
              <ChevronLeft width={16} height={16} />
              <span>Back to Browse Jobs Page</span>
            </Button>
          </Link>
        </div>

        {/* Master Layout: Flex on Small Devices, Row on Large Screens */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* =========================================================
              LEFT PART LAYOUT (Flexbox on mobile, 50% width on desktop)
             ========================================================= */}
          <div className="w-full lg:flex-1 space-y-6">
            <Card
              className="p-2 sm:p-6 border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-xl"
              shadow="none"
            >
              {/* Header Anatomy */}
              <Card.Header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 w-full">
                <div className="flex items-start sm:items-center gap-5 w-full sm:w-auto">
                  {companyLogo && (
                    <div className="w-20 h-20 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 flex items-center justify-center overflow-hidden shrink-0 shadow-xs relative">
                      <Image
                        src={companyLogo}
                        alt={`${company} logo`}
                        width={80}
                        height={80}
                        className="object-contain w-auto h-auto rounded-full "
                        loading="eager"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5 flex-1">
                    <Card.Title className="text-2xl  font-bold tracking-tight text-neutral-900 dark:text-neutral-50  leading-8">
                      {title}
                    </Card.Title>
                    <Card.Description className="text-base font-semibold text-blue-600 dark:text-blue-400 block">
                      {company}
                    </Card.Description>

                    {/* Badge Chips Container */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Chip
                        variant="flat"
                        color="primary"
                        size="sm"
                        className="font-semibold"
                      >
                        <span className="flex items-center gap-1">
                          <Briefcase width={12} height={12} />
                          {type}
                        </span>
                      </Chip>
                      <Chip
                        variant="flat"
                        color="secondary"
                        size="sm"
                        className="font-semibold"
                      >
                        {category}
                      </Chip>
                      <Chip
                        variant="flat"
                        color={remote ? "success" : "warning"}
                        size="sm"
                        className="font-semibold"
                      >
                        {remote ? "Remote" : location || "On-Site"}
                      </Chip>
                    </div>
                  </div>
                </div>

                {/* HeroUI V3 Purple Action Button */}
                <Link
                  href={`/jobs/${jobId}/apply`}
                  className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 font-bold text-white bg-linear-to-r from-purple-500 to-purple-700 rounded-xl shadow-lg shadow-purple-500/20 hover:opacity-95 active:scale-98 transition-all duration-200 text-base select-none"
                >
                  <span className="text-nowrap">Apply Now</span>
                  <ArrowRight width={16} height={16} />
                </Link>
              </Card.Header>

              {/* Quick Info Boxes & Responsibilities */}
              <Card.Content className="py-6 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Salary Block */}
                  <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800/40">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                      <CircleDollar width={24} height={24} />
                    </div>
                    <div>
                      <span className="text-base font-bold capitalize tracking-wider text-neutral-400 dark:text-neutral-500">
                        Salary Range
                      </span>
                      <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 ">
                        ${salary?.min?.toLocaleString()} - $
                        {salary?.max?.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-neutral-500">
                          ({salary?.currency || "USD"} / year)
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Deadline Block */}
                  <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800/40">
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-600 dark:text-rose-400 shrink-0">
                      <Calendar width={24} height={24} />
                    </div>
                    <div>
                      <span className="text-base font-bold capitalize tracking-wider text-neutral-400 dark:text-neutral-500">
                        Application Deadline
                      </span>
                      <h3 className="text-sm font-medium text-rose-600 dark:text-rose-400 mt-0.5">
                        {formattedDeadline}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Core Responsibilities Box */}
                {responsibilities && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Core Responsibilities
                    </h2>
                    <p className="text-neutral-600 text-base font-medium dark:text-neutral-400 leading-relaxed bg-neutral-50/30 dark:bg-neutral-900/20 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/50">
                      {responsibilities}
                    </p>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* =========================================================
              RIGHT PART LAYOUT (Flexbox on mobile, 50% width on desktop)
             ========================================================= */}
          <div className="w-full lg:flex-1 space-y-6">
            <Card
              className="p-2 sm:p-6 border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-xl"
              shadow="none"
            >
              <Card.Content className="py-6 space-y-8">
                {/* Requirements & Skills Box */}
                {requirements && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Requirements & Skills
                    </h2>
                    <div className="bg-neutral-50/30 dark:bg-neutral-900/20 p-6 text-base font-medium rounded-2xl border border-neutral-100 dark:border-neutral-800/50">
                      <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-3">
                        {requirements.split(",").map((req, index) => (
                          <li key={index} className="leading-relaxed">
                            <span className="pl-2 text-neutral-700 dark:text-neutral-300">
                              {req.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Perks & Benefits Box */}
                {benefits && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Perks & Benefits
                    </h2>
                    <div className="bg-neutral-50/30 dark:bg-neutral-900/20 p-6 rounded-2xl border text-base border-neutral-100 dark:border-neutral-800/50">
                      <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-3">
                        {benefits.split(",").map((benefit, index) => (
                          <li key={index} className="leading-relaxed">
                            <span className="pl-2 text-neutral-700 dark:text-neutral-300">
                              {benefit.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleJobDetailspage;
