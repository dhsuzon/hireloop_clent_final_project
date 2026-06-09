"use client";

import { useState } from "react";
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

  const navLinks = 
    <>
      <li>
        <Link
          href="/jobs"
          onClick={close}
          className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Browse Jobs
        </Link>
      </li>
      <li>
        <Link
          href="/company"
          onClick={close}
          className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Company
        </Link>
      </li>
      <li>
        <Link
          href="/pricing"
          onClick={close}
          className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Pricing
        </Link>
      </li>
    </>
    let navEndInfo;
    if (isPending) {
      navEndInfo = (
        <span className="h-8 w-24 animate-pulse rounded-md bg-white/5" aria-hidden="true" />
      );
    } else if (user) {
      navEndInfo = (
        <>
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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Sign Out
          </button>
        </>
      );
    } else {
      navEndInfo = (
        <>
          <Link
            href="/auth/login"
            onClick={close}
            className="text-sm font-medium text-[#5C53FE] transition-colors hover:text-[#5C53FE]/80"
          >
            Sign In
          </Link>
          <Link href="/auth/signup" onClick={close}>
            <Button
              variant="primary"
              className="rounded-sm bg-white font-semibold text-black hover:bg-white/90"
            >
              Sign Up
            </Button>
          </Link>
        </>
      );
    }
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#1E1E1E]/80 backdrop-blur-lg">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo priority />

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
            {navLinks}
          </ul>
          <span aria-hidden="true" className="h-6 w-px bg-white/20" />
          {navEndInfo}
        </div>

        <Button
          isIconOnly
          variant="ghost"
          size="md"
          className="text-white lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onPress={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <Xmark width={22} height={22} /> : <Bars width={22} height={22} />}
        </Button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-white/5 bg-[#1E1E1E] transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-4 py-4 sm:px-6">
          {navLinks}
          <li className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-3">
            {navEndInfo}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
