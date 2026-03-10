"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [overallScores, setOverallScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const rawUserId = localStorage.getItem('userId');
    const uid = rawUserId && rawUserId !== 'undefined' && rawUserId !== 'null' && rawUserId.trim() !== '' ? rawUserId : null;
    setUserId(uid);

    if (!uid) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
    const headers = { 'Authorization': `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/user-reports-list?userId=${encodeURIComponent(uid)}`, { headers }).then(r => r.ok ? r.json() : []),
      fetch(`${API}/user-reports?userId=${encodeURIComponent(uid)}`, { headers }).then(r => r.ok ? r.json() : null),
    ])
      .then(([reportsList, overall]) => {
        setReports(Array.isArray(reportsList) ? reportsList : []);
        setOverallScores(overall);
      })
      .catch((err) => {
        console.error('DashboardDataContext fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardDataContext.Provider value={{ reports, overallScores, loading, userId }}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) throw new Error('useDashboardData must be used within DashboardDataProvider');
  return ctx;
}
