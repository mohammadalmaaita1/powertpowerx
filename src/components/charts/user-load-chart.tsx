"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { PerformanceData } from "@/lib/types";

interface ChartProps {
    historicalData: PerformanceData[];
}

export default function UserLoadChart({ historicalData }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                <Legend />
                <Bar dataKey="userLoad" name="User Load" fill="hsl(var(--chart-2))" />
            </BarChart>
        </ResponsiveContainer>
    );
}
