"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation";
import "../components/bg.css";
import DashboardLayout from "../components/DashboardLayout";

const UserReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Demo data to show when no reports exist
  const demoReports = [
    {
      _id: "demo1",
      title: "Public Speaking Practice - Intro",
      scores: { vocabulary: 78, voice: 85, expressions: 70 },
      date: "2024-03-10",
      context: "Practice Session",
      transcription: "Today I want to talk about the importance of effective communication. It is the bridge between confusion and clarity. When we speak with intent, we can move mountains. However, I noticed I was saying 'um' a lot during the transition phrases.",
      vocabulary_report: "Your vocabulary choice was generally strong, with words like 'intent' and 'clarity' adding weight. However, there were some filler words detected that reduced impact.",
      speech_report: "Your tone was enthusiastic and clear. The pacing was steady, though you could pause more for emphasis after key points.",
      expression_report: "Good eye contact and smiling throughout. Try to reduce looking down at notes to maintain better connection."
    },
    {
      _id: "demo2",
      title: "Quarterly Business Review",
      scores: { vocabulary: 92, voice: 65, expressions: 80 },
      date: "2024-03-12",
      context: "Professional Presentation",
      transcription: "Q1 results have exceeded expectations by 15%. This growth is driven by our new marketing channel optimization. Moving forward to Q2, we anticipate some headwinds in the supply chain but remain confident in our mitigation strategies.",
      vocabulary_report: "Excellent use of professional terminology. Terms like 'optimization', 'mitigation', and 'headwinds' were used correctly and effectively.",
      speech_report: "Your projection was a bit quiet at the start. Try to speak with more volume to command the room better. Tone was serious and appropriate.",
      expression_report: "You maintained a professional demeanor. Your facial expressions matched the serious nature of the data presented."
    },
    {
      _id: "demo3",
      title: "Wedding Toast Rehearsal",
      scores: { vocabulary: 88, voice: 90, expressions: 95 },
      date: "2024-03-15",
      context: "Social Speech",
      transcription: "To the happy couple! I've known John since we were five, and I've never seen him happier than he is with Sarah. May your life together be filled with laughter, joy, and endless adventure. Cheers!",
      vocabulary_report: "Warm and appropriate language for the occasion. The sentiment was clearly conveyed through your word choices.",
      speech_report: "Excellent emotional delivery. Your voice conveyed genuine happiness and warmth. Pacing was perfect for a toast.",
      expression_report: "Fantastic engagement. Your smile was genuine and infectious, creating a great connection with the audience."
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchReports = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API}/user-reports-list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error(err);
        // Fallback to empty array on error so we can show demo data if desired, 
        // or keep error state. For now, let's allow demo data to show on error/empty.
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Use demo reports if reports array is empty
  const displayReports = reports.length > 0 ? reports : demoReports;
  const isDemo = reports.length === 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-slate-600 animate-pulse">Loading reports...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full items-center justify-center p-6">
        <div className="w-full max-w-4xl space-y-6 min-h-[80vh]">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-rose-600">
              Your Reports
            </h1>
            {isDemo && (
              <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                Viewing Demo Data
              </span>
            )}
          </div>

          {displayReports.map((report) => (
            <div
              key={report._id}
              onClick={() => {
                const url = `/report?report=${encodeURIComponent(JSON.stringify(report))}`;
                router.push(url);
              }}
              className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-6 md:p-8"
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Title Section */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors mb-2">
                    {report.title || 'Untitled Session'}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {report.date || 'Recently Recorded'} • {report.context || 'General Context'}
                  </p>
                </div>

                {/* Metrics Section */}
                <div className="flex gap-4 md:gap-8 justify-center">
                  {/* Vocabulary */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20">
                      <CircularProgressbar
                        value={report.scores?.vocabulary || 0}
                        maxValue={100}
                        text={`${report.scores?.vocabulary || 0}`}
                        styles={buildStyles({
                          textColor: "#0f172a",
                          pathColor: "#f59e0b", // Amber
                          trailColor: "#f1f5f9",
                          textSize: "24px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Vocab</span>
                  </div>

                  {/* Voice */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20">
                      <CircularProgressbar
                        value={report.scores?.voice || 0}
                        maxValue={100}
                        text={`${report.scores?.voice || 0}`}
                        styles={buildStyles({
                          textColor: "#0f172a",
                          pathColor: "#e11d48", // Rose
                          trailColor: "#f1f5f9",
                          textSize: "24px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Voice</span>
                  </div>

                  {/* Expressions */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20">
                      <CircularProgressbar
                        value={report.scores?.expressions || 0}
                        maxValue={100}
                        text={`${report.scores?.expressions || 0}`}
                        styles={buildStyles({
                          textColor: "#0f172a",
                          pathColor: "#fb923c", // Orange
                          trailColor: "#f1f5f9",
                          textSize: "24px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Faces</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserReportsList;