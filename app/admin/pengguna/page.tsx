"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserCheck, UserCog, Search, Plus, X } from "lucide-react";

const adminTypes = [
  { key: 'superadmin', label: 'Superadmin' },
  { key: 'admin', label: 'Admin Biasa' },
];

export default function AdminPenggunaPage() {
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get('role') || 'superadmin';
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    nama_lengkap: '',
    password: '',
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/admin/api/pengguna?role=${selectedRole}`, { credentials: 'include' });
        if (!res.ok) {
          let errMsg = res.statusText;
          try {
            const j = await res.json();
            errMsg = j?.error || errMsg;
          } catch (_) {
            const t = await res.text();
            if (t) errMsg = t;
          }
          throw new Error(errMsg);
        }
        const json = await res.json();
        setAdmins(json.admins || []);
      } catch (err) {
        console.error("Failed to load admins:", err);
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [selectedRole]);

  const roleLabel = adminTypes.find((type) => type.key === selectedRole)?.label || 'Admin';

  const openAddModal = () => {
    setFormError('');
    setFormData({ username: '', nama_lengkap: '', password: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitLoading(true);

    try {
      const res = await fetch('/admin/api/pengguna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData })
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Gagal menambahkan admin');
      }

      setIsModalOpen(false);
      setFormData({ username: '', nama_lengkap: '', password: '' });
      const refresh = await fetch(`/admin/api/pengguna?role=${selectedRole}`, { credentials: 'include' });
      const refreshed = await refresh.json();
      setAdmins(refreshed.admins || []);
    } catch (error: any) {
      setFormError(error.message || 'Gagal menambahkan admin');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease]">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
              <UserCog size={16} />
              Superadmin only
            </div>
            <h1 className="mt-4 text-3xl font-serif font-bold text-slate-900">Daftar Akun Admin</h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Halaman ini menampilkan semua akun admin dengan tipe {roleLabel.toLowerCase()}.
            </p>
          </div>
          <div className="max-w-sm">
            <label className="relative block">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Cari admin..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-slate-400"
                disabled
              />
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{roleLabel}</p>
            <h2 className="text-xl font-semibold text-slate-900">{loading ? 'Memuat...' : `${admins.length} Akun`}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1e3a5f] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17354d]"
            >
              <Plus size={14} />
              Tambah Admin Biasa
            </button>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {selectedRole}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="py-3 px-3">Nama</th>
                <th className="py-3 px-3">Username</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-slate-500">Memuat...</td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-slate-500">Belum ada akun untuk tipe ini.</td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="py-4 px-3 font-semibold text-slate-900">{admin.nama_lengkap || '-'}</td>
                    <td className="py-4 px-3 text-slate-600">{admin.username}</td>
                    <td className="py-4 px-3 text-slate-600">{admin.is_aktif ? 'Aktif' : 'Nonaktif'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tambah Admin Biasa</p>
                <h2 className="text-2xl font-semibold text-slate-900">Buat Akun Admin Baru</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {formError && (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                  {formError}
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Username
                  <input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1e3a5f]"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Nama Lengkap
                  <input
                    value={formData.nama_lengkap}
                    onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1e3a5f]"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Password
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1e3a5f]"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="rounded-2xl bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#17354d] disabled:opacity-60"
                >
                  {submitLoading ? 'Menyimpan...' : 'Buat Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
