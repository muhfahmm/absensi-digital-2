"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Edit2, Trash2, Search, X } from "lucide-react";

export default function MapelPage() {
  const [mapel, setMapel] = useState<any[]>([]);
  const [gurus, setGurus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    kode: "",
    nama: "",
    deskripsi: "",
    guru_id: ""
  });
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resMapel, resGuru] = await Promise.all([
        fetch("/admin/api/mapel").then(res => res.json()),
        fetch("/admin/api/guru").then(res => res.json())
      ]);
      setMapel(resMapel || []);
      setGurus(resGuru || []);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setFormData({
      id: "",
      kode: "",
      nama: "",
      deskripsi: "",
      guru_id: ""
    });
    setIsEditMode(false);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setFormData({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      deskripsi: item.deskripsi || "",
      guru_id: item.guru_id || ""
    });
    setIsEditMode(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus mata pelajaran ini?")) return;
    try {
      const res = await fetch(`/admin/api/mapel?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Gagal menghapus mata pelajaran");
      }
    } catch (err) {
      console.error("Error deleting mapel:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    try {
      const url = "/admin/api/mapel";
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan");
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredMapel = mapel.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.kode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <BookOpen size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Data Master</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Mata Pelajaran</h1>
          <p className="text-xs text-muted">Daftar mata pelajaran yang tersedia beserta pengajar utamanya.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md"
        >
          <Plus size={14} />
          <span>Tambah Pelajaran</span>
        </button>
      </section>

      {/* Filter & List */}
      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        {/* Search bar */}
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium text-slate-800"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">Kode</th>
                <th className="pb-3">Mata Pelajaran</th>
                <th className="pb-3">Guru Pengampu</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredMapel.length === 0 ? (
                <tr><td colSpan={5} className="py-4 text-center text-slate-500">Belum ada mata pelajaran.</td></tr>
              ) : filteredMapel.map((m) => (
                <tr key={m.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-mono font-bold text-accent-dark">{m.kode}</td>
                  <td className="py-4 font-bold text-primary text-sm">{m.nama}</td>
                  <td className="py-4 font-semibold text-slate-600">{m.guru_nama || '-'}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(m)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(m.id)}
                        className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                      >
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-wedding-pink/20 shadow-2xl p-6 relative overflow-hidden animate-[fadeIn_0.2s_ease]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-full p-1"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-serif font-bold text-primary mb-4">
              {isEditMode ? "Edit Pelajaran" : "Tambah Pelajaran"}
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Kode Pelajaran</label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: MP-001, IPA-X"
                  value={formData.kode}
                  onChange={e => setFormData({ ...formData, kode: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Nama Pelajaran</label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Matematika, Fisika"
                  value={formData.nama}
                  onChange={e => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Deskripsi</label>
                <textarea 
                  placeholder="Tuliskan keterangan singkat..."
                  value={formData.deskripsi}
                  onChange={e => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800 h-20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Guru Pengampu</label>
                <select
                  value={formData.guru_id}
                  onChange={e => setFormData({ ...formData, guru_id: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                >
                  <option value="">Pilih Guru (Opsional)</option>
                  {gurus.map(g => (
                    <option key={g.id} value={g.id}>{g.nama_lengkap}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={submitLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-soft transition-colors disabled:opacity-50"
                >
                  {submitLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

