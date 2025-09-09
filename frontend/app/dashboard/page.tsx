// app/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner';
import { ScanForm } from '@/components/ScanForm'; // We will create this next

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  // If auth state is still loading, show a spinner
  if (user === undefined) {
    return <Spinner />;
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    router.push('/login');
    return <Spinner />; // Show spinner while redirecting
  }

  // If user is logged in, show the dashboard
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {user.displayName}!
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* The form for submitting scans will go here */}
        <ScanForm />

        {/* A placeholder for the scan history */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800">
            Scan History
          </h2>
          <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500">Your past scans will appear here.</p>
          </div>
        </div>
      </div>
    </main>
  );
}