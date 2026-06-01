import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

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
    marginBottom: 32,
  },
  gap: {
    gap: 16,
  },
  buttonCheckIn: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 32,
    marginBottom: 16,
  },
  buttonCheckOut: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 32,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonSubText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    marginTop: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusLabel: {
    color: '#6B7280',
  },
  statusValue: {
    fontWeight: '600',
    color: '#1F2937',
  },
  statusValueGreen: {
    fontWeight: '600',
    color: '#10B981',
  },
});

export default function AttendanceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Absen Sekarang</Text>
        <Text style={styles.subtitle}>Tap tombol di bawah untuk melakukan absensi</Text>

        {/* Check In Button */}
        <TouchableOpacity style={styles.buttonCheckIn}>
          <Text style={styles.buttonText}>✓ Check In</Text>
          <Text style={styles.buttonSubText}>Tap untuk masuk</Text>
        </TouchableOpacity>

        {/* Check Out Button */}
        <TouchableOpacity style={styles.buttonCheckOut}>
          <Text style={styles.buttonText}>✕ Check Out</Text>
          <Text style={styles.buttonSubText}>Tap untuk keluar</Text>
        </TouchableOpacity>

        {/* Current Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status Hari Ini</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Jam Masuk:</Text>
            <Text style={styles.statusValue}>08:00</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Jam Keluar:</Text>
            <Text style={styles.statusValue}>-</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status:</Text>
            <Text style={styles.statusValueGreen}>Hadir</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
