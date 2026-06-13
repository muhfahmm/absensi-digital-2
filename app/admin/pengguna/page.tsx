"use client";

import React, { useEffect, useState } from "react";
import { UserCheck, UserCog, Users, Search } from "lucide-react";

export default function AdminPenggunaPage() {
  const [data, setData] = useState<{ admins: any[]; gurus: any[] }>({ admins: [], gurus: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pengguna")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText || 'Gagal memuat data');
        }
        return res.json();
      })
      .then((json) => {
        setData({ admins: json.admins || [], gurus: json.gurus || [] });
      })
      .catch((err) => {
        console.error("Failed to load pengguna:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease]">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
              <UserCog size={16} />
              Superadmin only
            </div>
            <h1 className="mt-4 text-3xl font-serif font-bold text-slate-900">Daftar Guru & Admin</h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Halaman ini menampilkan semua data guru dan akun admin yang terdaftar dalam sistem.
            </p>
          </div>
          <div className="max-w-sm">
            <label className="relative block">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Cari pengguna..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Terdaftar</p>
              <h2 className="text-xl font-semibold text-slate-900">{loading ? 'Memuat...' : `${data.admins.length} Akun Admin`}</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="py-3 px-3">Nama</th>
                  <th className="py-3 px-3">Username</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">Memuat daftar admin...</td>
                  </tr>
                ) : data.admins.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">Belum ada akun admin.</td>
                  </tr>
                ) : (
                  data.admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="py-4 px-3 font-semibold text-slate-900">{admin.nama_lengkap || '-'}</td>
                      <td className="py-4 px-3 text-slate-600">{admin.username}</td>
                      <td className="py-4 px-3 text-slate-600">{admin.role}</td>
                      <td className="py-4 px-3 text-slate-600">{admin.is_aktif ? 'Aktif' : 'Nonaktif'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Guru Terdaftar</p>
              <h2 className="text-xl font-semibold text-slate-900">{loading ? 'Memuat...' : `${data.gurus.length} Guru`}</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="py-3 px-3">NIP</th>
                  <th className="py-3 px-3">Nama</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">Memuat daftar guru...</td>
                  </tr>
                ) : data.gurus.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">Belum ada data guru.</td>
                  </tr>
                ) : (
                  data.gurus.map((guru) => (
                    <tr key={guru.id}>
                      <td className="py-4 px-3 font-semibold text-slate-900">{guru.nip}</td>
                      <td className="py-4 px-3 text-slate-600">{guru.nama_lengkap}</td>
                      <td className="py-4 px-3 text-slate-600">{guru.email || '-'}</td>
                      <td className="py-4 px-3 text-slate-600">{guru.is_aktif ? 'Aktif' : 'Nonaktif'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
