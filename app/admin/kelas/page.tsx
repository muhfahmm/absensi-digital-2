"use client";

import React, { useState, useEffect } from "react";
import { School, Plus, Edit2, Trash2, Search } from "lucide-react";

export default function AdminKelasPage() {
  const [kelas, setKelas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/kelas")
      .then(res => res.json())
      .then(data => {
        setKelas(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load kelas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <School size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Data Master</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Data Kelas</h1>
          <p className="text-xs text-muted">Kelola daftar kelas dan alokasi wali kelas.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Kelas</span>
        </button>
      </section>

      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        {loading ? (
          <p className="text-slate-600 text-center py-4">Memuat data...</p>
        ) : kelas.length === 0 ? (
          <p className="text-slate-600 text-center py-4">Belum ada kelas yang terdaftar. Tambahkan kelas baru melalui panel admin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                  <th className="pb-3">Nama Kelas</th>
                  <th className="pb-3">Jurusan</th>
                  <th className="pb-3">Ruangan</th>
                  <th className="pb-3">Kapasitas</th>
                  <th className="pb-3">Wali Kelas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {kelas.map((k, idx) => (
                  <tr key={idx} className="text-xs hover:bg-slate-50/50">
                    <td className="py-4 font-bold text-primary text-sm">{k.nama_kelas}</td>
                    <td className="py-4 font-semibold text-slate-600">{k.jurusan || '-'}</td>
                    <td className="py-4 font-semibold text-slate-600">{k.ruangan || '-'}</td>
                    <td className="py-4 font-semibold text-slate-600">{k.kapasitas} Siswa</td>
                    <td className="py-4 font-semibold text-slate-600">{k.wali_kelas_nama || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
