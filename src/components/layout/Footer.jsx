import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import Logo from "./Logo";

const productLinks = [
  { label: "Job discovery", href: "/jobs" },
  { label: "Worker AI", href: "/worker-ai" },
  { label: "Companies", href: "/companies" },
  { label: "Salary data", href: "/salary" },
];

const navigationLinks = [
  { label: "Help center", href: "/help" },
  { label: "Career library", href: "/career-library" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Brand Guideline", href: "/brand" },
  { label: "Newsroom", href: "/newsroom" },
];

const FooterColumn = ({ heading, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-[#5C53FE]">{heading}</h3>
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:gap-24 lg:gap-32">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16 lg:gap-24">
            <FooterColumn heading="Product" links={productLinks} />
            <FooterColumn heading="Navigations" links={navigationLinks} />
            <FooterColumn heading="Resources" links={resourceLinks} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-3">
            <li>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex items-center justify-center text-white transition-opacity hover:opacity-80"
              >
                <FaFacebookF size={20} />
              </Link>
            </li>
            <li>
              <Link
                href="https://pinterest.com"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#5C53FE] text-white transition-colors hover:bg-[#5C53FE]/90"
              >
                <FaPinterestP size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="flex items-center justify-center text-white transition-opacity hover:opacity-80"
              >
                <FaLinkedinIn size={20} />
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-center sm:gap-6">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="flex items-center gap-3">
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms & Policy
              </Link>
              <span aria-hidden="true" className="text-white/40">·</span>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
