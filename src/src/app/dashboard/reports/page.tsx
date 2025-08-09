import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";
import EnergyConsumptionChart from "@/components/charts/energy-consumption-chart";
import PerformanceOverviewChart from "@/components/charts/performance-overview-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Analyze network performance and trends over time.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                    <Button asChild>
                        <Link href="/api/towers/download">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                        <CardDescription>Key metrics trend for the selected period.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <PerformanceOverviewChart />
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Energy Consumption Analysis</CardTitle>
                        <CardDescription>Total energy usage vs. average user load.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <EnergyConsumptionChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
