'use client';

import Card from '@/components/Card';

export default function DashboardPage() {
  const stats = [
    { 
      title: 'Total Siswa', 
      value: '850', 
      icon: '👨‍🎓', 
      color: 'bg-blue-50 text-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Hadir Hari Ini', 
      value: '784', 
      icon: '✅', 
      color: 'bg-green-50 text-green-600',
      change: '+5.2%',
      changeType: 'positive'
    },
    { 
      title: 'Terlambat', 
      value: '23', 
      icon: '⏰', 
      color: 'bg-yellow-50 text-yellow-600',
      change: '-2.1%',
      changeType: 'negative'
    },
    { 
      title: 'Izin/Sakit', 
      value: '43', 
      icon: '📋', 
      color: 'bg-red-50 text-red-600',
      change: '+1.5%',
      changeType: 'positive'
    },
  ];

  const recentActivity = [
    { name: 'Ahmad Fadli', status: 'Hadir', time: '07:15 AM', class: 'XII IPA 1' },
    { name: 'Siti Nurhaliza', status: 'Hadir', time: '07:22 AM', class: 'XI IPS 2' },
    { name: 'Budi Santoso', status: 'Terlambat', time: '08:05 AM', class: 'X IPA 3' },
    { name: 'Dewi Lestari', status: 'Izin', time: '-', class: 'XII IPS 1' },
    { name: 'Eko Prasetyo', status: 'Hadir', time: '07:18 AM', class: 'XI IPA 2' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Good Morning, Admin! 👋</h1>
        <p className="text-slate-600">Here's what's happening with your school today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-success' : 'text-danger'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-dark mb-1">Trend Kehadiran Minggu Ini</h2>
            <p className="text-slate-600 text-sm">Overview absensi 7 hari terakhir</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-primary bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              7 Hari
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              30 Hari
            </button>
          </div>
        </div>
        
        {/* Simple Bar Chart Visualization */}
        <div className="h-64 flex items-end justify-between gap-4">
          {[75, 82, 78, 85, 92, 88, 90].map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '200px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-secondary to-blue-400 rounded-t-lg transition-all duration-500"
                  style={{ height: `${value}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-dark mb-1">Absensi Terbaru</h2>
            <p className="text-slate-600 text-sm">Aktivitas absensi hari ini</p>
          </div>
          <button className="text-sm font-semibold text-primary hover:text-secondary transition">
            Lihat Semua →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {activity.name.charAt(0)}
                      </div>
                      <span className="font-medium text-dark">{activity.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{activity.class}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'Hadir' 
                        ? 'bg-green-100 text-success'
                        : activity.status === 'Terlambat'
                        ? 'bg-yellow-100 text-warning'
                        : 'bg-blue-100 text-info'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
