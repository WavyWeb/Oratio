"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  History,
  Plus,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText
} from "lucide-react";
import "./bg.css";

// NavItem Component
const NavItem = ({ href, icon, label, collapsed, isActiveOverride }) => {
  const pathname = usePathname();
  const isActive = isActiveOverride || pathname === href;

  return (
    <Link href={href} className="block mb-1 group">
      <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isActive ? 'bg-amber-50 dark:bg-amber-500/10 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>

        {/* Active Indicator (Left Strip) */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-gradient-to-b from-amber-400 to-rose-400 rounded-r-full" />
        )}

        <div className={`relative flex items-center p-2.5 text-sm font-medium transition-all duration-300 ${collapsed ? "justify-center" : "space-x-3"}`}>
          <div className={`transition-all duration-300 ${isActive ? 'text-rose-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
            {React.cloneElement(icon, {
              className: `w-5 h-5`,
              strokeWidth: isActive ? 2.5 : 2
            })}
          </div>

          {!collapsed && (
            <span className={`whitespace-nowrap truncate max-w-[170px] transition-all duration-300 ${isActive ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
              {label}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [sessions, setSessions] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Demo data matching Recents.jsx but strictly for Sidebar linking
  const demoSessions = [
    {
      _id: "demo1",
      title: "Public Speaking Practice",
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
    },
    {
      _id: "demo4",
      title: "Sales Pitch v1",
      scores: { vocabulary: 81, voice: 75, expressions: 85 },
      date: "2024-03-18",
      context: "Sales Pitch",
      transcription: "Our product offers a unique solution...",
      vocabulary_report: "Good persuasive language used...",
      speech_report: "Pacing was good, could be more energetic...",
      expression_report: "Confident body language..."
    },
    {
      _id: "demo5",
      title: "Team Sync Update",
      scores: { vocabulary: 85, voice: 80, expressions: 75 },
      date: "2024-03-20",
      context: "Team Sync",
      transcription: "This week we are focusing on...",
      vocabulary_report: "Clear and concise updates...",
      speech_report: "Good volume and clarity...",
      expression_report: "Engaged with the team..."
    },
  ];

  useEffect(() => {
    const fetchSessions = async () => {
      const rawUserId = localStorage.getItem('userId');
      const userId = rawUserId && rawUserId !== 'undefined' && rawUserId !== 'null' && rawUserId.trim() !== '' ? rawUserId : null;

      if (!userId) {
        setSessions(demoSessions);
        setIsDemo(true);
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:5000` : 'http://127.0.0.1:5000');
        const response = await fetch(`${API}/user-reports-list?userId=${encodeURIComponent(userId)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        if (data && data.length > 0) {
          // Sort by date descending if not already
          setSessions(data.slice(0, 10)); // Show top 10
          setIsDemo(false);
        } else {
          setSessions(demoSessions);
          setIsDemo(true);
        }
      } catch (error) {
        console.error('Sidebar fetch error:', error);
        setSessions(demoSessions);
        setIsDemo(true);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="h-full pt-16 pointer-events-none">
      <aside
        className={`fixed left-0 h-[calc(100vh-80px)] pointer-events-auto transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700
          shadow-lg z-30 flex flex-col
          ${isOpen ? "w-72" : "w-20"}`}
        style={{ top: "80px" }}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-3 border-b border-gray-100 dark:border-slate-700">
          <button
            onClick={toggleSidebar}
            className="group p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col pt-4 px-3">

          {/* Header if Open */}
          {isOpen && (
            <div className="mb-3 px-2 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Your Reports
              </h3>
            </div>
          )}

          {/* List */}
          <div className="space-y-1">
            {sessions.map((session, idx) => (
              <NavItem
                key={session._id}
                href={`/report?id=${session._id}`}
                icon={<MessageSquare size={18} />}
                label={session.title || `Session ${idx + 1}`}
                collapsed={!isOpen}
                isActiveOverride={pathname.includes('report') && searchParams.get('id') === session._id}
              />
            ))}
          </div>

          {/* View All / History Link */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
            <NavItem
              href="/allreports"
              icon={<History size={20} />}
              label="View All History"
              collapsed={!isOpen}
            />
          </div>
        </div>

        {/* Bottom Section: New Session */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50/30 dark:bg-slate-900/50">
          <Link href="/session" className="block group">
            {isOpen ? (
              <button className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 p-[1px] shadow-md shadow-rose-500/20 transition-all hover:shadow-lg hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98]">
                <div className="relative bg-white dark:bg-slate-900 rounded-[11px] hover:bg-opacity-95 transition-colors">
                  <div className="flex items-center justify-center space-x-2 py-2.5 px-4">
                    <Plus size={18} className="text-rose-500" />
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">New Session</span>
                  </div>
                </div>
              </button>
            ) : (
              <button className="w-full h-12 flex justify-center items-center rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-500/30 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-300 transition-all shadow-sm">
                <Plus size={24} />
              </button>
            )}
          </Link>
        </div>
      </aside>
    </div>
  );
}