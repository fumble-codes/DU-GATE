import { MetricCard } from "@/components/ui/card";
import { FilterTabs } from "@/components/ui/filter-tabs";

const defaultTabs = [
  { id: "all", label: "ALL" },
  { id: "mocks", label: "MOCKS" },
  { id: "chapters", label: "CHAPTERS" },
];

interface TopbarProps {
  metrics?: {
    label: string;
    value: string | number;
    trend?: { direction: "up" | "down"; label: string };
    icon?: React.ReactNode;
  }[];
  tabs?: { id: string; label: string }[];
  onTabChange?: (id: string) => void;
}

export function Topbar({
  metrics,
  tabs = defaultTabs,
  onTabChange,
}: TopbarProps) {
  return (
    <header className="space-y-6">
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              icon={metric.icon}
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <FilterTabs tabs={tabs} onChange={onTabChange} />
      </div>
    </header>
  );
}
