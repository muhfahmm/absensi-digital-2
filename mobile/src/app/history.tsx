import { View, Text, ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemDate: {
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusBadgeHadir: {
    backgroundColor: '#10B981',
  },
  statusBadgeTerlambat: {
    backgroundColor: '#F59E0B',
  },
  statusBadgeIzin: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    color: '#6B7280',
  },
  itemTime: {
    color: '#6B7280',
    fontSize: 12,
  },
});

export default function HistoryScreen() {
  const attendanceHistory = [
    { date: '2024-06-01', checkIn: '08:00', checkOut: '17:00', status: 'Hadir' },
    { date: '2024-05-31', checkIn: '08:15', checkOut: '17:30', status: 'Hadir' },
    { date: '2024-05-30', checkIn: '08:45', checkOut: '17:00', status: 'Terlambat' },
    { date: '2024-05-29', checkIn: '-', checkOut: '-', status: 'Izin' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Hadir':
        return styles.statusBadgeHadir;
      case 'Terlambat':
        return styles.statusBadgeTerlambat;
      case 'Izin':
        return styles.statusBadgeIzin;
      default:
        return styles.statusBadgeHadir;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Riwayat Absensi</Text>
        <Text style={styles.subtitle}>Lihat riwayat kehadiran Anda</Text>

        <View>
          {attendanceHistory.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemDate}>{item.date}</Text>
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.itemFooter}>
                <Text style={styles.itemTime}>Masuk: {item.checkIn}</Text>
                <Text style={styles.itemTime}>Keluar: {item.checkOut}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
