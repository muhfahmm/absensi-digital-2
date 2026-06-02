'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { 
      title: 'DASHBOARD', 
      items: [
        { name: 'Ringkasan Utama', href: '/dashboard', icon: '📊' }
      ]
    },
    {
      title: 'MANAJEMEN ABSENSI',
      items: [
        { name: 'Log Kehadiran', href: '/attendance', icon: '📋' },
        { name: 'Rekapitulasi', href: '/reports', icon: '📈' }
      ]
    },
    {
      title: 'DATA PENGGUNA',
      items: [
        { name: 'Data Siswa', href: '/students', icon: '👨‍🎓' },
        { name: 'Data Guru', href: '/employees', icon: '👨‍🏫' },
        { name: 'Data Kelas', href: '/classes', icon: '🏫' }
      ]
    },
    {
      title: 'JADWAL',
      items: [
        { name: 'Jadwal Pelajaran', href: '/schedule', icon: '📅' },
        { name: 'Jam Pelajaran', href: '/timetable', icon: '⏰' }
      ]
    },
    {
      title: 'KOMUNIKASI',
      items: [
        { name: 'Pengumuman', href: '/announcements', icon: '📢' },
        { name: 'Notifikasi', href: '/notifications', icon: '🔔' }
      ]
    },
    {
      title: 'PENGATURAN',
      items: [
        { name: 'Profil Admin', href: '/profile', icon: '👤' },
        { name: 'Keamanan', href: '/security', icon: '🔒' }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-dark">Absensi Digital</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 mb-2 px-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#C4E2F5] text-primary font-medium'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all">
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
