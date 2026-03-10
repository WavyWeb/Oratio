'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import AnimatedCircularBar from "../components/AnimatedCircularBar";
import DashboardLayout from "../components/DashboardLayout";
import "../components/bg.css";
import { useTheme } from "../context/ThemeContext";

export default function Analysis() {
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e2e8f0' : '#0f172a';
  const trailColor = isDark ? '#334155' : '#e2e8f0';

  useEffect(() => {
    const fetchReport = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const reportId = queryParams.get("id");

      // Legacy support: full object in URL
      const reportFromQuery = queryParams.get("report");
      if (reportFromQuery) {
        try {
          const parsedReport = JSON.parse(decodeURIComponent(reportFromQuery));
          setReport(parsedReport);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse report param", e);
        }
      }

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        router.push("/login");
        return;
      }

      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      // Fetch single report by ID if provided
      if (reportId) {
        try {
          const response = await fetch(`${API}/report/${encodeURIComponent(reportId)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error("Failed to fetch report");
          const data = await response.json();
          setReport(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
        return;
      }

      // Fallback: Fetch latest from API
      try {
        const response = await fetch(`${API}/user-reports-list?userId=${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const reports = await response.json();
        if (reports.length > 0) {
          setReport(reports[reports.length - 1]);
        } else {
          setError("No reports found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-slate-600 dark:text-slate-400 animate-pulse font-medium">Loading Report...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !report) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-rose-500 font-medium">{error || "Report not found."}</div>
        </div>
      </DashboardLayout>
    );
  }

  // Helper colors for the theme
  const colors = {
    vocab: "#f59e0b", // Amber
    voice: "#e11d48", // Rose
    faces: "#fb923c"  // Orange
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4 md:p-8 gap-8 pb-20">

        {/* HEADER */}
        <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            {report.title || "Analysis Report"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {report.context || "Session Report"} • {report.date || new Date().toLocaleDateString()}
          </p>
        </div>

        {/* SCORES SECTION */}
        <section>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
            SCORES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Vocabulary Score */}
            <div className="pro-card p-6 flex flex-col items-center">
              <AnimatedCircularBar
                className="w-32 h-32 mb-4"
                targetValue={report.scores?.vocabulary || 0}
                pathColor={colors.vocab}
                textColor={textColor}
                trailColor={trailColor}
              />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Vocabulary</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Richness & Relevance</p>
            </div>

            {/* Voice Score */}
            <div className="pro-card p-6 flex flex-col items-center">
              <AnimatedCircularBar
                className="w-32 h-32 mb-4"
                targetValue={report.scores?.voice || 0}
                pathColor={colors.voice}
                textColor={textColor}
                trailColor={trailColor}
              />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Voice Quality</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tone & Pacing</p>
            </div>

            {/* Expressions Score */}
            <div className="pro-card p-6 flex flex-col items-center">
              <AnimatedCircularBar
                className="w-32 h-32 mb-4"
                targetValue={report.scores?.expressions || 0}
                pathColor={colors.faces}
                textColor={textColor}
                trailColor={trailColor}
              />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Expressions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Engagement & Emotion</p>
            </div>

          </div>
        </section>

        {/* FEEDBACK SECTION */}
        <section>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-rose-500 rounded-full"></span>
            LLM-GENERATED FEEDBACK
          </h2>
          <div className="grid grid-cols-1 gap-6">

            {/* Vocabulary Report */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                <span>📚</span> Vocabulary Report
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {typeof report.vocabulary_report === 'string'
                  ? report.vocabulary_report
                  : report.vocabulary_report?.summary || "No vocabulary feedback available."}
              </p>
            </div>

            {/* Vocal Tone Report */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
                <span>🎙️</span> Vocal Tone Report
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {report.speech_report || "No vocal analysis available."}
              </p>
            </div>

            {/* Expression Report */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-3 flex items-center gap-2">
                <span>😊</span> Expression Report
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {report.expression_report || "No expression analysis available."}
              </p>
            </div>

          </div>
        </section>

        {/* TRANSCRIPTION SECTION */}
        <section>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-slate-800 dark:bg-slate-400 rounded-full"></span>
            FULL TRANSCRIPTION
          </h2>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-inner">
            <p className="text-slate-800 dark:text-slate-200 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {report.transcription || "No transcription available."}
            </p>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}