"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Bars from "@gravity-ui/icons/Bars";
import Xmark from "@gravity-ui/icons/Xmark";
import Logo from "./Logo";
import { authClient, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    close();
    await authClient.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const linksArray = [
    { href: "/jobs?page=1", label: "Browse Jobs" },
    { href: "/company", label: "Company" },
    { href: "/plans", label: "Pricing" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    linksArray.push({
      href: dashboardLinks[user?.role || "seeker"],
      label: "Dashboard",
    });
  }

  let navEndInfo;
  if (isPending) {
    navEndInfo = (
      <span
        className="h-8 w-24 animate-pulse rounded-md bg-white/5"
        aria-hidden="true"
      />
    );
  } else if (user) {
    navEndInfo = (
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#5C53FE] text-xs font-semibold text-white"
          >
            {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-medium text-white">
            {user.name ?? user.email}
          </span>
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full lg:w-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    navEndInfo = (
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
        <Link
          href="/auth/login"
          onClick={close}
          className="text-sm font-medium text-[#5C53FE] transition-colors hover:text-[#5C53FE]/80 py-2 lg:py-0"
        >
          Sign In
        </Link>
        <Link href="/auth/signup" onClick={close} className="w-full lg:w-auto">
          <Button
            variant="light"
            className="w-full lg:w-auto rounded-sm bg-white font-semibold text-black hover:bg-white/90"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#1E1E1E]/80 backdrop-blur-lg">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo priority />

        {/* ডেক্সটপ ভিউ */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
            {/* 💡 ডেক্সটপ ইউনিক কী ফিক্স */}
            {linksArray.map((link) => (
              <li key={`desktop-${link.href}`}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="h-6 w-px bg-white/20" />

          {/* 💡 ডেক্সটপ কন্টেন্ট কী ফিক্স */}
          <React.Fragment key="desktop-auth-view">{navEndInfo}</React.Fragment>
        </div>

        {/* মোবাইল হ্যামবার্গার বাটন */}
        <Button
          isIconOnly
          variant="light"
          size="md"
          className="text-white lg:hidden bg-transparent min-w-10 h-10"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onPress={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <Xmark width={22} height={22} />
          ) : (
            <Bars width={22} height={22} />
          )}
        </Button>
      </nav>

      {/* মোবাইল ড্রপডাউন মেনু */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-white/5 bg-[#1E1E1E] transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-4 py-4 sm:px-6">
          {/* 💡 মোবাইল ইউনিক কী ফিক্স */}
          {linksArray.map((link) => (
            <li key={`mobile-${link.href}`}>
              <Link
                href={link.href}
                onClick={close}
                className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* 💡 মোবাইল কন্টেন্ট কী ফিক্স */}
          <li className="mt-2 border-t border-white/5 pt-4">
            <React.Fragment key="mobile-auth-view">{navEndInfo}</React.Fragment>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
