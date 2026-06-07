"use client";

import React, { useState } from "react";
import { Camera, Plus, Edit2, Trash2, Tag } from "lucide-react";

export default function GaleriPage() {
  const [foto, setFoto] = useState([
    { id: 1, judul: "Upacara Hari Guru Nasional 2025", kategori: "Kegiatan", gambar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80", tanggal: "25 Nov 2025" },
    { id: 2, judul: "Gedung Utama & Fasilitas Lab Baru", kategori: "Fasilitas", gambar: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80", tanggal: "10 Okt 2025" },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Camera size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">CMS Konten Website</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Galeri Foto</h1>
          <p className="text-xs text-muted">Kelola koleksi album dokumentasi, foto fasilitas, dan publikasi kegiatan sekolah.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Unggah Foto</span>
        </button>
      </section>

      {/* Grid album */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foto.map((f) => (
          <div key={f.id} className="rounded-2xl border border-wedding-pink/20 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative h-44 w-full bg-slate-100">
              <img src={f.gambar} alt={f.judul} className="h-full w-full object-cover" />
              <span className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold text-white shadow-sm flex items-center gap-1">
                <Tag size={10} className="text-accent" /> {f.kategori}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-primary text-sm line-clamp-1">{f.judul}</h3>
                <span className="text-[10px] text-muted font-bold block mt-1 uppercase">{f.tanggal}</span>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-primary transition-all">
                  <Edit2 size={12} />
                </button>
                <button className="rounded-lg border border-rose-100 bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100 transition-all">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
