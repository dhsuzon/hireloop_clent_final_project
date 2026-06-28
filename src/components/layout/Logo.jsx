import Link from "next/link";
import Image from "next/image";

const Logo = ({ priority = false }) => (
  <Link
    href="/"
    className="flex items-center shrink-0"
    aria-label="Programming Hero home"
  >
    <Image
      src="/images/logo.png"
      alt="Programming Hero logo"
      width={154}
      height={44}
      priority={priority}
      loading="eager"
      className="h-11 w-auto object-contain sm:h-12"
    />
  </Link>
);

export default Logo;
