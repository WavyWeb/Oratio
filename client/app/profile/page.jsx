"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../components/bg.css';

import DashboardLayout from '../components/DashboardLayout';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('username');
    const rawId = localStorage.getItem('userId');
    setUsername(raw && raw !== 'undefined' ? raw : '');
    setUserId(rawId && rawId !== 'undefined' ? rawId : null);
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!userId) {
      setStatus({ type: 'error', message: 'No userId available' });
      return;
    }
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/auth/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, username }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Update failed');
      // update localStorage
      localStorage.setItem('username', j.username || username);
      setStatus({ type: 'success', message: 'Profile updated' });
      setTimeout(() => router.push('/dashboard'), 900);
    } catch (err) {
      setStatus({ type: 'error', message: String(err) });
    }
  }

  return (
    <DashboardLayout>
      <div className="static-bg w-full flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="max-w-3xl w-full mx-auto fade-in">
          <div className="pro-card p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold gradient-text mb-6">Edit Profile</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-200 block mb-2">Username</label>
                  <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-3.5 glass border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-200 hover:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-200 block mb-2">Email (read-only)</label>
                  <input
                    value={userId || ''}
                    readOnly
                    className="w-full p-3.5 glass border border-white/20 rounded-xl text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-2.5 btn-gradient text-white rounded-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95">Save</button>
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-2.5 glass border border-white/20 text-white rounded-xl hover:border-white/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
                {status && (
                  <div className={`text-sm p-3 rounded-xl ${status.type === 'error' ? 'text-red-400 glass border border-red-500/30' : 'text-green-400 glass border border-green-500/30'}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
