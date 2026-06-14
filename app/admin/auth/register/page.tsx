'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleRegister } from '../actions';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('superadmin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak cocok');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

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

  if (!mounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${darkMode ? 'bg-[#121212]' : 'bg-[#FFFFFF]'}`}>
      {/* Ornamen dekoratif */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${darkMode ? 'bg-gray-800' : 'bg-[#FBCFE8]'} rounded-full mix-blend-multiply filter blur-3xl opacity-30`}></div>
      <button onClick={toggleDarkMode} className={`absolute top-4 right-4 px-4 py-2 text-sm font-semibold rounded-full transition-colors z-20 ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] hover:bg-[#3C3C3C]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className={`w-full max-w-md rounded-2xl border p-8 z-10 transition-colors ${darkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white shadow-lg border-[#FBCFE8]'}`}>
        <h1 className={`text-3xl font-bold font-serif text-center mb-6 transition-colors ${darkMode ? 'text-[#E1E1E1]' : 'text-[#36454F]'}`}>Daftar Admin</h1>
        
        {error && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
            {error}
          </div>
        )}

        {success && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${darkMode ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Username</label>
            <input 
              className={`w-full px-4 py-3 mt-1 rounded-xl border outline-none transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C] focus:border-[#FBCFE8] placeholder-[#6C6C6C]' : 'bg-white text-gray-900 border-[#FBCFE8] focus:border-[#F472B6] placeholder-gray-400'}`} 
              type="text" 
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mt-2 transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Role</label>
            <div className={`w-full px-4 py-3 mt-1 rounded-xl border transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C]' : 'bg-white text-gray-900 border-[#FBCFE8]'}`}>Super Admin</div>
            <input type="hidden" name="role" value="superadmin" />
          </div>
          <div>
            <label className={`block text-sm font-medium transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Password</label>
            <input 
              className={`w-full px-4 py-3 mt-1 rounded-xl border outline-none transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C] focus:border-[#FBCFE8] placeholder-[#6C6C6C]' : 'bg-white text-gray-900 border-[#FBCFE8] focus:border-[#F472B6] placeholder-gray-400'}`} 
              type="password" 
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={`block text-sm font-medium mt-4 transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>Konfirmasi Password</label>
            <input 
              className={`w-full px-4 py-3 mt-1 rounded-xl border outline-none transition-colors ${darkMode ? 'bg-[#2C2C2C] text-[#E1E1E1] border-[#3C3C3C] focus:border-[#FBCFE8] placeholder-[#6C6C6C]' : 'bg-white text-gray-900 border-[#FBCFE8] focus:border-[#F472B6] placeholder-gray-400'}`} 
              type="password" 
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold transition-colors disabled:opacity-50 ${darkMode ? 'bg-[#FBCFE8] hover:bg-[#F9A8D4] text-[#121212]' : 'bg-[#F472B6] hover:bg-[#EC4899] text-white'}`}
          >
            {loading ? 'Memproses...' : 'Buat Akun'}
          </button>
        </form>

        <div className={`mt-6 text-center text-sm transition-colors ${darkMode ? 'text-[#A0A0A0]' : 'text-[#4A4A4A]'}`}>
          Sudah punya akun? <Link href="/admin/auth/login" className={`font-semibold hover:underline ${darkMode ? 'text-[#FBCFE8]' : 'text-[#F472B6]'}`}>Login Admin</Link>
        </div>
      </div>
    </div>
  );
}