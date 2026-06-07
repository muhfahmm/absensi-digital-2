export default function AdminKelasPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-3">Data Kelas</h1>
        <p className="text-slate-600">Kelola daftar kelas dan alokasi siswa agar sistem absensi lebih terstruktur.</p>
      </section>

      <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <p className="text-slate-600">Belum ada kelas yang terdaftar. Tambahkan kelas baru melalui panel admin.</p>
      </section>
    </div>
  );
}
