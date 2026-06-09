import Tray from "@gravity-ui/icons/Tray";

const EmptyState = ({
  icon: Icon = Tray,
  title = "No data found",
  description = "There's nothing to show here yet.",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 px-4 py-10 text-center ${className}`}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-default">
        <Icon className="size-5 text-muted" />
      </span>
      <p className="font-medium text-foreground">{title}</p>
      <p className="max-w-xs text-sm text-muted">{description}</p>
    </div>
  );
};

export default EmptyState;
