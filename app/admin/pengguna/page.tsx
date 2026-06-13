"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserCheck, UserCog, Search } from "lucide-react";

const adminTypes = [
  { key: 'superadmin', label: 'Superadmin' },
  { key: 'admin', label: 'Admin Biasa' },
];

export default function AdminPenggunaPage() {
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get('role') || 'superadmin';
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/pengguna?role=${selectedRole}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
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
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{roleLabel}</p>
            <h2 className="text-xl font-semibold text-slate-900">{loading ? 'Memuat...' : `${admins.length} Akun`}</h2>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {selectedRole}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="py-3 px-3">Nama</th>
                <th className="py-3 px-3">Username</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">Memuat...</td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">Belum ada akun untuk tipe ini.</td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="py-4 px-3 font-semibold text-slate-900">{admin.nama_lengkap || '-'}</td>
                    <td className="py-4 px-3 text-slate-600">{admin.username}</td>
                    <td className="py-4 px-3 text-slate-600">{admin.email || '-'}</td>
                    <td className="py-4 px-3 text-slate-600">{admin.is_aktif ? 'Aktif' : 'Nonaktif'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
