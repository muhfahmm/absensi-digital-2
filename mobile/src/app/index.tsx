import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

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
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
  },
  cardSecondary: {
    backgroundColor: '#10B981',
  },
  cardWarning: {
    backgroundColor: '#F59E0B',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardTitleWhite: {
    color: 'white',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardSubtitleWhite: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Absensi Digital</Text>
        <Text style={styles.subtitle}>Aplikasi Mobile - Sistem Absensi</Text>

        <View style={styles.cardContainer}>
          {/* Card Absen */}
          <TouchableOpacity style={styles.card}>
            <Link href="/attendance">
              <Text style={styles.cardTitle}>✓ Absen Sekarang</Text>
              <Text style={styles.cardSubtitle}>Tap untuk melakukan absensi</Text>
            </Link>
          </TouchableOpacity>

          {/* Card Riwayat */}
          <TouchableOpacity style={[styles.card, styles.cardSecondary]}>
            <Link href="/history">
              <Text style={[styles.cardTitle, styles.cardTitleWhite]}>📋 Riwayat Absensi</Text>
              <Text style={[styles.cardSubtitle, styles.cardSubtitleWhite]}>Lihat riwayat kehadiran Anda</Text>
            </Link>
          </TouchableOpacity>

          {/* Card Profil */}
          <TouchableOpacity style={[styles.card, styles.cardWarning]}>
            <Link href="/profile">
              <Text style={[styles.cardTitle, styles.cardTitleWhite]}>👤 Profil</Text>
              <Text style={[styles.cardSubtitle, styles.cardSubtitleWhite]}>Kelola data profil Anda</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
