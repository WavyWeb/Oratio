"use client";
import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useDashboardData } from '../context/DashboardDataContext';
import { useTheme } from '../context/ThemeContext';

const PerformanceChart = () => {
    const { reports } = useDashboardData();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [performanceData, setPerformanceData] = useState([]);
    const [isDemo, setIsDemo] = useState(false);

    // Demo data for fallback
    const demoData = [
        { session: 'S1', title: 'Intro Practice', Voice: 65, Expressions: 55, Vocabulary: 60 },
        { session: 'S2', title: 'Pitch Rehearsal', Voice: 72, Expressions: 65, Vocabulary: 70 },
        { session: 'S3', title: 'Team Update', Voice: 68, Expressions: 75, Vocabulary: 78 },
        { session: 'S4', title: 'Client Call', Voice: 85, Expressions: 70, Vocabulary: 82 },
        { session: 'S5', title: 'Keynote Prep', Voice: 78, Expressions: 85, Vocabulary: 90 },
    ];

    useEffect(() => {
        if (reports && reports.length > 0) {
            const recentData = reports.slice(0, 10).reverse();
            const formattedData = recentData.map((report, index) => ({
                session: `S${index + 1}`,
                title: report.title || `Session ${index + 1}`,
                Voice: report.scores?.voice || 0,
                Expressions: report.scores?.expressions || 0,
                Vocabulary: report.scores?.vocabulary || 0,
            }));
            setPerformanceData(formattedData);
            setIsDemo(false);
        } else {
            setPerformanceData(demoData);
            setIsDemo(true);
        }
    }, [reports]);

    const colors = {
        voice: "#e11d48", // Rose
        faces: "#fb923c", // Orange
        vocab: "#f59e0b"  // Amber
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const title = payload[0].payload.title;
            return (
                <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg">
                    <p className="font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Performance Trends
                </h3>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#f1f5f9'} vertical={false} />
                        <XAxis
                            dataKey="session"
                            stroke={isDark ? '#64748b' : '#94a3b8'}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke={isDark ? '#64748b' : '#94a3b8'}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 100]}
                            tickCount={6}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

                        <Line
                            type="monotone"
                            dataKey="Voice"
                            stroke={colors.voice}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Expressions"
                            stroke={colors.faces}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Vocabulary"
                            stroke={colors.vocab}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;