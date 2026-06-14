import { Card } from "@heroui/react";

const StatCard = ({ icon: Icon, label, value, className = "" }) => {
  return (
    <Card
      className={`bg-content1 border border-default rounded-2xl p-5 ${className}`}
      aria-label={`${label} card`}
    >
      <Card.Content className="flex flex-col gap-4 p-0">
        <span className="flex size-9 items-center justify-center rounded-lg bg-default">
          {Icon ? (
            <Icon className="size-4 text-muted" aria-label={`${label}icon`} />
          ) : null}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">{label}</span>
          <span className="text-2xl font-semibold text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default StatCard;
