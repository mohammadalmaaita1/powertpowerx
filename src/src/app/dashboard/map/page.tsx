import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TowerMap from "@/components/tower-map";
import { mockTowers } from "@/lib/mock-data";

export default function MapPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Geographical Distribution</h1>
                <p className="text-muted-foreground">Real-time status of towers across the network.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Network Map</CardTitle>
                    <CardDescription>
                        Click on a tower to see its name and status.
                        <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div>Normal</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Warning</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Critical</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[70vh]">
                        <TowerMap towers={mockTowers} center={{ lat: 31.9539, lng: 35.9106 }} zoom={8} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
