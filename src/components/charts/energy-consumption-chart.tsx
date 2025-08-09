"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockTowers } from "@/lib/mock-data"

const chartData = mockTowers[0].historicalData.slice(-30);

export default function EnergyConsumptionChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} kWh`} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip
                     contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="energyConsumption" name="Energy Consumption (kWh)" fill="hsl(var(--chart-1))" />
                <Bar yAxisId="right" dataKey="userLoad" name="User Load" fill="hsl(var(--chart-2))" />
            </BarChart>
        </ResponsiveContainer>
    )
}
