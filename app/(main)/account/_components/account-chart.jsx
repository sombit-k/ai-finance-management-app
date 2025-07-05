"use client";

import { useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
    const [dateRange, setDateRange] = useState("1M");

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days
            ? startOfDay(subDays(now, range.days))
            : startOfDay(new Date(0));

        // Filter transactions within date range
        const filtered = transactions.filter(
            (t) => {
                const tDate = new Date(t.date);
                return tDate >= startDate && tDate <= endOfDay(now);
            }
        );

        // Group transactions by full date string (yyyy-MM-dd)
        const grouped = filtered.reduce(
            (acc, transaction) => {
                const dateKey = format(new Date(transaction.date), "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = {
                        date: dateKey,
                        income: 0,
                        expense: 0,
                    };
                }
                if (transaction.type === "INCOME") {
                    acc[dateKey].income += transaction.amount;
                } else {
                    acc[dateKey].expense += transaction.amount;
                }
                return acc;
            },
            {}
        );

        // Convert to array, sort by date, and format for chart display
        return Object.values(grouped)
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((item) => ({
                ...item,
                // For chart X axis: show "MMM dd"
                date: format(new Date(item.date), "MMM dd"),
            }));
    }, [transactions, dateRange]);

    const totals = useMemo(() => {
        return filteredData.reduce(
            (acc, day) => ({
                income: acc.income + day.income,
                expense: acc.expense + day.expense,
            }),
            { income: 0, expense: 0 }
        );
    }, [filteredData]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle className="text-base font-normal">
                    Transaction Overview
                </CardTitle>
                <Select value={dateRange} onValueChange={(val) => setDateRange(val)}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex justify-around mb-6 text-sm">
                    <div className="text-center">
                        <p className="text-muted-foreground">Total Income</p>
                        <p className="text-lg font-bold text-green-500">
                            ${totals.income.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Total Expenses</p>
                        <p className="text-lg font-bold text-red-500">
                            ${totals.expense.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Net</p>
                        <p
                            className={`text-lg font-bold ${totals.income - totals.expense >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            ${(totals.income - totals.expense).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                formatter={(value) => [`$${value}`, ""]}
                                contentStyle={{
                                    backgroundColor: "hsl(var(--popover))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend />
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#22c55e"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill="#ef4444"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
                      
