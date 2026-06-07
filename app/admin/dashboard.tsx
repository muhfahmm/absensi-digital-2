export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_24px_80px_rgba(30,58,95,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Ringkasan Sistem</p>
            <h1 className="text-4xl font-semibold text-slate-950">Dashboard Admin</h1>
          </div>
          <div className="rounded-3xl bg-[#1e3a5f] px-6 py-4 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Status</p>
            <p className="mt-2 text-2xl font-semibold">Aktif</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Guru</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">10</p>
          <p className="mt-2 text-sm text-slate-600">Guru terdaftar</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Siswa</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">120</p>
          <p className="mt-2 text-sm text-slate-600">Siswa terdaftar</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Perizinan</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">3</p>
          <p className="mt-2 text-sm text-slate-600">Menunggu persetujuan</p>
        </div>
      </div>
    </div>
  );
}
