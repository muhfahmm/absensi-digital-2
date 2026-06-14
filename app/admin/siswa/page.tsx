"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Edit2, Trash2, X } from "lucide-react";

export default function AdminSiswaPage() {
  const [siswa, setSiswa] = useState<any[]>([]);
  const [kelas, setKelas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    nis: "",
    nama_lengkap: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    tempat_lahir: "",
    alamat: "",
    telepon_ortu: "",
    email: "",
    kelas_id: "",
    username: "",
    password: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resSiswa, resKelas] = await Promise.all([
        fetch("/admin/api/siswa").then((res) => res.json()),
        fetch("/admin/api/kelas").then((res) => res.json())
      ]);
      setSiswa(resSiswa || []);
      setKelas(resKelas || []);
    } catch (err) {
      console.error("Failed to load siswa:", err);
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
      nis: "",
      nama_lengkap: "",
      jenis_kelamin: "Laki-laki",
      tanggal_lahir: "",
      tempat_lahir: "",
      alamat: "",
      telepon_ortu: "",
      email: "",
      kelas_id: kelas[0]?.id || "",
      username: "",
      password: ""
    });
    setIsEditMode(false);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setFormData({
      id: item.id,
      nis: item.nis,
      nama_lengkap: item.nama_lengkap,
      jenis_kelamin: item.jenis_kelamin || "Laki-laki",
      tanggal_lahir: item.tanggal_lahir || "",
      tempat_lahir: item.tempat_lahir || "",
      alamat: item.alamat || "",
      telepon_ortu: item.telepon_ortu || "",
      email: item.email || "",
      kelas_id: item.kelas_id || kelas[0]?.id || "",
      username: item.username || item.nis,
      password: ""
    });
    setIsEditMode(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus siswa ini?")) return;
    try {
      const res = await fetch(`/admin/api/siswa?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Gagal menghapus siswa");
      }
    } catch (err) {
      console.error("Error deleting siswa:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    try {
      const url = "/admin/api/siswa";
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

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] bg-white p-8 shadow-sm border border-wedding-pink/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Users size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Manajemen Pengguna</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Data Siswa</h1>
          <p className="text-xs text-muted">Kelola data siswa dan alokasi kelas secara menyeluruh.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1b3650] transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Siswa</span>
        </button>
      </section>

      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari data siswa..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">NIS</th>
                <th className="pb-3">Nama Siswa</th>
                <th className="pb-3">QR</th>
                <th className="pb-3">Kelas</th>
                <th className="pb-3">Telepon</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : siswa.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 space-y-4">
                    <div>Belum ada siswa yang terdaftar.</div>
                    <button onClick={openAddModal} className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b3650] transition-colors">
                      <Plus size={14} />
                      <span>Tambah Siswa</span>
                    </button>
                  </td>
                </tr>
              ) : siswa.map((s, idx) => (
                <tr key={idx} className="text-xs hover:bg-slate-50">
                  <td className="py-4 font-mono font-bold text-accent-dark">{s.nis}</td>
                  <td className="py-4 font-bold text-primary text-sm">{s.nama_lengkap}</td>
                  <td className="py-4">
                    {s.qrcode ? (
                      <a href={`/qrcodes/${s.qrcode}`} target="_blank" rel="noreferrer">
                        <img src={`/qrcodes/${s.qrcode}`} alt="QR" className="w-10 h-10 object-cover rounded" />
                      </a>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-4 font-semibold text-slate-600">{s.nama_kelas || '-'}</td>
                  <td className="py-4 font-semibold text-slate-600">{s.telepon_ortu || '-'}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(s)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Form Siswa</p>
                <h2 className="mt-2 text-xl font-semibold text-primary">{isEditMode ? "Edit Siswa" : "Tambah Siswa"}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  NIS
                  <input value={formData.nis} onChange={(e) => setFormData({ ...formData, nis: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700 md:col-span-2">
                  Nama Lengkap
                  <input value={formData.nama_lengkap} onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Jenis Kelamin
                  <select value={formData.jenis_kelamin} onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Tanggal Lahir
                  <input type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Tempat Lahir
                  <input value={formData.tempat_lahir} onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700 md:col-span-2">
                  Alamat
                  <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} rows={3} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent"></textarea>
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Telepon Orang Tua
                  <input value={formData.telepon_ortu} onChange={(e) => setFormData({ ...formData, telepon_ortu: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Email
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Kelas
                  <select value={formData.kelas_id} onChange={(e) => setFormData({ ...formData, kelas_id: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent">
                    <option value="">Pilih kelas</option>
                    {kelas.map((k) => (
                      <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Username
                  <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Password{isEditMode ? " (biarkan kosong jika tidak diubah)" : ""}
                  <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
              </div>

              {error && <p className="text-xs text-rose-600">{error}</p>}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Batal
                </button>
                <button type="submit" disabled={submitLoading} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-70">
                  {submitLoading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Siswa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
