export default function AdminGuruPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-3">Data Guru</h1>
        <p className="text-slate-600">Kelola profil guru, informasi pelajaran, dan status aktif mereka.</p>
      </section>

      <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <p className="text-slate-600">Belum ada data guru yang ditambahkan. Gunakan API atau form admin untuk menambah data.</p>
      </section>
    </div>
  );
}
