"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileCard() {
  const router = useRouter();
  const [user, setUser] = useState({ name: 'Guest', email: '', sessions: 0 });

  useEffect(() => {
    const rawUsername = localStorage.getItem('username');
    const username = rawUsername && rawUsername !== 'undefined' && rawUsername !== 'null' ? rawUsername : 'Guest';
    const rawEmail = localStorage.getItem('email');
    const email = rawEmail && rawEmail !== 'undefined' && rawEmail !== 'null' ? rawEmail : '';
    const rawUserId = localStorage.getItem('userId');
    const userId = rawUserId && rawUserId !== 'undefined' && rawUserId !== 'null' && rawUserId.trim() !== '' ? rawUserId : null;
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

    async function fetchCount() {
      if (!userId) {
        // no valid user id in localStorage — show fallback profile
        setUser({ name: username, email, sessions: 0 });
        return;
      }
      try {
        const res = await fetch(`${API}/user-reports-list?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) {
          setUser({ name: username, email, sessions: 0 });
          return;
        }
        const data = await res.json();
        setUser({ name: username, email, sessions: Array.isArray(data) ? data.length : 0 });
      } catch (e) {
        setUser({ name: username, email, sessions: 0 });
      }
    }

    fetchCount();
  }, []);

  return (
    <div className="pro-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-100 to-rose-100 flex items-center justify-center text-2xl font-semibold text-rose-600 shadow-sm border border-rose-100">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="flex flex-col">
          <div className="text-slate-900 text-lg font-bold leading-tight">{user.name}</div>
          <div className="text-sm muted-text mt-1">Recorded Sessions: <span className="text-slate-700 font-medium">{user.sessions}</span></div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={() => router.push('/profile')}
          className="px-4 py-2 bg-white border border-gray-200 hover:border-amber-500 hover:text-amber-600 text-gray-600 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
