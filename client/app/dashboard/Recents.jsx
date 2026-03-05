"use client";
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';
import '../components/bg.css';
import { useRouter } from 'next/navigation';

const RecentSessions = ({ sessions }) => {
  const router = useRouter();
  const [userReports, setUserReports] = useState([]);
  const reportsPerPage = 5;

  // Demo data matching the reports page
  const demoReports = [
    {
      _id: "demo1",
      title: "Public Speaking Practice - Intro",
      scores: { vocabulary: 78, voice: 85, expressions: 70 },
      date: "2024-03-10",
      context: "Practice Session",
      transcription: "Today I want to talk about the importance of effective communication...",
      vocabulary_report: "Your vocabulary choice was generally strong...",
      speech_report: "Your tone was enthusiastic and clear...",
      expression_report: "Good eye contact and smiling throughout..."
    },
    {
      _id: "demo2",
      title: "Quarterly Business Review",
      scores: { vocabulary: 92, voice: 65, expressions: 80 },
      date: "2024-03-12",
      context: "Professional Presentation",
      transcription: "Q1 results have exceeded expectations by 15%...",
      vocabulary_report: "Excellent use of professional terminology...",
      speech_report: "Your projection was a bit quiet at the start...",
      expression_report: "You maintained a professional demeanor..."
    },
    {
      _id: "demo3",
      title: "Wedding Toast Rehearsal",
      scores: { vocabulary: 88, voice: 90, expressions: 95 },
      date: "2024-03-15",
      context: "Social Speech",
      transcription: "To the happy couple! I've known John since we were five...",
      vocabulary_report: "Warm and appropriate language...",
      speech_report: "Excellent emotional delivery...",
      expression_report: "Fantastic engagement..."
    }
  ];

  useEffect(() => {
    const fetchUserReports = async () => {
      const rawUserId = localStorage.getItem('userId');
      const userId = rawUserId && rawUserId !== 'undefined' && rawUserId !== 'null' && rawUserId.trim() !== '' ? rawUserId : null;
      if (!userId) {
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:5000` : 'http://127.0.0.1:5000');
        const response = await fetch(`${API}/user-reports-list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUserReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchUserReports();
  }, []);

  // Use demo reports if no user reports
  const displayReports = userReports.length > 0 ? userReports : demoReports;
  const isDemo = userReports.length === 0;

  const currentReports = displayReports.slice(0, reportsPerPage);

  const handleRowClick = (report) => {
    router.push(`/report?report=${encodeURIComponent(JSON.stringify(report))}`);
  };

  const colors = {
    voice: "#e11d48", // Rose
    faces: "#fb923c", // Orange
    vocab: "#f59e0b"  // Amber
  };

  return (
    <div className='flex flex-col w-full'>
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-xl font-bold text-slate-800">
          Recent Sessions
          {isDemo && <span className="ml-3 text-xs font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full border border-amber-200">Demo Data</span>}
        </h3>
        <Link href="/allreports" className="text-sm font-medium text-rose-600 hover:text-rose-700 hover:underline">
          View All
        </Link>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Session Info</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Voice</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Expressions</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Vocabulary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentReports.map((report) => (
              <tr
                key={report._id}
                onClick={() => handleRowClick(report)}
                className="hover:bg-amber-50/30 transition-colors duration-200 cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 group-hover:text-rose-600 transition-colors">
                      {report.title || 'Untitled Session'}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {report.date || 'Recently Recorded'} • {report.context || 'General'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-10 h-10 mx-auto">
                    <CircularProgressbar
                      value={report.scores?.voice || 0}
                      text={`${report.scores?.voice || 0}`}
                      styles={buildStyles({
                        pathColor: colors.voice,
                        textColor: '#0f172a',
                        trailColor: '#f1f5f9',
                        textSize: '26px'
                      })}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-10 h-10 mx-auto">
                    <CircularProgressbar
                      value={report.scores?.expressions || 0}
                      text={`${report.scores?.expressions || 0}`}
                      styles={buildStyles({
                        pathColor: colors.faces,
                        textColor: '#0f172a',
                        trailColor: '#f1f5f9',
                        textSize: '26px'
                      })}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-10 h-10 mx-auto">
                    <CircularProgressbar
                      value={report.scores?.vocabulary || 0}
                      text={`${report.scores?.vocabulary || 0}`}
                      styles={buildStyles({
                        pathColor: colors.vocab,
                        textColor: '#0f172a',
                        trailColor: '#f1f5f9',
                        textSize: '26px'
                      })}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentReports.length === 0 && !isDemo && (
          <div className="p-8 text-center">
            <p className="text-slate-500 mb-4">No sessions recorded yet.</p>
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