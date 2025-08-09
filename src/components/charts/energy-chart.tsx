"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { PerformanceData } from "@/lib/types";

interface ChartProps {
    historicalData: PerformanceData[];
}

export default function EnergyChart({ historicalData }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} kWh`}/>
                <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                <Legend />
                <Line type="monotone" dataKey="energyConsumption" name="Energy Consumption" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}
