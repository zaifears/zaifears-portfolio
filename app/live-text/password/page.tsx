"use client";  
  
import { useState } from 'react';  
import { useRouter } from 'next/navigation';  
import { validatePassword, sanitizeInput } from '../../utils/validation';  
  
export default function PasswordPage() {  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const router = useRouter();  
  
  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
      
    const sanitizedPassword = sanitizeInput(password);  
    const validationError = validatePassword(sanitizedPassword);  
      
    if (validationError) {  
      setError(validationError);  
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
        credentials: 'include',  
        body: JSON.stringify({ password: sanitizedPassword }),  
      });  
  
      const data = await response.json();  
  
      if (response.ok && data.success) {  
        setTimeout(() => {  
          router.push('/live-text');  
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
      <div className="text-6xl mb-6">🔒</div>  
      <h1 className="font-bold text-3xl md:text-4xl mb-4">Enter Password</h1>  
      <p className="text-neutral-400 mb-8">This page is password protected.</p>  
        
      <form onSubmit={handleSubmit} className="w-full max-w-sm">  
        <input  
          type="password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          className="w-full px-4 py-2 mb-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"  
          placeholder="Password"  
          disabled={isLoading}  
          autoFocus  
        />  
        <button  
          type="submit"  
          disabled={isLoading || !password.trim()}  
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"  
        >  
          {isLoading ? (  
            <span className="flex items-center justify-center">  
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>  
              Unlocking...  
            </span>  
          ) : (  
            'Unlock'  
          )}  
        </button>  
        {error && (  
          <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">  
            <p className="text-red-400 text-sm">{error}</p>  
          </div>  
        )}  
      </form>  
    </section>  
  );  
}  