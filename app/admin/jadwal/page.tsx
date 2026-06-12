"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Plus, Edit2, Trash2, Filter, X } from "lucide-react";

export default function JadwalPage() {
  const [jadwal, setJadwal] = useState<any[]>([]);
  const [kelas, setKelas] = useState<any[]>([]);
  const [mapels, setMapels] = useState<any[]>([]);
  const [gurus, setGurus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedKelas, setSelectedKelas] = useState("Semua Kelas");
  const [selectedHari, setSelectedHari] = useState("Semua Hari");

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    kelas_id: "",
    mata_pelajaran_id: "",
    guru_id: "",
    hari: "Senin",
    jam_mulai: "07:00",
    jam_selesai: "08:30",
    ruangan: ""
  });
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resJadwal, resKelas, resMapel, resGuru] = await Promise.all([
        fetch("/api/jadwal").then(res => res.json()),
        fetch("/api/kelas").then(res => res.json()),
        fetch("/api/mapel").then(res => res.json()),
        fetch("/api/guru").then(res => res.json())
      ]);
      setJadwal(resJadwal || []);
      setKelas(resKelas || []);
      setMapels(resMapel || []);
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
      kelas_id: kelas[0]?.id || "",
      mata_pelajaran_id: mapels[0]?.id || "",
      guru_id: gurus[0]?.id || "",
      hari: "Senin",
      jam_mulai: "07:00",
      jam_selesai: "08:30",
      ruangan: ""
    });
    setIsEditMode(false);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setFormData({
      id: item.id,
      kelas_id: item.kelas_id,
      mata_pelajaran_id: item.mata_pelajaran_id,
      guru_id: item.guru_id,
      hari: item.hari,
      jam_mulai: item.jam_mulai.substring(0, 5),
      jam_selesai: item.jam_selesai.substring(0, 5),
      ruangan: item.ruangan || ""
    });
    setIsEditMode(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
    try {
      const res = await fetch(`/api/jadwal?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Gagal menghapus jadwal");
      }
    } catch (err) {
      console.error("Error deleting jadwal:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    try {
      const url = "/api/jadwal";
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

  const filteredJadwal = jadwal.filter((j) => {
    const matchKelas = selectedKelas === "Semua Kelas" || j.nama_kelas === selectedKelas || String(j.kelas_id) === selectedKelas;
    const matchHari = selectedHari === "Semua Hari" || j.hari === selectedHari;
    return matchKelas && matchHari;
  });

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
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-soft transition-all duration-200 shadow-md"
        >
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
          <select 
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-semibold text-primary"
          >
            <option value="Semua Kelas">Semua Kelas</option>
            {kelas.map((k) => (
              <option key={k.id} value={k.nama_kelas}>{k.nama_kelas}</option>
            ))}
          </select>
          <select 
            value={selectedHari}
            onChange={(e) => setSelectedHari(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-semibold text-primary"
          >
            <option value="Semua Hari">Semua Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
            <option value="Sabtu">Sabtu</option>
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
              {loading ? (
                <tr><td colSpan={6} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredJadwal.length === 0 ? (
                <tr><td colSpan={6} className="py-4 text-center text-slate-500">Belum ada data jadwal.</td></tr>
              ) : filteredJadwal.map((j) => (
                <tr key={j.id} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-bold text-primary text-sm">{j.nama_kelas || j.kelas_id}</td>
                  <td className="py-4 font-bold text-slate-700">{j.mata_pelajaran_nama}</td>
                  <td className="py-4 font-semibold text-slate-500">{j.guru_nama}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-lg bg-wedding-pink/10 border border-wedding-pink/20 px-2 py-1 font-semibold text-wedding-pink-dark font-mono">
                      {j.hari}, {j.jam_mulai.substring(0, 5)} - {j.jam_selesai.substring(0, 5)}
                    </span>
                  </td>
                  <td className="py-4 text-muted font-semibold">{j.ruangan}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(j)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(j.id)}
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
              {isEditMode ? "Edit Jadwal" : "Tambah Jadwal"}
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Kelas</label>
                <select
                  required
                  value={formData.kelas_id}
                  onChange={e => setFormData({ ...formData, kelas_id: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                >
                  {kelas.map(k => (
                    <option key={k.id} value={k.id}>{k.nama_kelas} - {k.jurusan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Mata Pelajaran</label>
                <select
                  required
                  value={formData.mata_pelajaran_id}
                  onChange={e => setFormData({ ...formData, mata_pelajaran_id: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                >
                  {mapels.map(m => (
                    <option key={m.id} value={m.id}>{m.nama} ({m.kode})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Guru Pengajar</label>
                <select
                  required
                  value={formData.guru_id}
                  onChange={e => setFormData({ ...formData, guru_id: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                >
                  {gurus.map(g => (
                    <option key={g.id} value={g.id}>{g.nama_lengkap}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase mb-1">Hari</label>
                  <select
                    value={formData.hari}
                    onChange={e => setFormData({ ...formData, hari: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase mb-1">Ruangan</label>
                  <input 
                    type="text"
                    placeholder="Contoh: R-102"
                    value={formData.ruangan}
                    onChange={e => setFormData({ ...formData, ruangan: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase mb-1">Jam Mulai</label>
                  <input 
                    type="time"
                    required
                    value={formData.jam_mulai}
                    onChange={e => setFormData({ ...formData, jam_mulai: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase mb-1">Jam Selesai</label>
                  <input 
                    type="time"
                    required
                    value={formData.jam_selesai}
                    onChange={e => setFormData({ ...formData, jam_selesai: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/10 font-medium text-slate-800"
                  />
                </div>
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

