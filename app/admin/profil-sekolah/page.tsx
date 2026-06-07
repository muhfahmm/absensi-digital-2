"use client";

import React, { useState } from "react";
import { Building, Save, FileText, Image as ImageIcon } from "lucide-react";

export default function ProfilSekolahPage() {
  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Building size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">CMS Konten Website</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Profil Sekolah</h1>
          <p className="text-xs text-muted">Perbarui data profil lembaga, visi & misi, kepemimpinan, dan legalitas NPSN.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Save size={14} />
          <span>Simpan Perubahan</span>
        </button>
      </section>

      {/* Main settings form */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Form */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText size={18} className="text-accent" /> Identitas Sekolah
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Sekolah</label>
              <input
                type="text"
                defaultValue="SMA Negeri 1 Absensi Digital"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">NPSN</label>
              <input
                type="text"
                defaultValue="10293847"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kepala Sekolah</label>
              <input
                type="text"
                defaultValue="Drs. H. Mulyono, M.Pd."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Akreditasi</label>
              <input
                type="text"
                defaultValue="A (Sangat Baik)"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary"
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Alamat Lengkap</label>
              <textarea
                rows={3}
                defaultValue="Jl. Pendidikan No. 45, Kecamatan Sukamaju, Kota Absensi Digital, 40123"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Uploads */}
        <div className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-accent" /> Logo Sekolah
            </h3>
            <div className="flex flex-col items-center py-6 border-2 border-dashed border-wedding-pink/30 rounded-2xl bg-wedding-bg/10 cursor-pointer hover:bg-wedding-bg/20 transition-all">
              <div className="h-24 w-24 bg-white rounded-full border border-wedding-pink/20 flex items-center justify-center font-bold text-primary text-xl shadow-sm">
                LOGO
              </div>
              <span className="text-[10px] font-bold text-muted uppercase mt-4">Klik untuk Upload Baru</span>
              <span className="text-[8px] text-muted font-medium mt-1">Format JPG/PNG maks. 2MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
