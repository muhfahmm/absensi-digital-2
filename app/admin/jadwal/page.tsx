"use client";

import React, { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, Filter } from "lucide-react";

export default function JadwalPage() {
  const [jadwal, setJadwal] = useState([
    { id: 1, kelas: "X IPA 1", mapel: "Matematika", guru: "Drs. Ahmad Sobari", hari: "Senin", jam: "07:30 - 09:00", ruang: "Lab 1" },
    { id: 2, kelas: "X IPA 1", mapel: "Fisika", guru: "Hendra Wijaya, M.Si", hari: "Senin", jam: "09:15 - 10:45", ruang: "Kelas X-1" },
    { id: 3, kelas: "XI IPA 2", mapel: "Kimia", guru: "Dr. Rahmat Hidayat", hari: "Selasa", jam: "07:30 - 09:00", ruang: "Lab Kimia" },
    { id: 4, kelas: "XII IPA 1", mapel: "Bahasa Inggris", guru: "Linda Amelia, M.Hum", hari: "Rabu", jam: "10:00 - 11:30", ruang: "Kelas XII-1" },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Calendar size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Data Master</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Jadwal Pelajaran</h1>
          <p className="text-xs text-muted">Kelola alokasi jadwal pelajaran harian per kelas dan ruang kelas.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Jadwal</span>
        </button>
      </section>

      {/* Main Table */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <div className="flex items-center gap-1.5 text-xs text-muted font-bold mr-2">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-semibold text-primary">
            <option>Semua Kelas</option>
            <option>X IPA 1</option>
            <option>XI IPA 2</option>
            <option>XII IPA 1</option>
          </select>
          <select className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-semibold text-primary">
            <option>Semua Hari</option>
            <option>Senin</option>
            <option>Selasa</option>
            <option>Rabu</option>
            <option>Kamis</option>
            <option>Jumat</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Kelas</th>
                <th className="pb-3">Mata Pelajaran</th>
                <th className="pb-3">Guru</th>
                <th className="pb-3">Waktu</th>
                <th className="pb-3">Ruang</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jadwal.map((j) => (
                <tr key={j.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-bold text-primary text-sm">{j.kelas}</td>
                  <td className="py-4 font-bold text-slate-700">{j.mapel}</td>
                  <td className="py-4 font-semibold text-slate-500">{j.guru}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-lg bg-wedding-pink/10 border border-wedding-pink/20 px-2 py-1 font-semibold text-wedding-pink-dark font-mono">
                      {j.hari}, {j.jam}
                    </span>
                  </td>
                  <td className="py-4 text-muted font-semibold">{j.ruang}</td>
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
