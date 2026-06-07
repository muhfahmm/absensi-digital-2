"use client";

import React, { useState } from "react";
import { ClipboardCheck, Check, Search, Calendar, Filter, UserCheck, AlertTriangle } from "lucide-react";

export default function AbsensiPage() {
  const [absensi, setAbsensi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch("/api/absensi")
      .then(res => res.json())
      .then(data => {
        setAbsensi(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load absensi:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <ClipboardCheck size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Kehadiran & Laporan</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Absensi Kelas</h1>
          <p className="text-xs text-muted">Lakukan pencatatan, koreksi, dan rekapitulasi kehadiran siswa.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Check size={14} />
          <span>Simpan Presensi</span>
        </button>
      </section>

      {/* Control Panel */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2.5 items-center">
            <input
              type="date"
              defaultValue="2026-06-07"
              className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 outline-none bg-wedding-bg/20 font-semibold text-primary"
            />
            <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 outline-none bg-wedding-bg/20 font-semibold text-primary">
              <option>XI IPA 2</option>
              <option>X IPA 1</option>
              <option>XII IPA 1</option>
            </select>
            <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 outline-none bg-wedding-bg/20 font-semibold text-primary">
              <option>Matematika - Drs. Ahmad Sobari</option>
              <option>Fisika - Hendra Wijaya, M.Si</option>
            </select>
          </div>

          <div className="relative max-w-xs w-full sm:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Cari siswa..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
            />
          </div>
        </div>

        {/* Student List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">NIS</th>
                <th className="pb-3">Nama Siswa</th>
                <th className="pb-3">Kelas</th>
                <th className="pb-3">Tanggal</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : absensi.length === 0 ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Belum ada data absensi.</td></tr>
              ) : absensi.map((s) => (
                <tr key={s.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-mono font-semibold text-slate-500">{s.nis}</td>
                  <td className="py-4 font-bold text-primary text-sm">{s.siswa_nama}</td>
                  <td className="py-4 font-semibold text-slate-600">{s.nama_kelas}</td>
                  <td className="py-4 text-muted font-mono">{new Date(s.tanggal).toLocaleDateString()}</td>
                  <td className="py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-bold ${
                      s.status === 'Hadir' ? 'bg-wedding-sage/15 border border-wedding-sage/30 text-wedding-sage' :
                      s.status === 'Izin' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                      s.status === 'Sakit' ? 'bg-sky-100 text-sky-600 border border-sky-200' :
                      'bg-rose-100 text-rose-600 border border-rose-200'
                    }`}>
                      {s.status}
                    </span>
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
