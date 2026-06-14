'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('antigravity_theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('antigravity_theme', newMode ? 'dark' : 'light');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/admin/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // or a simple placeholder while theme loads
  }

    return (
      <div suppressHydrationWarning className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${darkMode ? 'bg-[#121212]' : 'bg-[#FFFFFF]'}`}>
      {/* Ornamen dekoratif bunga abstrak */}
      <div className={`absolute top-0 left-0 w-64 h-64 ${darkMode ? 'bg-gray-800' : 'bg-[#F4C2C2]'} rounded-full mix-blend-multiply filter blur-3xl opacity-30`}></div>
      <button onClick={toggleDarkMode} className={`absolute top-4 right-4 px-4 py-2 text-sm font-semibold rounded-full transition-colors z-20 ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] hover:bg-[#3C3C3C]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className={`w-full max-w-md rounded-2xl border p-8 z-10 transition-colors ${darkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white shadow-lg border-[#FBCFE8]'}`}>
        <h1 className={`text-3xl font-bold font-serif text-center mb-6 transition-colors ${darkMode ? 'text-[#E1E1E1]' : 'text-[#36454F]'}`}>Login</h1>
        
        {error && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Username</label>
            <input 
              className={`w-full px-4 py-3 mt-1 rounded-xl border outline-none transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C] focus:border-[#FDE68A] placeholder-[#6C6C6C]' : 'bg-white text-gray-900 border-[#FBCFE8] focus:border-[#D4AF37] placeholder-gray-400'}`} 
              type="text" 
              placeholder="Masukkan username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Password</label>
            <input 
              className={`w-full px-4 py-3 mt-1 rounded-xl border outline-none transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C] focus:border-[#FDE68A] placeholder-[#6C6C6C]' : 'bg-white text-gray-900 border-[#FBCFE8] focus:border-[#D4AF37] placeholder-gray-400'}`} 
              type="password" 
              placeholder="Masukkan password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold transition-colors disabled:opacity-50 ${darkMode ? 'bg-[#FDE68A] hover:bg-[#FCD34D] text-[#121212]' : 'bg-[#D4AF37] hover:bg-[#a07c2e] text-white'}`}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className={`mt-6 text-center text-sm transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>
          Belum punya akun? <Link href="/admin/auth/register" className={`font-semibold hover:underline ${darkMode ? 'text-[#FDE68A]' : 'text-[#D4AF37]'}`}>Register Admin</Link>
        </div>
      </div>
    </div>

    );
  }
