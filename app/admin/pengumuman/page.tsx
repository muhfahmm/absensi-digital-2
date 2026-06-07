"use client";

import React, { useState } from "react";
import { Bell, Plus, Edit2, Trash2, Calendar, Search } from "lucide-react";

export default function PengumumanPage() {
  const [pengumuman, setPengumuman] = useState([
    { id: 1, judul: "Libur Semester Ganjil 2026/2027", target: "Semua", tanggal: "2026-06-05", status: "Aktif" },
    { id: 2, judul: "Pembagian Rapor Hasil Belajar", target: "Siswa", tanggal: "2026-06-03", status: "Aktif" },
    { id: 3, judul: "Rapat Koordinasi Evaluasi Presensi Bulanan", target: "Guru", tanggal: "2026-06-01", status: "Aktif" },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Bell size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">CMS Konten Website</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Pengumuman Sekolah</h1>
          <p className="text-xs text-muted">Kelola pengumuman dinamis untuk siswa, guru, maupun semua kalangan.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Buat Pengumuman</span>
        </button>
      </section>

      {/* Main List */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari pengumuman..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Judul Pengumuman</th>
                <th className="pb-3">Target Sasaran</th>
                <th className="pb-3">Tanggal Dibuat</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pengumuman.map((p) => (
                <tr key={p.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-bold text-primary text-sm max-w-xs truncate">{p.judul}</td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-bold ${
                      p.target === "Semua" ? "bg-primary/10 text-primary border border-primary/20" :
                      p.target === "Guru" ? "bg-wedding-pink/15 text-wedding-pink-dark border border-wedding-pink/30" :
                      "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {p.target}
                    </span>
                  </td>
                  <td className="py-4 text-muted font-mono font-semibold">{p.tanggal}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full bg-wedding-sage/15 border border-wedding-sage/30 px-2.5 py-0.5 font-bold text-wedding-sage">
                      {p.status}
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
