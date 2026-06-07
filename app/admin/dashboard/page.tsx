"use client";

import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  FileClock,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Calendar,
  CloudSun,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard:", err);
        setLoading(false);
      });
  }, []);

  const stats = [
    {
      title: "Hadir Hari Ini",
      count: loading ? "..." : `${data?.stats?.siswa?.hadir || 0} / ${data?.stats?.siswa?.total || 0}`,
      percentage: loading ? "..." : data?.stats?.siswa?.total ? `${Math.round(((data?.stats?.siswa?.hadir || 0) / data?.stats?.siswa?.total) * 100)}%` : "0%",
      color: "bg-wedding-sage/15 text-wedding-sage border-wedding-sage/30",
      icon: UserCheck,
      desc: "Siswa telah melakukan check-in",
    },
    {
      title: "Izin & Sakit",
      count: loading ? "..." : `${data?.stats?.siswa?.izinSakit || 0} Siswa`,
      percentage: loading ? "..." : data?.stats?.siswa?.total ? `${Math.round(((data?.stats?.siswa?.izinSakit || 0) / data?.stats?.siswa?.total) * 100)}%` : "0%",
      color: "bg-amber-100 text-amber-600 border-amber-200",
      icon: FileClock,
      desc: "Siswa izin atau sakit",
    },
    {
      title: "Tanpa Keterangan",
      count: loading ? "..." : `${data?.stats?.siswa?.alpha || 0} Siswa`,
      percentage: loading ? "..." : data?.stats?.siswa?.total ? `${Math.round(((data?.stats?.siswa?.alpha || 0) / data?.stats?.siswa?.total) * 100)}%` : "0%",
      color: "bg-rose-100 text-rose-600 border-rose-200",
      icon: UserX,
      desc: "Belum melakukan absensi pagi",
    },
    {
      title: "Kehadiran Guru",
      count: loading ? "..." : `${data?.stats?.guru?.hadir || 0} / ${data?.stats?.guru?.total || 0}`,
      percentage: loading ? "..." : data?.stats?.guru?.total ? `${Math.round(((data?.stats?.guru?.hadir || 0) / data?.stats?.guru?.total) * 100)}%` : "0%",
      color: "bg-wedding-pink/20 text-wedding-pink-dark border-wedding-pink/40",
      icon: Users,
      desc: "Kehadiran staff pengajar",
    },
  ];

  const pendingApprovals = data?.pendingApprovals || [];
  const unexcusedAbsences = data?.unexcusedAbsences || [];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease]">
      {/* Welcome banner & Weather Widget */}
      <section className="relative overflow-hidden rounded-[32px] border border-wedding-pink/30 bg-gradient-to-r from-primary to-primary-soft p-8 text-white shadow-lg">
        {/* Subtle decorative vector background */}
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none w-1/3">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="#c9a84c" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-soft backdrop-blur-sm">
              <Calendar size={12} />
              <span>Minggu, 07 Juni 2026</span>
            </div>
            <h1 className="font-serif text-3xl font-bold md:text-4xl text-white">
              Selamat Datang, Admin Utama
            </h1>
            <p className="max-w-xl text-sm text-white/80 font-medium">
              Sistem Absensi Digital berjalan lancar. Semua data kehadiran terintegrasi secara real-time dengan database sekolah.
            </p>
          </div>

          {/* Quick Weather / Time Widget */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
            <div className="rounded-xl bg-accent/25 p-2 text-accent">
              <CloudSun size={24} />
            </div>
            <div>
              <p className="text-xs text-white/75 font-semibold">Sekolah Center</p>
              <p className="text-lg font-bold leading-none">29°C</p>
              <p className="text-[10px] text-accent-soft mt-1">Cerah Berawan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group rounded-2xl border border-wedding-pink/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">{stat.title}</span>
                <div className={`rounded-xl border p-2.5 ${stat.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary tracking-tight">{stat.count}</span>
                <span className="text-xs font-semibold text-wedding-sage flex items-center gap-0.5">
                  <TrendingUp size={12} /> {stat.percentage}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted font-medium">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Attendance Bar Chart (Custom SVG Design) */}
        <div className="lg:col-span-2 rounded-2xl border border-wedding-pink/20 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-primary">Tren Kehadiran 7 Hari Terakhir</h3>
              <p className="text-xs text-muted">Statistik rata-rata kehadiran harian siswa</p>
            </div>
            <span className="rounded-full bg-wedding-pink/15 px-3 py-1 text-xs font-semibold text-wedding-pink-dark border border-wedding-pink/30">
              Rata-rata: 96.2%
            </span>
          </div>

          {/* Simple Inline SVG Bar Chart */}
          <div className="h-64 w-full flex items-end justify-between pt-4 px-2">
            {[
              { day: "Senin", val: 95, label: "95%" },
              { day: "Selasa", val: 97, label: "97%" },
              { day: "Rabu", val: 94, label: "94%" },
              { day: "Kamis", val: 98, label: "98%" },
              { day: "Jumat", val: 96, label: "96%" },
              { day: "Sabtu", val: 90, label: "90%" },
              { day: "Minggu", val: 0, label: "Libur" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg h-48 flex items-end relative overflow-hidden">
                  <div
                    style={{ height: `${item.val}%` }}
                    className="w-full bg-gradient-to-t from-primary to-primary-soft rounded-t-lg group-hover:from-accent group-hover:to-accent-dark transition-all duration-300"
                  />
                  {item.val > 0 && (
                    <div className="absolute top-1 left-0 right-0 text-[10px] text-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-muted mt-2 tracking-wide uppercase">{item.day.substring(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance by Class Donut Chart */}
        <div className="rounded-2xl border border-wedding-pink/20 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary">Kehadiran per Jenjang</h3>
            <p className="text-xs text-muted">Presentase kehadiran hari ini</p>
          </div>

          <div className="my-6 flex justify-center">
            {/* Elegant SVG Donut Chart */}
            <div className="relative h-36 w-36">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#1e3a5f"
                  strokeWidth="3.5"
                  strokeDasharray="60 100"
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="3.5"
                  strokeDasharray="25 100"
                  strokeDashoffset="-60"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#f9a8d4"
                  strokeWidth="3.5"
                  strokeDasharray="15 100"
                  strokeDashoffset="-85"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-primary">95.8%</span>
                <span className="text-[9px] font-semibold text-muted uppercase tracking-wider">Kehadiran</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Kelas X (98%)", color: "bg-[#1e3a5f]" },
              { label: "Kelas XI (94%)", color: "bg-[#c9a84c]" },
              { label: "Kelas XII (96%)", color: "bg-[#f9a8d4]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-muted">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Approvals Widget */}
        <div className="rounded-2xl border border-wedding-pink/20 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-primary">Persetujuan Izin Pending</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              {pendingApprovals.length} Menunggu
            </span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-4 text-slate-500 text-xs">Belum ada izin pending.</div>
            ) : pendingApprovals.map((izin: any) => (
              <div
                key={izin.id}
                className="rounded-xl border border-wedding-pink/10 bg-wedding-bg/30 p-4 hover:border-wedding-pink/40 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-primary leading-tight">{izin.nama}</h4>
                    <span className="text-xs text-muted font-medium">{izin.role_detail}</span>
                  </div>
                  <span className="inline-flex rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-dark">
                    {izin.jenis_izin}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">"{izin.alasan}"</p>
                <div className="mt-3 flex items-center justify-between border-t border-wedding-pink/20 pt-3">
                  <span className="text-[10px] font-bold text-muted uppercase">{new Date(izin.created_at).toLocaleDateString()}</span>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-primary hover:text-accent transition-colors">
                    <span>Proses Izin</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Absentee Alerts / Unexcused absences list */}
        <div className="rounded-2xl border border-wedding-pink/20 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-primary">Siswa Belum Absen</h3>
            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800">
              {unexcusedAbsences.length} Siswa
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-muted uppercase tracking-wider">
                  <th className="pb-3">Siswa</th>
                  <th className="pb-3">Kelas</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unexcusedAbsences.length === 0 ? (
                  <tr><td colSpan={4} className="py-4 text-center text-slate-500">Semua siswa sudah absen.</td></tr>
                ) : unexcusedAbsences.map((siswa: any, idx: number) => (
                  <tr key={idx} className="text-xs group hover:bg-slate-50/50">
                    <td className="py-3">
                      <p className="font-bold text-primary leading-tight">{siswa.nama}</p>
                      <p className="text-[10px] text-muted font-mono mt-0.5">{siswa.nis}</p>
                    </td>
                    <td className="py-3 font-semibold text-slate-600">{siswa.kelas}</td>
                    <td className="py-3">
                      <span className="inline-flex rounded-full bg-rose-50 border border-rose-100 px-2 py-0.5 font-bold text-rose-600">
                        Belum Absen
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={`tel:${siswa.telp}`}
                        className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        Hubungi Ortu
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
