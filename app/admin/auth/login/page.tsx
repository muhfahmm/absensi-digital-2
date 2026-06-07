'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] p-4 relative overflow-hidden">
      {/* Ornamen dekoratif bunga abstrak */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#F4C2C2] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FBCFE8] p-8 z-10">
        <h1 className="text-3xl font-bold text-[#36454F] font-serif text-center mb-6">Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Username</label>
            <input 
              className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Password</label>
            <input 
              className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#a07c2e] disabled:opacity-50 text-white py-3 rounded-full font-semibold transition"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#4A4A4A]">
          Belum punya akun? <Link href="/admin/auth/register" className="text-[#D4AF37] font-semibold hover:underline">Register Admin</Link>
        </div>
      </div>
    </div>
  );
}