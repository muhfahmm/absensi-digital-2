"use client";

import React, { useState } from "react";
import { CalendarDays, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function TahunAjaranPage() {
  const [tahunAjaran, setTahunAjaran] = useState([
    { id: 1, nama: "2025/2026", semester: "Ganjil", mulai: "2025-07-15", selesai: "2025-12-20", aktif: true },
    { id: 2, nama: "2024/2025", semester: "Genap", mulai: "2025-01-05", selesai: "2025-06-18", aktif: false },
    { id: 3, nama: "2024/2025", semester: "Ganjil", mulai: "2024-07-10", selesai: "2024-12-22", aktif: false },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <CalendarDays size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Data Master</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Tahun Ajaran</h1>
          <p className="text-xs text-muted">Kelola tahun ajaran aktif, semester, dan masa berlaku akademik.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Tahun Ajaran</span>
        </button>
      </section>

      {/* Main List */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Tahun Ajaran</th>
                <th className="pb-3">Semester</th>
                <th className="pb-3">Mulai</th>
                <th className="pb-3">Selesai</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tahunAjaran.map((ta) => (
                <tr key={ta.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-bold text-primary text-sm">{ta.nama}</td>
                  <td className="py-4 font-semibold text-slate-600">{ta.semester}</td>
                  <td className="py-4 text-muted font-mono">{ta.mulai}</td>
                  <td className="py-4 text-muted font-mono">{ta.selesai}</td>
                  <td className="py-4">
                    {ta.aktif ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-wedding-sage/15 border border-wedding-sage/30 px-2.5 py-0.5 font-bold text-wedding-sage">
                        <CheckCircle2 size={12} /> Aktif
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 font-semibold text-slate-500">
                        Tidak Aktif
                      </span>
                    )}
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
