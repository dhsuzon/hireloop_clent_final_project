"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import LayoutSideContentLeft from "@gravity-ui/icons/LayoutSideContentLeft";

import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  CreditCard,
  Settings,
  FileText,
  Bookmark,
  ChevronDown,
  Search,
} from "lucide-react";

const iconRegistry = {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  Settings,
  ChevronDown,
  Bookmark,
  Search,
  CreditCard,
  Building2,
  Users,
  Building2,
};

const DashboardSidebarLayout = ({ currentNavItems = [] }) => {
  const pathname = usePathname();

  // 💡 সাব-মেনু হ্যান্ডেল করার জন্য NavGroup কম্পোনেন্ট (ইনসাইড কম্পোনেন্ট)
  const NavGroup = ({ item, pathname }) => {
    const activeHref = item.children
      .filter(
        (child) =>
          pathname === child.href || pathname.startsWith(`${child.href}/`),
      )
      .sort((a, b) => b.href.length - a.href.length)[0]?.href;
    const childActive = Boolean(activeHref);
    const [open, setOpen] = useState(childActive);

    // স্ট্রিন নাম থেকে সঠিক আইকন কম্পোনেন্ট বের করা হচ্ছে
    const IconComponent = iconRegistry[item.icon] || Shapes4;

    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
            childActive
              ? "font-medium text-foreground"
              : "text-muted hover:bg-default hover:text-foreground"
          }`}
        >
          <IconComponent
            className={`size-5 ${childActive ? "text-foreground" : "text-muted"}`}
          />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="ml-4 flex flex-col gap-1 border-l border-default pl-3">
            {item.children.map((child) => {
              const isActive = child.href === activeHref;
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-default font-medium text-foreground"
                      : "text-muted hover:bg-default hover:text-foreground"
                  }`}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 💡 নেভিগেশন কনটেন্ট রেন্ডার লজিক
  const navContent = (
    <nav className="flex flex-col gap-1">
      {currentNavItems.map((item) => {
        if (item.children) {
          return <NavGroup key={item.label} item={item} pathname={pathname} />;
        }
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        // স্ট্রিন নাম থেকে সঠিক আইকন কম্পোনেন্ট বের করা হচ্ছে
        const IconComponent = iconRegistry[item.icon] || Shapes4;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-default font-medium text-foreground"
                : "text-muted hover:bg-default hover:text-foreground"
            }`}
          >
            <IconComponent
              className={`size-5 ${isActive ? "text-foreground" : "text-muted"}`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSidebarLayout;
