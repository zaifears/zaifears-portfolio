"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/password-protect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // If the password is correct, redirect to the live-text page
        router.push('/live-text');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
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
        />
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Unlock
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </section>
  );
}