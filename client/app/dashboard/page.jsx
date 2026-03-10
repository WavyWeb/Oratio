"use client";
import dynamic from 'next/dynamic';
import DashboardLayout from '../components/DashboardLayout';
import { DashboardDataProvider } from '../context/DashboardDataContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../components/bg.css';

const PerformanceChart = dynamic(() => import('../components/PerformanceChart'), { ssr: false });
const PerformanceMetrics = dynamic(() => import('../components/OverallScore'), { ssr: false });
const RecentSessions = dynamic(() => import('./Recents'), { ssr: false });

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
    }, [router]);

    return (
        <DashboardDataProvider>
            <DashboardLayout>
                {/* Chart and metrics underneath profile */}
                <div className="w-full mt-4">
                    {/* Chart full width */}
                    <div className="pro-card p-6">
                        <PerformanceChart />
                    </div>

                    {/* Indicators row underneath chart (centered) */}
                    <div className="mt-6 flex justify-center">
                        <div className="flex gap-6 items-center flex-wrap max-w-4xl justify-center">
                            <PerformanceMetrics />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-6">
                    <RecentSessions />
                </div>
            </DashboardLayout>
        </DashboardDataProvider>
    );
}