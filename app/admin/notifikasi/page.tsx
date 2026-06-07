"use client";

import React, { useState } from "react";
import { Send, SendHorizontal, Users, ShieldAlert } from "lucide-react";

export default function NotifikasiPage() {
  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Send size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Sistem</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Kirim Notifikasi</h1>
          <p className="text-xs text-muted">Kirim pesan push notification langsung ke aplikasi mobile guru atau siswa.</p>
        </div>
      </section>

      {/* Form notif */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
            <SendHorizontal size={18} className="text-accent" /> Buat Pesan Baru
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Penerima Sasaran</label>
                <select className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-semibold text-primary">
                  <option>Semua (Siswa & Guru)</option>
                  <option>Khusus Siswa</option>
                  <option>Khusus Guru</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Prioritas Notifikasi</label>
                <select className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-semibold text-primary">
                  <option>Normal</option>
                  <option>Tinggi (Penting)</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Notif</label>
              <input
                type="text"
                placeholder="Contoh: Pengingat Absensi Pagi"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Isi Pesan Notif</label>
              <textarea
                rows={4}
                placeholder="Tulis pesan pengumuman singkat yang akan muncul di HP penerima..."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary resize-none"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
              <Send size={14} className="text-accent" />
              <span>Kirim Broadcast</span>
            </button>
          </div>
        </div>

        {/* Warning info */}
        <div className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldAlert size={18} className="text-accent" /> Ketentuan Penggunaan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Notifikasi push yang Anda kirim akan langsung dikirim melalui Google Firebase Cloud Messaging (FCM) dan Apple Push Notification Service (APNS). Gunakan dengan bijak agar tidak mengganggu fokus belajar mengajar di sekolah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
