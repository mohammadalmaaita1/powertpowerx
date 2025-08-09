
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TowerStatusBadge from "@/components/tower-status-badge";
import { Signal, Users, Gauge, Timer, ArrowDown, ArrowUp, BrainCircuit, Bot, BatteryCharging, ChevronLeft, Thermometer, Bolt, Battery, Omega, Sun, Zap as ZapIcon, RadioTower, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Tower } from "@/lib/types";
import { getTowerAdvice } from "@/ai/flows/tower-advisor-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SignalStrengthChart from "@/components/charts/signal-strength-chart";
import UserLoadChart from "@/components/charts/user-load-chart";
import DataSpeedsChart from "@/components/charts/data-speeds-chart";
import EnergyChart from "@/components/charts/energy-chart";
import StateOfChargeChart from "@/components/charts/state-of-charge-chart";
import { cn } from "@/lib/utils";


// This function would fetch a single tower from your API in a real app
async function getTower(id: string): Promise<Tower | undefined> {
  // We are now fetching from the API endpoint we created
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    const res = await fetch(`${baseUrl}/api/towers/${id}`, { cache: 'no-store' });
    if (!res.ok) { 
        console.error(`Failed to fetch tower ${id}: ${res.statusText}`);
        return undefined;
     }
    const towers: Tower[] = await res.json();
    return towers[0];
  } catch (error) {
    console.error("Error fetching tower data:", error);
    return undefined;
  }
}

