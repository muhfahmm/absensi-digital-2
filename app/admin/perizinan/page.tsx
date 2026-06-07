export default function AdminPerizinanPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-3">Perizinan</h1>
        <p className="text-slate-600">Kelola status izin siswa dan catatan persetujuan pada sistem.</p>
      </section>

      <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <p className="text-slate-600">Tidak ada permintaan perizinan saat ini.</p>
      </section>
    </div>
  );
}
