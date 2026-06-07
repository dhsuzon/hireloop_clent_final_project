const HeroHeading = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black py-1 pl-1 pr-3 text-[11px] tracking-wide backdrop-blur">
        <span
          aria-hidden="true"
          className="grid h-5 w-5 place-items-center rounded-full bg-linear-to-br from-amber-300 via-orange-400 to-amber-600 text-[10px]"
        >
          🏆
        </span>
        <span className="font-semibold text-white">50,000+</span>
        <span className="text-white/55">NEW JOBS THIS MONTH</span>
      </span>

      <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[68px]">
        Find Your Dream Job Today
      </h1>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-[15px]">
        HireLoop connects top talent with world-class companies. Browse thousands of
        curated opportunities and land your next role &mdash; faster.
      </p>
    </div>
  );
};

export default HeroHeading;
