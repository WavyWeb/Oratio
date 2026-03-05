"use client";
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './bg.css';

const PerformanceMetrics = () => {
    // Default/Demo Scores
    const [scores, setScores] = useState({ pace: 80, modulation: 75, clarity: 86 });
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        const fetchOverallScores = async () => {
            const rawUserId = localStorage.getItem('userId');
            const userId = rawUserId && rawUserId !== 'undefined' && rawUserId !== 'null' && rawUserId.trim() !== '' ? rawUserId : null;

            if (!userId) {
                setIsDemo(true);
                return;
            }

            const token = localStorage.getItem('token');
            try {
                const API = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:5000` : 'http://127.0.0.1:5000');
                const response = await fetch(`${API}/user-reports`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    setIsDemo(true);
                    return;
                }

                const data = await response.json();

                // If we get 0s back, it likely means no reports, so we might want to stay on demo or show 0s.
                // Let's show real data if at least one is > 0, otherwise demo for better UX?
                // For now, let's respect even 0s if they come from the backend, 
                // UNLESS the backend returns 404/error which we handled above.

                if (data.avg_voice === 0 && data.avg_expressions === 0 && data.avg_vocabulary === 0) {
                    setIsDemo(true); // Fallback to nice demo numbers if user is brand new
                } else {
                    setScores({
                        pace: data.avg_voice || 0,
                        modulation: data.avg_expressions || 0,
                        clarity: data.avg_vocabulary || 0
                    });
                    setIsDemo(false);
                }

            } catch (error) {
                console.error('Error fetching overall scores:', error);
                setIsDemo(true);
            }
        };

        fetchOverallScores();
    }, []);

    const colors = {
        pace: "#e11d48", // Rose (Voice)
        modulation: "#fb923c", // Orange (Expressions)
        clarity: "#f59e0b" // Amber (Vocabulary)
    };

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
                Performance Overview
                {isDemo && <span className="text-xs font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full border border-amber-200">Avg. (Demo)</span>}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Voice Metric */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={scores.pace}
                            text={`${Math.round(scores.pace)}%`}
                            styles={buildStyles({
                                pathColor: colors.pace,
                                textColor: '#0f172a',
                                trailColor: '#f1f5f9',
                                textSize: '20px'
                            })}
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800">Voice</p>
                        <p className="text-sm text-slate-500">Avg. Score</p>
                    </div>
                </div>

                {/* Expressions Metric */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={scores.modulation}
                            text={`${Math.round(scores.modulation)}%`}
                            styles={buildStyles({
                                pathColor: colors.modulation,
                                textColor: '#0f172a',
                                trailColor: '#f1f5f9',
                                textSize: '20px'
                            })}
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800">Expressions</p>
                        <p className="text-sm text-slate-500">Avg. Score</p>
                    </div>
                </div>

                {/* Vocabulary Metric */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={scores.clarity}
                            text={`${Math.round(scores.clarity)}%`}
                            styles={buildStyles({
                                pathColor: colors.clarity,
                                textColor: '#0f172a',
                                trailColor: '#f1f5f9',
                                textSize: '20px'
                            })}
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-800">Vocabulary</p>
                        <p className="text-sm text-slate-500">Avg. Score</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMetrics;