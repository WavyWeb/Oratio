"use client";
import DashboardLayout from '../components/DashboardLayout';
import PerformanceChart from '../components/PerformanceChart';
import PerformanceMetrics from '../components/OverallScore';
import RecentSessions from './Recents';
import ProfileCard from '../components/ProfileCard';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../components/bg.css';

export default function Dashboard() {
    const router = useRouter();
    const { userId } = useParams();
    const [localUserId, setLocalUserId] = useState('');

    // Fetch userId from local storage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setLocalUserId(storedUserId);
        }
    }, [router]);

    return (
        <DashboardLayout>
            <div className="w-full">
                <ProfileCard />
            </div>

            {/* Chart and metrics underneath profile */}
            <div className="w-full mt-4">
                {/* Chart full width */}
                <div className="pro-card p-6">
                    <PerformanceChart />
                </div>

                {/* Indicators row underneath chart (centered) */}
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-6 items-center flex-wrap max-w-4xl justify-center">
                        <PerformanceMetrics userId={localUserId} />
                    </div>
                </div>
            </div>

            <div className="w-full mt-6">
                <RecentSessions />
            </div>
        </DashboardLayout>
    );
}