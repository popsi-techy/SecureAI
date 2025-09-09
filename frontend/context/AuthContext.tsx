// context/AuthContext.tsx
'use client'; // This is a client component

import React, { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Spinner } from '@/components/Spinner'; // We'll create this component

// Define the type for our context's value
type AuthContextType = {
  user: User | null;
};

// Create the context
const AuthContext = createContext<AuthContextType>({ user: null });

// Create the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show a loading spinner while checking auth status
  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useAuth = () => useContext(AuthContext);