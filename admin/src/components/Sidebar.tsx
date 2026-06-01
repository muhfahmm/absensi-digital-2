import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const menuItems = [
    { href: '/', label: '📊 Dashboard', icon: '📊' },
    { href: '/employees', label: '👥 Karyawan', icon: '👥' },
    { href: '/attendance', label: '✓ Absensi', icon: '✓' },
    { href: '/reports', label: '📄 Laporan', icon: '📄' },
    { href: '/settings', label: '⚙️ Pengaturan', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-dark text-white h-screen shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Absensi Digital</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button className="w-full px-4 py-2 bg-danger rounded-lg text-white hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
