"use client";

import React, { useState } from "react";
import { BarChart3, FileDown, Calendar, School, Filter, Printer } from "lucide-react";

export default function LaporanPage() {
  const [dataLaporan, setDataLaporan] = useState([
    { kelas: "X IPA 1", total: 32, hadir: "96%", izin: 2, sakit: 1, alpha: 1 },
    { kelas: "X IPA 2", total: 30, hadir: "94%", izin: 3, sakit: 1, alpha: 2 },
    { kelas: "XI IPA 1", total: 28, hadir: "98%", izin: 1, sakit: 0, alpha: 0 },
    { kelas: "XI IPA 2", total: 30, hadir: "95%", izin: 2, sakit: 1, alpha: 1 },
    { kelas: "XII IPA 1", total: 32, hadir: "97%", izin: 1, sakit: 1, alpha: 0 },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <BarChart3 size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Kehadiran & Laporan</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Laporan & Rekap</h1>
          <p className="text-xs text-muted">Unduh rekapitulasi kehadiran bulanan dan analisis data statistik kelas.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-wedding-pink/30 bg-white px-4 py-2.5 text-xs font-bold text-primary hover:bg-slate-50 transition-all duration-200 shadow-sm">
            <Printer size={14} />
            <span>Cetak PDF</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
            <FileDown size={14} />
            <span>Ekspor Excel</span>
          </button>
        </div>
      </section>

      {/* Report filter panel */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-xs text-muted font-bold mr-2">
            <Filter size={14} />
            <span>Rentang & Kelas:</span>
          </div>
          <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 outline-none bg-wedding-bg/20 font-semibold text-primary">
            <option>Bulan Juni 2026</option>
            <option>Bulan Mei 2026</option>
            <option>Semester Ganjil 2025/2026</option>
          </select>
          <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 outline-none bg-wedding-bg/20 font-semibold text-primary">
            <option>Semua Kelas</option>
            <option>Kelas X</option>
            <option>Kelas XI</option>
            <option>Kelas XII</option>
          </select>
        </div>

        {/* Table summary */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Kelas</th>
                <th className="pb-3">Total Siswa</th>
                <th className="pb-3 text-wedding-sage">Persentase Hadir</th>
                <th className="pb-3 text-amber-600">Total Izin</th>
                <th className="pb-3 text-sky-600">Total Sakit</th>
                <th className="pb-3 text-rose-600">Total Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataLaporan.map((item, idx) => (
                <tr key={idx} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-bold text-primary text-sm">{item.kelas}</td>
                  <td className="py-4 font-semibold text-slate-600">{item.total} Siswa</td>
                  <td className="py-4 font-bold text-wedding-sage text-sm">{item.hadir}</td>
                  <td className="py-4 font-semibold text-amber-600">{item.izin} hari</td>
                  <td className="py-4 font-semibold text-sky-600">{item.sakit} hari</td>
                  <td className="py-4 font-semibold text-rose-600">{item.alpha} hari</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
