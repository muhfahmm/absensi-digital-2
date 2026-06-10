'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleRegister } from '../actions';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await handleRegister(formData);
      if (res && res.error) {
        setError(res.error);
      } else {
        setSuccess('Pendaftaran berhasil! Mengalihkan ke halaman login...');
        setTimeout(() => {
          router.push('/admin/auth/login');
        }, 1500);
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem saat mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] p-4 relative overflow-hidden">
      {/* Ornamen dekoratif */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FBCFE8] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FBCFE8] p-8 z-10">
        <h1 className="text-3xl font-bold text-[#36454F] font-serif text-center mb-6">Daftar Admin</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-sm font-medium text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Username</label>
            <input 
              className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Password</label>
            <input 
              className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#F472B6] hover:bg-[#EC4899] disabled:opacity-50 text-white py-3 rounded-full font-semibold transition"
          >
            {loading ? 'Memproses...' : 'Buat Akun'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#4A4A4A]">
          Sudah punya akun? <Link href="/admin/auth/login" className="text-[#F472B6] font-semibold hover:underline">Login Admin</Link>
        </div>
      </div>
    </div>
  );
}