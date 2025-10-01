import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { SalesData } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface SalesChartProps {
    data: SalesData[];
    formatCurrency: (priceInUsd: number) => string;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, formatCurrency }) => {
    const { theme } = useTheme();

    const tickColor = theme === 'dark' ? '#A3A3A3' : '#6B7280';
    const gridColor = theme === 'dark' ? '#2A2A2A' : '#E5E7EB';
    const tooltipBg = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
    const tooltipBorder = theme === 'dark' ? '#3C3C3C' : '#E5E7EB';
    const tooltipLabelColor = theme === 'dark' ? '#ffffff' : '#1F2937';

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F0562D" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#F0562D" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: '0.5rem'
                    }} 
                    labelStyle={{ color: tooltipLabelColor }}
                    formatter={(value: number) => [formatCurrency(value), 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#F0562D" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};