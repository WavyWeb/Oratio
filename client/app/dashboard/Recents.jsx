"use client";
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import AnimatedCircularBar from '../components/AnimatedCircularBar';
import Link from 'next/link';
import '../components/bg.css';
import { useRouter } from 'next/navigation';
import { useDashboardData } from '../context/DashboardDataContext';
import { useTheme } from '../context/ThemeContext';

const RecentSessions = () => {
  const router = useRouter();
  const { reports } = useDashboardData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e2e8f0' : '#0f172a';
  const trailColor = isDark ? '#334155' : '#f1f5f9';
  const reportsPerPage = 5;

  // Demo data matching the reports page
  const demoReports = [
    {
      _id: "demo1",
      title: "Public Speaking Practice - Intro",
      scores: { vocabulary: 78, voice: 85, expressions: 70 },
      date: "2024-03-10",
      context: "Practice Session",
    },
    {
      _id: "demo2",
      title: "Quarterly Business Review",
      scores: { vocabulary: 92, voice: 65, expressions: 80 },
      date: "2024-03-12",
      context: "Professional Presentation",
    },
    {
      _id: "demo3",
      title: "Wedding Toast Rehearsal",
      scores: { vocabulary: 88, voice: 90, expressions: 95 },
      date: "2024-03-15",
      context: "Social Speech",
    }
  ];

  // Use demo reports if no user reports
  const displayReports = reports.length > 0 ? reports : demoReports;
  const isDemo = reports.length === 0;

  const currentReports = displayReports.slice(0, reportsPerPage);

  const handleRowClick = (report) => {
    router.push(`/report?id=${report._id}`);
  };

  const colors = {
    voice: "#e11d48", // Rose
    faces: "#fb923c", // Orange
    vocab: "#f59e0b"  // Amber
  };

  return (
    <div className='flex flex-col w-full'>
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Recent Sessions
        </h3>
        <Link href="/allreports" className="text-sm font-medium text-rose-600 dark:text-orange-400 hover:text-rose-700 dark:hover:text-orange-300 hover:underline">
          View All
        </Link>
      </div>

      <div className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Session Info</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Voice</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Expressions</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Vocabulary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {currentReports.map((report) => (
              <tr
                key={report._id}
                onClick={() => handleRowClick(report)}
                className="hover:bg-amber-50/30 dark:hover:bg-amber-500/5 transition-colors duration-200 cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-orange-400 transition-colors">
                      {report.title || 'Untitled Session'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {report.date || 'Recently Recorded'} • {report.context || 'General'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <AnimatedCircularBar
                    className="w-10 h-10 mx-auto"
                    targetValue={report.scores?.voice || 0}
                    pathColor={colors.voice}
                    textColor={textColor}
                    trailColor={trailColor}
                    textSize="26px"
                    duration={800}
                  />
                </td>
                <td className="px-6 py-4">
                  <AnimatedCircularBar
                    className="w-10 h-10 mx-auto"
                    targetValue={report.scores?.expressions || 0}
                    pathColor={colors.faces}
                    textColor={textColor}
                    trailColor={trailColor}
                    textSize="26px"
                    duration={800}
                  />
                </td>
                <td className="px-6 py-4">
                  <AnimatedCircularBar
                    className="w-10 h-10 mx-auto"
                    targetValue={report.scores?.vocabulary || 0}
                    pathColor={colors.vocab}
                    textColor={textColor}
                    trailColor={trailColor}
                    textSize="26px"
                    duration={800}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentReports.length === 0 && !isDemo && (
          <div className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No sessions recorded yet.</p>
            <Link href="/session">
              <button className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
                Start First Session
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentSessions;