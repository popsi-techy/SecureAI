// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext'; // Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plugin Security Scanner',
  description: 'Scan your plugins for vulnerabilities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider> {/* Wrap children here */}
      </body>
    </html>
  );
}