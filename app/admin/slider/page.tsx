"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Plus, Edit2, Trash2, Link as LinkIcon } from "lucide-react";

export default function SliderPage() {
  const [sliders, setSliders] = useState([
    { id: 1, judul: "Selamat Datang di Portal Absensi Digital", link: "/profil", gambar: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80", urutan: 1, status: "Aktif" },
    { id: 2, judul: "Pengumuman Ujian Akhir Semester Genap", link: "/pengumuman", gambar: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80", urutan: 2, status: "Aktif" },
  ]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <ImageIcon size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">CMS Konten Website</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Slider Banner</h1>
          <p className="text-xs text-muted">Kelola gambar slide promosi, banner informasi utama di beranda.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Banner</span>
        </button>
      </section>

      {/* Main Grid List */}
      <div className="grid gap-6 md:grid-cols-2">
        {sliders.map((slider) => (
          <div key={slider.id} className="rounded-2xl border border-wedding-pink/20 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative h-44 w-full bg-slate-100">
              <img src={slider.gambar} alt={slider.judul} className="h-full w-full object-cover" />
              <span className="absolute top-3 right-3 rounded-full bg-wedding-sage px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                {slider.status}
              </span>
              <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white font-mono">
                Urutan: {slider.urutan}
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-primary text-sm line-clamp-1">{slider.judul}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <LinkIcon size={12} className="text-accent" />
                  <span className="font-medium underline truncate">{slider.link}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[10px] font-bold text-muted uppercase">ID: Banner-{slider.id}</span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button className="flex items-center gap-1 rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 transition-colors">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
