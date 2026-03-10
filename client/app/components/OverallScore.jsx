"use client";
import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import AnimatedCircularBar from './AnimatedCircularBar';
import './bg.css';
import { useDashboardData } from '../context/DashboardDataContext';
import { useTheme } from '../context/ThemeContext';

const PerformanceMetrics = () => {
    const { overallScores } = useDashboardData();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const textColor = isDark ? '#e2e8f0' : '#0f172a';
    const scoreTrailColor = isDark ? '#334155' : '#f1f5f9';
    // Default/Demo Scores
    const [scores, setScores] = useState({ pace: 80, modulation: 75, clarity: 86 });
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        if (!overallScores) {
            setIsDemo(true);
            return;
        }

        if (overallScores.avg_voice === 0 && overallScores.avg_expressions === 0 && overallScores.avg_vocabulary === 0) {
            setIsDemo(true);
        } else {
            setScores({
                pace: overallScores.avg_voice || 0,
                modulation: overallScores.avg_expressions || 0,
                clarity: overallScores.avg_vocabulary || 0
            });
            setIsDemo(false);
        }
    }, [overallScores]);

    const colors = {
        pace: "#e11d48", // Rose (Voice)
        modulation: "#fb923c", // Orange (Expressions)
        clarity: "#f59e0b" // Amber (Vocabulary)
    };

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
                Performance Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Voice Metric */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <AnimatedCircularBar
                        className="w-32 h-32"
                        targetValue={scores.pace}
                        suffix="%"
                        pathColor={colors.pace}
                        textColor={textColor}
                        trailColor={scoreTrailColor}
                    />
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800 dark:text-white">Voice</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Score</p>
                    </div>
                </div>

                {/* Expressions Metric */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <AnimatedCircularBar
                        className="w-32 h-32"
                        targetValue={scores.modulation}
                        suffix="%"
                        pathColor={colors.modulation}
                        textColor={textColor}
                        trailColor={scoreTrailColor}
                    />
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800 dark:text-white">Expressions</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Score</p>
                    </div>
                </div>

                {/* Vocabulary Metric */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <AnimatedCircularBar
                        className="w-32 h-32"
                        targetValue={scores.clarity}
                        suffix="%"
                        pathColor={colors.clarity}
                        textColor={textColor}
                        trailColor={scoreTrailColor}
                    />
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800 dark:text-white">Vocabulary</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Score</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMetrics;