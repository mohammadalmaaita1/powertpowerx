"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { PerformanceData } from "@/lib/types";

interface ChartProps {
    historicalData: PerformanceData[];
}

export default function StateOfChargeChart({ historicalData }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value.toFixed(1)}V`} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="stateOfCharge" name="State of Charge" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="voltage" name="Voltage" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}
