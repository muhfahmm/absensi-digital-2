export default function AdminRekapAbsensiPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-3">Rekap Absensi</h1>
        <p className="text-slate-600">Tampilkan laporan kehadiran siswa dan ringkasan absensi harian.</p>
      </section>

      <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <p className="text-slate-600">Belum ada data rekap absensi. Pastikan data absensi sudah masuk.</p>
      </section>
    </div>
  );
}
