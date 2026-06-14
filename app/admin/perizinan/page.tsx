"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, Check, X } from "lucide-react";

export default function AdminPerizinanPage() {
  const [perizinan, setPerizinan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/api/perizinan")
      .then(res => res.json())
      .then(data => {
        setPerizinan(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load perizinan:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <FileText size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Kehadiran & Laporan</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Manajemen Izin</h1>
          <p className="text-xs text-muted">Kelola persetujuan izin dan sakit yang diajukan oleh siswa maupun guru.</p>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari perizinan..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Tanggal</th>
                <th className="pb-3">Nama</th>
                <th className="pb-3">Keterangan</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : perizinan.length === 0 ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Belum ada data perizinan.</td></tr>
              ) : perizinan.map((p, idx) => (
                <tr key={idx} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 text-muted font-mono">{new Date(p.tanggal_mulai).toLocaleDateString()} - {new Date(p.tanggal_selesai).toLocaleDateString()}</td>
                  <td className="py-4">
                    <p className="font-bold text-primary text-sm">{p.nama_user}</p>
                    <p className="text-[10px] text-muted">{p.role_detail}</p>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-bold mb-1 ${p.jenis_izin === 'Sakit' ? 'bg-sky-100 text-sky-600 border border-sky-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}`}>
                      {p.jenis_izin}
                    </span>
                    <p className="font-semibold text-slate-600 max-w-[200px] truncate" title={p.alasan}>{p.alasan}</p>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-bold ${
                      p.status === 'Disetujui' ? 'bg-wedding-sage/15 border border-wedding-sage/30 text-wedding-sage' :
                      p.status === 'Ditolak' ? 'bg-rose-100 text-rose-600 border border-rose-200' :
                      'bg-slate-100 border border-slate-300 text-slate-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 text-wedding-sage hover:bg-wedding-sage/10 transition-colors" title="Setujui">
                        <Check size={16} />
                      </button>
                      <button className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 transition-colors" title="Tolak">
                        <X size={16} />
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
