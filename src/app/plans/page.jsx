"use client";

import { useState } from "react";
import { Card, Button, Chip, Accordion } from "@heroui/react";
import {
  Check,
  Rocket,
  CircleInfo,
  ShieldCheck,
  Star,
  CircleQuestion,
} from "@gravity-ui/icons";

export default function ModernPricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");
  // নির্বাচিত কার্ড ট্র্যাক করার জন্য স্টেট
  const [selectedPlan, setSelectedPlan] = useState(null);

  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "0",
      period: "/forever",
      description: "Essential tools to kickstart your career journey.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic candidate profile",
        "Standard email alerts",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "19",
      period: "/month",
      description: "Supercharge your applications & unlock advanced insights.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking dashboard",
        "Detailed salary insights",
        "Priority job alerts",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "39",
      period: "/month",
      description: "Complete visibility package to land top-tier roles fast.",
      features: [
        "Everything in Pro tier",
        "Unlimited job applications",
        "Profile boost feature to featured recruiters",
        "Early access to newly launched jobs",
        "24/7 Premium priority support",
      ],
      cta: "Go Premium",
      popular: false,
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "0",
      period: "/forever",
      description: "Ideal setup for early-stage companies and startups.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management system",
        "Standard listing visibility",
        "Perfect for first year of hiring",
      ],
      cta: "Post a Job Free",
      popular: false,
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "49",
      period: "/month",
      description: "Scale your active hiring campaigns seamlessly.",
      features: [
        "Up to 10 active job posts",
        "Complete applicant tracking (ATS)",
        "Basic performance analytics",
        "Standard email support system",
      ],
      cta: "Start Growth Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "149",
      period: "/month",
      description:
        "Elite power options for rapid corporate recruitment scaling.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & parsing dashboard",
        "Featured top-tier job listings",
        "Team collaboration controls",
        "Custom enterprise company branding",
        "Priority white-glove support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="w-full max-w-6xl space-y-16">
        {/* Modern Headline Strategy Layout */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Chip
            variant="flat"
            size="sm"
            className="font-bold uppercase tracking-wider bg-purple-100/70 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30 px-3 py-1 rounded-full"
          >
            Flexible Pricing Structure
          </Chip>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight sm:text-5xl">
            Invest in Your Next Big Leap
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium">
            No hidden costs. Choose an option designed around your professional
            goals or multi-member recruitment workflow requirements.
          </p>
        </div>

        {/* Premium Pill Slider Navigation Block */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-zinc-200/60 dark:bg-zinc-900/80 border border-zinc-300/40 dark:border-zinc-800/80 rounded-2xl flex gap-1.5 shadow-inner backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab("seekers");
                setSelectedPlan(null); // ট্যাব পাল্টালে সিলেক্টেড স্টেট রিসেট হবে
              }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 select-none ${
                activeTab === "seekers"
                  ? "bg-purple-600 text-white shadow-xl shadow-purple-500/20 scale-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Star width={14} height={14} />
              For Job Seekers
            </button>
            <button
              onClick={() => {
                setActiveTab("recruiters");
                setSelectedPlan(null); // ট্যাব পাল্টালে সিলেক্টেড স্টেট রিসেট হবে
              }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 select-none ${
                activeTab === "recruiters"
                  ? "bg-purple-600 text-white shadow-xl shadow-purple-500/20 scale-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Rocket width={14} height={14} />
              For Recruiters
            </button>
          </div>
        </div>

        {/* Modern Interactive Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {currentPlans.map((plan, index) => {
            // যদি কোনো কার্ড ম্যানুয়ালি সিলেক্ট করা না থাকে, তবে ডিফল্ট popular (Pro) কার্ডটি অ্যাক্টিভ থাকবে
            const isSelected = selectedPlan
              ? selectedPlan === plan.name
              : plan.popular;

            return (
              <Card
                key={index}
                onClick={() => setSelectedPlan(plan.name)} // কার্ডে ক্লিক করলে সেটি সিলেক্ট হবে
                className={`p-6 sm:p-8 border bg-white dark:bg-zinc-900/60 backdrop-blur-xs relative flex flex-col justify-between rounded-3xl transition-all duration-300 group hover:-translate-y-1.5 cursor-pointer ${
                  isSelected
                    ? "border-purple-500 dark:border-purple-500 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/5 ring-1 ring-purple-500"
                    : "border-zinc-200 dark:border-zinc-800/80 shadow-xs hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
                shadow="none"
              >
                {/* Popularity Banner Tag */}
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-black tracking-wide bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                    <Rocket width={12} height={12} /> MOST POPULAR
                  </div>
                )}

                {/* Title & Pricing Block */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-1 min-h-8 leading-tight">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-0.5 mt-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500">
                      {plan.period}
                    </span>
                  </div>

                  {/* What's Included Feature Grid Container */}
                  <div className="mt-6 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                      <ShieldCheck
                        width={14}
                        height={14}
                        className="text-purple-500"
                      />{" "}
                      Perks & Features
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-normal"
                        >
                          <div className="p-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                            <Check width={12} height={12} />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Functional Bottom Button Layout */}
                <div className="mt-8">
                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="planId" value={plan.id} />
                    <section>
                      <Button
                        type="submit"
                        role="link"
                        variant={isSelected ? "solid" : "bordered"}
                        className={`w-full py-6 font-bold text-sm rounded-2xl transition-all duration-300 select-none ${
                          isSelected
                            ? "bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white shadow-xl shadow-purple-600/20 group-hover:scale-[1.01]"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </section>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Separator Divider Component */}
        <div className="h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent my-16" />

        {/* =========================================================
            MODERN HEROUI ACCORDION FAQ SECTION (REFRACTORED ANATOMY)
           ========================================================= */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 flex items-center justify-center gap-2 tracking-tight">
              <CircleInfo className="w-5 h-5 text-purple-500" />
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">
              Everything you need to know about cancellations, refunds,
              payments, and tier switching.
            </p>
          </div>

          <Accordion variant="splitted" className="px-0 gap-3">
            {/* Cancellation Item */}
            <Accordion.Item
              key="cancellation"
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xs px-2"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 rounded-xl px-3 py-4 transition-colors text-base font-bold text-zinc-900 dark:text-zinc-50">
                  <div className="flex items-center gap-2">
                    <CircleQuestion className="text-purple-500 w-4 h-4 mr-1 shrink-0" />
                    <span>Can I cancel my subscription at any time?</span>
                  </div>
                  <Accordion.Indicator className="text-zinc-400 dark:text-zinc-500 data-[open=true]:text-purple-500 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-sm text-zinc-500 dark:text-zinc-400 font-medium pb-5 px-3 leading-relaxed">
                  Absolutely. Our paid plans are strictly month-to-month
                  commitments with zero contract lock-ins. You can trigger an
                  instant cancellation directly through your billing settings
                  panel with a single click. You will maintain full plan
                  features until the exact end of your current billing period.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Refunds Item */}
            <Accordion.Item
              key="refunds"
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xs px-2"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 rounded-xl px-3 py-4 transition-colors text-base font-bold text-zinc-900 dark:text-zinc-50">
                  <div className="flex items-center gap-2">
                    <CircleQuestion className="text-purple-500 w-4 h-4 mr-1 shrink-0" />
                    <span>How do your refund policies work?</span>
                  </div>
                  <Accordion.Indicator className="text-zinc-400 dark:text-zinc-500 data-[open=true]:text-purple-500 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-sm text-zinc-500 dark:text-zinc-400 font-medium pb-5 px-3 leading-relaxed">
                  We stand by our product with a premium 7-day money-back
                  guarantee for initial tier upgrades. If you discover the tools
                  do not match your active workflow requirements within the
                  first week, just reach out to our dedicated support workspace
                  for a swift, full refund processing cycle.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Payments Item */}
            <Accordion.Item
              key="payments"
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xs px-2"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 rounded-xl px-3 py-4 transition-colors text-base font-bold text-zinc-900 dark:text-zinc-50">
                  <div className="flex items-center gap-2">
                    <CircleQuestion className="text-purple-500 w-4 h-4 mr-1 shrink-0" />
                    <span>What payment methods do you securely accept?</span>
                  </div>
                  <Accordion.Indicator className="text-zinc-400 dark:text-zinc-500 data-[open=true]:text-purple-500 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-sm text-zinc-500 dark:text-zinc-400 font-medium pb-5 px-3 leading-relaxed">
                  We process encrypted digital payments via top industry
                  gateways. We safely accept all major international networks
                  including Visa, Mastercard, American Express, and Discover
                  credit or debit accounts. Depending on your active localized
                  region, secure mobile wallet checkouts are also automatically
                  provisioned.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Switching Item */}
            <Accordion.Item
              key="switching"
              className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xs px-2"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 rounded-xl px-3 py-4 transition-colors text-base font-bold text-zinc-900 dark:text-zinc-50">
                  <div className="flex items-center gap-2">
                    <CircleQuestion className="text-purple-500 w-4 h-4 mr-1 shrink-0" />
                    <span>
                      Can I dynamically switch between plans later on?
                    </span>
                  </div>
                  <Accordion.Indicator className="text-zinc-400 dark:text-zinc-500 data-[open=true]:text-purple-500 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-sm text-zinc-500 dark:text-zinc-400 font-medium pb-5 px-3 leading-relaxed">
                  Yes! You can scale your account dynamically by upgrading or
                  downgrading active packages at any moment. Mid-cycle changes
                  are fully supported; upward conversions are calculated
                  seamlessly on an automated prorated structure, so you only pay
                  for the fraction of the tier you actually utilize.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
