"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import ShieldExclamation from "@gravity-ui/icons/ShieldExclamation";
import ArrowLeft from "@gravity-ui/icons/ArrowLeft";
import ArrowRightToLine from "@gravity-ui/icons/ArrowRightToLine";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 overflow-hidden sm:py-32 lg:px-8">
      {/* ব্যাকগ্রাউন্ড মডার্ন গ্লো ইফেকェ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-danger/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center relative z-10 backdrop-blur-[2px] p-8 rounded-3xl border border-default/50 sm:border-transparent">
        {/* ShieldExclamation আইকন উইথ পালস এবং ব্লার শ্যাডো */}
        <div className="relative mx-auto flex size-20 items-center justify-center rounded-2xl bg-danger-50 text-danger animate-pulse">
          <div className="absolute inset-0 size-full rounded-2xl bg-danger-200 opacity-20 blur-xl"></div>
          <ShieldExclamation className="size-10 relative z-10" />
        </div>

        {/* 💡 ১. মেইন হেডিং টেক্সট: 403 Bold */}
        <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-danger sm:text-7xl">
          403
        </h1>

        {/* 💡 ২. সাব-হেডিং টেক্সট: Forbidden Access */}
        <h2 className="mt-3 text-xl font-bold tracking-normal text-foreground sm:text-2xl capitalize">
          Forbidden Access
        </h2>

        {/* 💡 ৩. Hireloop রেলেভেন্ট ডেসক্রিপশন মেসেজ */}
        <p className="mt-4 text-base leading-7 text-muted max-w-md mx-auto">
          This zone is restricted. It looks like your account doesn&apos;t have
          the authorized role or the active premium subscription required to
          access this portal on Hireloop.
        </p>

        {/* অ্যাকশন বাটনস */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* বাম পাশে (Left Side): Dashboard বাটন */}
          <Link
            href="/dashboard"
            className="w-full sm:w-auto order-1 sm:order-0"
          >
            <Button
              variant="solid"
              className="w-full font-medium rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
            >
              <ArrowRightToLine className="size-4 mr-1" />
              Dashboard
            </Button>
          </Link>

          {/* ডান পাশে (Right Side): Go Home বাটন */}
          <Button
            onClick={() => router.push("/")}
            variant="bordered"
            className="w-full sm:w-auto font-medium rounded-xl border-default text-foreground hover:bg-default"
          >
            <ArrowLeft className="size-4 mr-1" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
