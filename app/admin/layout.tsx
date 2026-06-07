"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, School, BookOpen, Calendar, Users, UserCog, ClipboardCheck, FileText, BarChart3, Bell, Settings, ChevronDown, ChevronUp, Menu, X, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [masterExpanded, setMasterExpanded] = useState(true);
  const [cmsExpanded, setCmsExpanded] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/auth/login') {
      setLoading(false);
      return;
    }
    
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push('/admin/auth/login');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pathname, router]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/admin/auth/login');
  };

  if (pathname === '/admin/auth/login') {
    return <div className="font-sans min-h-screen bg-[#FFFFF0]">{children}</div>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-sans bg-[#fffafa]">Memuat...</div>;
  }

  const isGuru = user?.role === 'guru';

  let menuGroups = [
    {
      title: "Utama",
      items: [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "Data Master",
      expanded: masterExpanded,
      setExpanded: setMasterExpanded,
      items: [
          { href: "/admin/kelas", label: "Data Kelas", icon: School },
          { href: "/admin/mapel", label: "Mata Pelajaran", icon: BookOpen },
          { href: "/admin/jadwal", label: "Jadwal Pelajaran", icon: Calendar },
        ],
    },
    {
      title: "Manajemen Pengguna",
      items: [
        { href: "/admin/siswa", label: "Data Siswa", icon: Users },
        { href: "/admin/guru", label: "Data Guru", icon: UserCog },
      ],
    },
    {
      title: "Kehadiran & Laporan",
      items: [
        { href: "/admin/absensi", label: "Absensi", icon: ClipboardCheck },
        { href: "/admin/perizinan", label: "Manajemen Izin", icon: FileText },
        { href: "/admin/laporan", label: "Laporan & Rekap", icon: BarChart3 },
      ],
    },
    {
      title: "CMS Konten Website",
      expanded: cmsExpanded,
      setExpanded: setCmsExpanded,
      items: [
          { href: "/admin/pengumuman", label: "Pengumuman", icon: Bell },
        ],
    },
    {
      title: "Sistem",
      items: [
          { href: "/admin/pengaturan", label: "Pengaturan Sistem", icon: Settings },
        ],
    },
  ];

  if (isGuru) {
    menuGroups = [
      {
        title: "Utama",
        items: [
          { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ],
      },
      {
        title: "Kehadiran & Laporan",
        items: [
          { href: "/admin/laporan", label: "Laporan & Rekap", icon: BarChart3 },
        ],
      }
    ];
  }

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex min-h-screen bg-[#fffafa] font-sans selection:bg-[#f9a8d4]/30">
      {/* Mobile Topbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-[#f9a8d4]/30 bg-[#1e3a5f] px-6 text-white lg:hidden">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#c9a84c] flex items-center justify-center font-serif text-lg font-bold text-[#1e3a5f]">
            A
          </div>
          <span className="font-serif text-lg font-semibold tracking-wide">Absensi Digital</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#1e3a5f]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-45 w-[265px] border-r border-[#f9a8d4]/30 bg-[#1e3a5f] flex flex-col transition-all duration-300 ease-in-out lg:z-10 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="h-10 w-10 rounded-xl bg-[#c9a84c] flex items-center justify-center font-serif text-xl font-bold text-[#1e3a5f] shadow-md">
            AD
          </div>
          <div>
            <h1 className="font-serif text-base font-bold text-white tracking-wide leading-none">Absensi Digital</h1>
            <span className="text-xs font-medium text-[#c9a84c]">Panel {isGuru ? 'Guru' : 'Administrator'}</span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10">
          <div className="space-y-6">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {/* Group Title */}
                <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
                  <span>{group.title}</span>
                  {group.setExpanded && (
                    <button
                      onClick={() => group.setExpanded?.(!group.expanded)}
                      className="rounded p-0.5 hover:bg-white/10"
                    >
                      {group.expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  )}
                </div>

                {/* Group Items */}
                {(!group.setExpanded || group.expanded) && (
                  <ul className="space-y-0.5">
                    {group.items.map((item, iIdx) => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <li key={iIdx}>
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                              active
                                ? "bg-[#c9a84c]/25 text-white border-l-4 border-[#c9a84c] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                : "text-white/75 hover:bg-white/8 hover:text-white"
                            }`}
                          >
                            <Icon size={16} className={active ? "text-[#c9a84c]" : "text-white/60"} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-[#c9a84c]/25 border border-[#c9a84c] flex items-center justify-center font-bold text-[#c9a84c] text-xs uppercase">
                {user?.nama?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-white leading-tight">{user?.nama || 'User'}</p>
                <p className="truncate text-[10px] text-white/50 leading-none">{user?.role || 'Role'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-rose-400"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col lg:pl-[265px]">
        {/* Desktop Navbar / Topbar */}
        <header className="sticky top-0 z-35 hidden h-20 items-center justify-between border-b border-[#f9a8d4]/30 bg-white/70 backdrop-blur-md px-8 lg:flex">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5c6f84]">Selamat datang kembali</span>
            <span className="inline-flex h-2 w-2 rounded-full bg-[#9dc183] animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-[#1e3a5f]">{user?.nama || 'User'}</p>
              <p className="text-xs text-[#5c6f84] uppercase tracking-wider">{user?.role || 'Role'}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#f9a8d4]/30 border border-[#f9a8d4] flex items-center justify-center font-bold text-[#1e3a5f] shadow-sm uppercase">
              {user?.nama?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 pt-24 lg:p-8 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}