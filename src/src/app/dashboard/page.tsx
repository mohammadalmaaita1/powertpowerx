import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  RadioTower,
  Signal,
  Users,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Tower } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/stat-card";
import TowerCard from "@/components/tower-card";
import TowerMap from "@/components/tower-map";
import { Button } from "@/components/ui/button";

async function getTowers(): Promise<Tower[]> {
  // When running on the server, we need a full URL.
  // The base URL is now set in the .env file.
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  const res = await fetch(`${baseUrl}/api/towers`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch towers');
  }
  return res.json();
}


export default async function Dashboard() {
  const towers = await getTowers();

  const activeTowers = towers.filter((t) => t.status === "normal").length;
  const avgSignal = Math.round(
    towers.reduce((acc, t) => acc + t.signalStrength, 0) /
      (towers.length || 1)
  );
  const totalUsers = towers.reduce((acc, t) => acc + t.userLoad, 0);
  const totalEnergy = towers.reduce((acc, t) => acc + t.energyConsumption, 0).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Network Map</CardTitle>
               <CardDescription>
                  Real-time geographical distribution and status of towers.
                  <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div>Normal</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Warning</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Critical</span>
                  </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] lg:h-[50vh] rounded-lg overflow-hidden">
                <TowerMap towers={towers} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <StatCard
          title="Normal Towers"
          value={activeTowers.toString()}
          icon={<RadioTower className="h-4 w-4 text-muted-foreground" />}
          description={`${Math.round((activeTowers / (towers.length || 1)) * 100)}% of total`}
        />
        <StatCard
          title="Avg. Signal"
          value={`${avgSignal} dBm`}
          icon={<Signal className="h-4 w-4 text-muted-foreground" />}
          description="Across all towers"
        />
        <StatCard
          title="Connected Users"
          value={totalUsers.toLocaleString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Real-time user load"
        />
        <StatCard
          title="Energy Usage"
          value={`${totalEnergy} kWh`}
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          description="Total this month"
        />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Tower Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {towers.map((tower) => (
            <TowerCard key={tower.id} tower={tower} />
          ))}
        </div>
      </div>
    </div>
  );
}
