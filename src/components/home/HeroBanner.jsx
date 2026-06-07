import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import Magnifier from "@gravity-ui/icons/Magnifier";
import GeoPin from "@gravity-ui/icons/GeoPin";
import Briefcase from "@gravity-ui/icons/Briefcase";
import ChartColumn from "@gravity-ui/icons/ChartColumn";
import Star from "@gravity-ui/icons/Star";
import HeroHeading from "./HeroHeading";

const trendingPositions = [
  { label: "Product Designer", href: "/jobs?role=product-designer" },
  { label: "AI Engineering", href: "/jobs?role=ai-engineering" },
  { label: "Dev-ops Engineer", href: "/jobs?role=devops-engineer" },
];

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: Magnifier, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

const HeroBanner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-linear-to-t from-[#1E1E1E] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <HeroHeading />

        <form
          role="search"
          aria-label="Search jobs"
          className="mx-auto mt-10 flex w-full max-w-3xl items-center gap-1 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur"
        >
          <label className="flex flex-1 items-center gap-2 px-3">
            <Magnifier width={16} height={16} className="text-white/45" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </label>

          <span aria-hidden="true" className="h-6 w-px bg-white/10" />

          <label className="flex flex-1 items-center gap-2 px-3">
            <GeoPin width={16} height={16} className="text-white/45" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </label>

          <Button
            type="submit"
            isIconOnly
            aria-label="Search"
            className="h-10 w-10 min-w-10 rounded-xl bg-[#5C53FE] text-white hover:bg-[#5C53FE]/90"
          >
            <Magnifier width={16} height={16} />
          </Button>
        </form>

        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-white/45">Trending Position</span>
          <ul className="flex flex-wrap items-center gap-2">
            {trendingPositions.map((position) => (
              <li key={position.href}>
                <Link
                  href={position.href}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/4 px-3 py-1.5 font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {position.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-8">
          <div className="relative mx-auto aspect-16/11 w-full max-w-5xl ">
            <Image
              src="/images/globe.png"
              alt="Earth illustration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 top-[58%] flex flex-col items-center px-4 text-center">
              <p className="max-w-xl text-2xl leading-[1.35] tracking-tight text-white/70 sm:text-3xl md:text-4xl">
                <span className="font-medium">Assisting over </span>
                <span className="font-medium text-white">15,000 job seekers</span>
                <br />
                <span className="font-medium">find their dream positions.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-16 grid grid-cols-2 gap-4 sm:-mt-24 sm:gap-6 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="flex flex-col gap-10 rounded-2xl border border-white/10 bg-[#1E1E1E]/80 p-8 backdrop-blur sm:gap-12 sm:p-10"
            >
              <Icon width={20} height={20} className="text-white/55" />
              <div>
                <div className="text-3xl font-semibold text-white sm:text-4xl">
                  {value}
                </div>
                <div className="mt-2 text-xs text-white/55 sm:text-sm">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
