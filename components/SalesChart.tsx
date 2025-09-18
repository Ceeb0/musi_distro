import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { SalesData } from '../types';

interface SalesChartProps {
    data: SalesData[];
    formatCurrency: (priceInUsd: number) => string;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, formatCurrency }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F0562D" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#F0562D" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: '#1E1E1E',
                        border: '1px solid #3C3C3C',
                        borderRadius: '0.5rem'
                    }} 
                    labelStyle={{ color: '#ffffff' }}
                    formatter={(value: number) => [formatCurrency(value), 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#F0562D" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};