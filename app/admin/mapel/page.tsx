"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Edit2, Trash2, Search } from "lucide-react";

export default function MapelPage() {
  const [mapel, setMapel] = useState([
    { id: 1, kode: "MP001", nama: "Matematika", guru: "Drs. Ahmad Sobari", status: "Aktif" },
    { id: 2, kode: "MP002", nama: "Bahasa Indonesia", guru: "Siti Rahmawati, S.Pd", status: "Aktif" },
    { id: 3, kode: "MP003", nama: "Fisika", guru: "Hendra Wijaya, M.Si", status: "Aktif" },
    { id: 4, kode: "MP004", nama: "Bahasa Inggris", guru: "Linda Amelia, M.Hum", status: "Aktif" },
    { id: 5, kode: "MP005", nama: "Kimia", guru: "Dr. Rahmat Hidayat", status: "Aktif" },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <BookOpen size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Data Master</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Mata Pelajaran</h1>
          <p className="text-xs text-muted">Daftar mata pelajaran yang tersedia beserta pengajar utamanya.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Pelajaran</span>
        </button>
      </section>

      {/* Filter & List */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        {/* Search bar */}
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari mata pelajaran..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Kode</th>
                <th className="pb-3">Mata Pelajaran</th>
                <th className="pb-3">Guru Pengampu</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mapel.map((m) => (
                <tr key={m.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-mono font-bold text-accent-dark">{m.kode}</td>
                  <td className="py-4 font-bold text-primary text-sm">{m.nama}</td>
                  <td className="py-4 font-semibold text-slate-600">{m.guru}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full bg-wedding-sage/15 border border-wedding-sage/30 px-2.5 py-0.5 font-bold text-wedding-sage">
                      {m.status}
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
