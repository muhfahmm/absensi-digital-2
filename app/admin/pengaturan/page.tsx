"use client";

import React, { useState } from "react";
import { Settings, Save, Key, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function PengaturanPage() {
  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Settings size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Sistem</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Pengaturan Sistem</h1>
          <p className="text-xs text-muted">Konfigurasi jam masuk absensi, toleransi GPS, backup data, dan integrasi security.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Save size={14} />
          <span>Simpan Konfigurasi</span>
        </button>
      </section>

      {/* Grid parameter settings */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Jam & Presensi */}
        <div className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
            <Clock size={16} className="text-accent" /> Aturan Jam Presensi
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Jam Masuk Pagi</label>
              <input
                type="text"
                defaultValue="07:00:00"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-mono text-primary font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Toleransi (Menit)</label>
              <input
                type="number"
                defaultValue="15"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-mono text-primary font-bold"
              />
            </div>
          </div>
        </div>

        {/* GPS Radius */}
        <div className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin size={16} className="text-accent" /> Radius GPS & Lokasi
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Radius Maksimal (Meter)</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-mono text-primary font-bold"
              />
            </div>
            <div className="space-y-1.5 flex flex-col justify-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded border-wedding-pink text-primary focus:ring-accent" />
                <span className="text-xs font-bold text-slate-600">Aktifkan Validasi GPS</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
