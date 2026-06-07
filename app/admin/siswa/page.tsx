"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function AdminSiswaPage() {
  const [siswa, setSiswa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/siswa")
      .then(res => res.json())
      .then(data => {
        setSiswa(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load siswa:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Users size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Manajemen Pengguna</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Data Siswa</h1>
          <p className="text-xs text-muted">Kelola data siswa dan alokasi kelas secara menyeluruh.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Siswa</span>
        </button>
      </section>

      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari data siswa..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">NIS</th>
                <th className="pb-3">Nama Siswa</th>
                <th className="pb-3">Kelas</th>
                <th className="pb-3">Telepon</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : siswa.length === 0 ? (
                <tr><td colSpan={6} className="py-4 text-center text-slate-500">Belum ada siswa yang terdaftar.</td></tr>
              ) : siswa.map((s, idx) => (
                <tr key={idx} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-mono font-bold text-accent-dark">{s.nis}</td>
                  <td className="py-4 font-bold text-primary text-sm">{s.nama_lengkap}</td>
                  <td className="py-4 font-semibold text-slate-600">{s.nama_kelas || '-'}</td>
                  <td className="py-4 font-semibold text-slate-600">{s.telepon_ortu || '-'}</td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-bold ${s.is_aktif ? 'bg-wedding-sage/15 border border-wedding-sage/30 text-wedding-sage' : 'bg-slate-100 border border-slate-300 text-slate-500'}`}>
                      {s.is_aktif ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
