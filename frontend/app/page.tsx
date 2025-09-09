// app/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { auth } from '@/lib/firebase'; // Import auth for sign out

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Plugin Security Scanner</h1>
        {user ? (
          <div>
            <p className="text-xl mb-4">
              Welcome back, {user.displayName || 'Developer'}!
            </p>
            <Link href="/dashboard">
              <span className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors mr-4">
                Go to Dashboard
              </span>
            </Link>
            <button
              onClick={() => auth.signOut()}
              className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl mb-4">
              Please sign in to scan your plugins.
            </p>
            <Link href="/login">
              <span className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Go to Login
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}