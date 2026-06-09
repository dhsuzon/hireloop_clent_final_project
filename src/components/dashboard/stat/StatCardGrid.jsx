import StatCard from "./StatCard";

const StatCardGrid = ({ stats = [], className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 ${className}`}
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.key ?? stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatCardGrid;
