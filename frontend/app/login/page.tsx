// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (user) {
    // If user is already logged in, redirect them
    router.push('/dashboard');
    return null; // Render nothing while redirecting
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Scanner</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to continue
        </p>
        <button
          onClick={handleSignIn}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In with Google
        </button>
      </div>
    </main>
  );
}