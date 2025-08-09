import { Badge } from "@/components/ui/badge";
import type { TowerStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TowerStatusBadgeProps {
  status: TowerStatus;
}

export default function TowerStatusBadge({ status }: TowerStatusBadgeProps) {
  const statusStyles = {
    normal: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    critical: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
  };

  return (
    <Badge
      variant="outline"
      className={cn("capitalize", statusStyles[status])}
    >
      {status}
    </Badge>
  );
}
