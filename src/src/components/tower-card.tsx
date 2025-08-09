import Link from "next/link";
import { ArrowUpRight, Gauge, Signal, Users, BatteryCharging, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TowerStatusBadge from "./tower-status-badge";
import type { Tower } from "@/lib/types";

interface TowerCardProps {
  tower: Tower;
}

export default function TowerCard({ tower }: TowerCardProps) {
  const avgSoC = tower.batteryCells.length > 0
    ? Math.round(tower.batteryCells.reduce((acc, cell) => acc + cell.stateOfCharge, 0) / tower.batteryCells.length)
    : 0;

  const avgTemp = tower.batteryCells.length > 0
    ? Math.round(tower.batteryCells.reduce((acc, cell) => acc + cell.temperature, 0) / tower.batteryCells.length)
    : 0;
    
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                 <CardTitle className="text-lg font-headline">{tower.name}</CardTitle>
                 <CardDescription>{tower.location}</CardDescription>
            </div>
            <TowerStatusBadge status={tower.status} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
            <Signal className="h-4 w-4 text-muted-foreground" />
            <span>{tower.signalStrength} dBm</span>
        </div>
        <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{tower.userLoad} users</span>
        </div>
        <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span>{avgTemp}°C Avg. Temp</span>
        </div>
        <div className="flex items-center gap-2">
            <BatteryCharging className="h-4 w-4 text-muted-foreground" />
            <span>{avgSoC}% Avg. SoC</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/dashboard/towers/${tower.id}`}>
            View Details <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
