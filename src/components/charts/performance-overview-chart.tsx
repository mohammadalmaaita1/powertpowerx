"use client"

import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockTowers } from "@/lib/mock-data"

const chartData = mockTowers[0].historicalData.slice(-30);

export default function PerformanceOverviewChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}dBm`} />
                <YAxis yAxisId="right" orientation="right" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="signalStrength" name="Avg. Signal Strength" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="userLoad" name="Total User Load" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
