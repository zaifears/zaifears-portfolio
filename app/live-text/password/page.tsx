"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/password-protect', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Small delay to ensure cookie is set
        setTimeout(() => {
          router.push('/live-text');
          // Force a page refresh to ensure middleware picks up the cookie
          router.refresh();
        }, 100);
      } else {
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err) {
      console.error('Password submission error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
      <h1 className="font-bold text-3xl md:text-4xl mb-4">Enter Password</h1>
      <p className="text-neutral-400 mb-8">This page is password protected.</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Unlocking...' : 'Unlock'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </section>
  );
}