async function AiAdvice({ tower }: { tower: Tower }) {
  const advice = await getTowerAdvice({
    name: tower.name,
    status: tower.status,
    userLoad: tower.userLoad,
    signalStrength: tower.signalStrength,
    latency: tower.latency,
    energyConsumption: tower.energyConsumption
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Analysis & Recommendations
        </CardTitle>
        <CardDescription>
          Gemini-powered advice to help optimize tower performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Bot className="h-4 w-4" />
          <AlertTitle>General Analysis</AlertTitle>
          <AlertDescription>
            {advice.analysis}
          </AlertDescription>
        </Alert>
         <Alert variant="destructive">
          <AlertTitle>Recommendations</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {advice.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

function BatteryCellDetails({ tower }: { tower: Tower }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="h-6 w-6 text-primary" />
          Individual Battery Cell Data
        </CardTitle>
        <CardDescription>
          Real-time data for each cell in the battery bank.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cell ID</TableHead>
              <TableHead className="text-right">Voltage (V)</TableHead>
              <TableHead className="text-right">Current (A)</TableHead>
              <TableHead className="text-right">SoC (%)</TableHead>
              <TableHead className="text-right">Temp (°C)</TableHead>
              <TableHead className="text-right">Resistance (mΩ)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tower.batteryCells.map((cell) => (
              <TableRow key={cell.id}>
                <TableCell className="font-medium">Cell #{cell.id}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Bolt className="h-4 w-4 text-muted-foreground" /> {cell.voltage.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span className={Number(cell.current) > 0 ? 'text-green-400' : 'text-orange-400'}>
                    {cell.current}
                  </span>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                    <BatteryCharging className="h-4 w-4 text-muted-foreground" />
                    {cell.stateOfCharge}%
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" /> {cell.temperature}°
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Omega className="h-4 w-4 text-muted-foreground" /> {cell.internalResistance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PowerFlow({ tower }: { tower: Tower }) {
  const totalCurrent = tower.batteryCells.reduce((acc, cell) => acc + Number(cell.current), 0);
  
  let batteryStatus: "charging" | "discharging" | "standby";
  if (totalCurrent > 0.1) {
    batteryStatus = "charging";
  } else if (totalCurrent < -0.1) {
    batteryStatus = "discharging";
  } else {
    batteryStatus = "standby";
  }

  const PowerSourceIcon = tower.powerSource === 'grid' ? ZapIcon : Sun;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ZapIcon className="h-6 w-6 text-primary" />
          Power Flow & Charging Status
        </CardTitle>
        <CardDescription>
          Current energy source, battery state, and power distribution.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around items-center text-center">
            {/* Power Source */}
            <div className="flex flex-col items-center gap-2">
                <PowerSourceIcon className="h-10 w-10 text-muted-foreground" />
                <span className="font-bold capitalize">{tower.powerSource}</span>
                <span className="text-xs text-muted-foreground">Source</span>
            </div>
            
            <ArrowRight className={cn("h-8 w-8 text-green-500", (batteryStatus === 'discharging' || tower.powerSource === 'solar') && 'invisible')} />

            {/* Battery */}
            <div className="flex flex-col items-center gap-2">
                <BatteryCharging className="h-10 w-10 text-muted-foreground" />
                <span className={cn("font-bold capitalize",
                    batteryStatus === 'charging' && 'text-green-400',
                    batteryStatus === 'discharging' && 'text-orange-400'
                )}>{batteryStatus}</span>
                 <span className="text-xs text-muted-foreground">Battery</span>
            </div>

            <ArrowRight className={cn("h-8 w-8 text-green-500", batteryStatus === 'charging' && 'invisible')} />

            {/* Tower Load */}
            <div className="flex flex-col items-center gap-2">
                 <RadioTower className="h-10 w-10 text-muted-foreground" />
                 <span className="font-bold">{tower.userLoad} Users</span>
                 <span className="text-xs text-muted-foreground">Load</span>
            </div>
        </div>
        <Alert>
            <AlertTitle>Status Details</AlertTitle>
            <AlertDescription>
                {batteryStatus === 'charging' && `The battery is currently charging from the ${tower.powerSource}. Power is flowing from the source to the battery and the tower.`}
                {batteryStatus === 'discharging' && `The battery is currently discharging to power the tower. Main power source might be offline.`}
                {batteryStatus === 'standby' && `The battery is fully charged and on standby. The ${tower.powerSource} is directly powering the tower.`}
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}


export default async function TowerDetailPage({ params }: { params: { id: string } }) {
  const tower = await getTower(params.id);

  if (!tower) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
         <Button asChild variant="outline" size="sm" className="mb-4">
             <Link href="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4"/>
                Back to Overview
             </Link>
         </Button>
        <div className="flex justify-between items-start">
            <div>
                 <h1 className="text-3xl font-bold font-headline">{tower.name} ({tower.id})</h1>
                <p className="text-muted-foreground">{tower.location}</p>
            </div>
            <TowerStatusBadge status={tower.status} />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Signal Strength</CardTitle><Signal className="h-4 w-4 text-muted-foreground"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{tower.signalStrength} dBm</div></CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Connected Users</CardTitle><Users className="h-4 w-4 text-muted-foreground"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{tower.userLoad}</div></CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Data Speeds</CardTitle><Gauge className="h-4 w-4 text-muted-foreground"/></CardHeader>
            <CardContent className="text-sm">
                <div className="flex items-center"><ArrowDown className="h-4 w-4 mr-2 text-green-500" /> {tower.downloadSpeed} Mbps</div>
                <div className="flex items-center"><ArrowUp className="h-4 w-4 mr-2 text-blue-500" /> {tower.uploadSpeed} Mbps</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Latency</CardTitle><Timer className="h-4 w-4 text-muted-foreground"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{tower.latency} ms</div></CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Battery</CardTitle><BatteryCharging className="h-4 w-4 text-muted-foreground"/></CardHeader>
            <CardContent className="text-sm">
                <div>{tower.batteryType}</div>
                <div className="font-bold">{tower.batteryCapacity} Ah</div>
            </CardContent>
        </Card>
      </div>

      <PowerFlow tower={tower} />

      <BatteryCellDetails tower={tower} />
      
      <AiAdvice tower={tower} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Signal Strength History</CardTitle>
            <CardDescription>Last 30 days of signal strength data.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SignalStrengthChart historicalData={tower.historicalData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Load History</CardTitle>
            <CardDescription>Last 30 days of connected user data.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserLoadChart historicalData={tower.historicalData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data Speeds History</CardTitle>
            <CardDescription>Last 30 days of upload/download speed data.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DataSpeedsChart historicalData={tower.historicalData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Energy Consumption History</CardTitle>
            <CardDescription>Last 30 days of energy consumption data.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <EnergyChart historicalData={tower.historicalData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>State of Charge History</CardTitle>
            <CardDescription>Charge/Discharge curve trends for the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <StateOfChargeChart historicalData={tower.historicalData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
