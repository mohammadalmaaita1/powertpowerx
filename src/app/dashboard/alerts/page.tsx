import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockAlerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, ShieldAlert, Thermometer, Wrench, Zap, MessageSquareWarning } from "lucide-react";

const severityStyles: { [key: string]: string } = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-blue-500 text-white",
};

const getIconForMessage = (message: string) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("voltage")) return <ShieldAlert className="h-4 w-4" />;
    if (lowerCaseMessage.includes("temperature")) return <Thermometer className="h-4 w-4" />;
    if (lowerCaseMessage.includes("overcurrent")) return <Zap className="h-4 w-4" />;
    if (lowerCaseMessage.includes("communication")) return <MessageSquareWarning className="h-4 w-4" />;
    if (lowerCaseMessage.includes("maintenance")) return <Wrench className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
}

export default function AlertsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Alerts & Fault Detection</h1>
                <p className="text-muted-foreground">Recent alerts, faults, and notifications from the network.</p>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Severity</TableHead>
                        <TableHead>Tower</TableHead>
                        <TableHead>Event / Message</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {mockAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                        <TableCell>
                            <Badge className={cn("capitalize text-xs", severityStyles[alert.severity])}>
                                {alert.severity}
                            </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{alert.towerName}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {getIconForMessage(alert.message)}
                                <span>{alert.message}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-xs">
                            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
