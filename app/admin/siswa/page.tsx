export default function AdminSiswaPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-3">Data Siswa</h1>
        <p className="text-slate-600">Lihat dan kelola daftar siswa, kelas, dan absensi harian.</p>
      </section>

      <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <p className="text-slate-600">Data siswa belum tersedia. Segera isi data siswa untuk melanjutkan.</p>
      </section>
    </div>
  );
}
