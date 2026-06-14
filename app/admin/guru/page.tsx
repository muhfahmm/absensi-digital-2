"use client";

import React, { useState, useEffect } from "react";
import { UserCog, Plus, Search, Edit2, Trash2, X } from "lucide-react";

export default function AdminGuruPage() {
  const [guru, setGuru] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    nip: "",
    nama_lengkap: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    alamat: "",
    telepon: "",
    email: "",
    foto: "",
    mapel_id: "",
    is_admin: 0,
    username: "",
    password: "",
    is_aktif: 1
  });

  const [mapel, setMapel] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resGuru, resMapel] = await Promise.all([
        fetch("/admin/api/guru").then(res => res.json()),
        fetch("/admin/api/mapel").then(res => res.json())
      ]);
      setGuru(resGuru || []);
      setMapel(resMapel || []);
    } catch (err) {
      console.error("Failed to load guru:", err);
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
      nip: "",
      nama_lengkap: "",
      jenis_kelamin: "Laki-laki",
      tanggal_lahir: "",
      alamat: "",
      telepon: "",
      email: "",
      foto: "",
      mapel_id: "",
      is_admin: 0,
      username: "",
      password: "",
      is_aktif: 1
    });
    setFotoFile(null);
    setFotoPreview("");
    setIsEditMode(false);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setFormData({
      id: item.id,
      nip: item.nip,
      nama_lengkap: item.nama_lengkap,
      jenis_kelamin: item.jenis_kelamin || "Laki-laki",
      tanggal_lahir: item.tanggal_lahir || "",
      alamat: item.alamat || "",
      telepon: item.telepon || "",
      email: item.email || "",
      foto: item.foto || "",
      mapel_id: item.mapel_id || "",
      is_admin: item.is_admin || 0,
      username: item.username || item.nip,
      password: "",
      is_aktif: item.is_aktif
    });
    setFotoFile(null);
    setFotoPreview(item.foto ? item.foto : "");
    setIsEditMode(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data guru ini?")) return;
    try {
      const res = await fetch(`/admin/api/guru?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Gagal menghapus guru");
      }
    } catch (err) {
      console.error("Error deleting guru:", err);
    }
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    try {
      let fotoPath = formData.foto;

      // Upload foto jika ada file baru
      if (fotoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", fotoFile);
        uploadFormData.append("type", "guru");

        const uploadRes = await fetch("/admin/api/upload", {
          method: "POST",
          body: uploadFormData
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "Gagal upload foto");
        }

        fotoPath = uploadData.path;
      }

      const url = "/admin/api/guru";
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, foto: fotoPath })
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
            <UserCog size={20} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted">Manajemen Pengguna</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Data Guru</h1>
          <p className="text-xs text-muted">Kelola data staff pengajar dan manajemen akses absensi.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1b3650] transition-all duration-200 shadow-md">
          <Plus size={14} />
          <span>Tambah Guru</span>
        </button>
      </section>

      <section className="rounded-3xl bg-white border border-wedding-pink/20 p-6 shadow-sm space-y-4">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari data guru..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-wedding-pink/30 focus:border-accent outline-none bg-wedding-bg/20 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-primary uppercase tracking-wider">
                <th className="pb-3">NIP</th>
                <th className="pb-3">Foto</th>
                <th className="pb-3">Nama Guru</th>
                <th className="pb-3">QR</th>
                <th className="pb-3">Mata Pelajaran</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Telepon</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="py-4 text-center text-slate-500">Memuat data...</td></tr>
              ) : guru.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 space-y-4">
                    <div>Belum ada data guru.</div>
                    <button onClick={openAddModal} className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b3650] transition-colors">
                      <Plus size={14} />
                      <span>Tambah Guru</span>
                    </button>
                  </td>
                </tr>
              ) : guru.map((g, idx) => (
                <tr key={idx} className="text-xs hover:bg-slate-50/50">
                  <td className="py-4 font-mono font-bold text-accent-dark">{g.nip}</td>
                  <td className="py-4">
                    {g.foto ? (
                      <img src={g.foto} alt={g.nama_lengkap} className="h-10 w-10 rounded-lg object-cover border border-wedding-pink/20" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center text-[10px] text-slate-500">-</div>
                    )}
                  </td>
                  <td className="py-4 font-bold text-primary text-sm">{g.nama_lengkap}</td>
                  <td className="py-4">
                    {g.qrcode ? (
                      <a href={`/qrcodes/${g.qrcode}`} target="_blank" rel="noreferrer">
                        <img src={`/qrcodes/${g.qrcode}`} alt="QR" className="w-10 h-10 object-cover rounded" />
                      </a>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-4 font-semibold text-slate-600">{g.mapel_nama || '-'}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      {g.is_aktif ? (
                        <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-bold text-emerald-600 text-[10px]">Aktif</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 font-bold text-slate-600 text-[10px]">Nonaktif</span>
                      )}
                      {g.is_admin ? (
                        <span className="inline-flex rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 font-bold text-amber-600 text-[10px]">Wali</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-600">{g.telepon || '-'}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(g)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(g.id)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">
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
                <p className="text-xs uppercase tracking-widest text-muted">Form Guru</p>
                <h2 className="mt-2 text-xl font-semibold text-primary">{isEditMode ? "Edit Guru" : "Tambah Guru"}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Foto Upload Section */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Foto Guru</label>
                <div className="flex gap-4">
                  {(fotoPreview || formData.foto) && (
                    <img
                      src={fotoPreview || formData.foto}
                      alt="Preview"
                      className="h-24 w-24 rounded-xl border-2 border-wedding-pink/30 object-cover"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-wedding-pink/30 px-4 py-6 cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="hidden"
                      />
                      <span className="text-xs font-semibold text-slate-600">Pilih Foto (JPG, PNG, WebP - Max 5MB)</span>
                    </label>
                    {fotoFile && <p className="text-xs text-accent font-medium">✓ {fotoFile.name}</p>}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  NIP
                  <input value={formData.nip} onChange={(e) => setFormData({ ...formData, nip: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
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
                <label className="space-y-2 text-xs font-semibold text-slate-700 md:col-span-2">
                  Alamat
                  <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} rows={3} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent"></textarea>
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Telepon
                  <input value={formData.telepon} onChange={(e) => setFormData({ ...formData, telepon: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Email
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Mata Pelajaran
                  <select value={formData.mapel_id} onChange={(e) => setFormData({ ...formData, mapel_id: e.target.value })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent">
                    <option value="">Pilih Mata Pelajaran</option>
                    {mapel.map((m) => (
                      <option key={m.id} value={m.id}>{m.nama}</option>
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
                <label className="space-y-2 text-xs font-semibold text-slate-700">
                  Status Aktif
                  <select value={formData.is_aktif} onChange={(e) => setFormData({ ...formData, is_aktif: Number(e.target.value) })} className="w-full rounded-2xl border border-wedding-pink/30 px-4 py-3 text-sm outline-none focus:border-accent">
                    <option value={1}>Aktif</option>
                    <option value={0}>Nonaktif</option>
                  </select>
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700 flex items-center gap-3 md:col-span-1">
                  <input
                    type="checkbox"
                    checked={formData.is_admin === 1}
                    onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked ? 1 : 0 })}
                    className="h-4 w-4 rounded border-wedding-pink/30 text-primary focus:ring-accent cursor-pointer"
                  />
                  <span className="mt-0">Bisa Menjadi Wali Kelas/Mentor</span>
                </label>
              </div>

              {error && <p className="text-xs text-rose-600">{error}</p>}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Batal
                </button>
                <button type="submit" disabled={submitLoading} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-70">
                  {submitLoading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Guru"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
