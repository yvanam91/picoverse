'use client'

import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

interface VisitsChartProps {
    data: { date: string; visits: number }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-pv-dark-100 border border-white/10 p-3 rounded-lg shadow-xl">
                <p className="text-pv-white-0 text-xs font-medium uppercase tracking-wider mb-1">
                    {format(parseISO(label), 'd MMMM yyyy', { locale: fr })}
                </p>
                <p className="text-pv-brand-500 font-bold text-lg">
                    {payload[0].value} <span className="text-[10px] uppercase opacity-60">visites</span>
                </p>
            </div>
        )
    }
    return null
}

export function VisitsChart({ data }: VisitsChartProps) {
    return (
        <div className="w-full h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="rgba(255,255,255,0.03)" 
                        vertical={false} 
                    />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontFamily: 'var(--font-jost)' }}
                        tickFormatter={(str) => format(parseISO(str), 'dd MMM', { locale: fr })}
                        dy={10}
                        minTickGap={20}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontFamily: 'var(--font-jost)' }}
                        dx={-5}
                    />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ stroke: 'rgba(139, 92, 246, 0.2)', strokeWidth: 2 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="visits"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorVisits)"
                        activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
