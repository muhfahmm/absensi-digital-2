import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { recordConnection, ConnectionRecord } from "./connection";

const menuItems = [
  { title: "Absensi", subtitle: "Masuk, pulang, dan cek kehadiran", key: "absensi" },
  { title: "Rekap", subtitle: "Ringkasan hadir harian dan bulanan", key: "rekap" },
  { title: "Jadwal", subtitle: "Lihat jadwal pelajaran", key: "jadwal" },
  { title: "Siswa", subtitle: "Kelola data siswa dan kelas", key: "siswa" },
  { title: "Guru", subtitle: "Data guru dan wali kelas", key: "guru" },
  { title: "Pengaturan", subtitle: "Konfigurasi aplikasi dan profil", key: "pengaturan" },
];

export default function App() {
  const [connection, setConnection] = useState<ConnectionRecord | null>(null);
  const [status, setStatus] = useState("Memuat alamat IP...");

  useEffect(() => {
    refreshConnection();
  }, []);

  async function refreshConnection() {
    setStatus("Mencari alamat IP lokal...");
    try {
      const record = await recordConnection();
      setConnection(record);
      setStatus("Terhubung");
    } catch (error) {
      setStatus(`Gagal: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Absensi Digital</Text>
        <Text style={styles.subtitle}>Aplikasi mobile preview untuk Expo.</Text>
      </View>

      <View style={styles.connectionBar}>
        <View>
          <Text style={styles.connectionLabel}>IP Lokal</Text>
          <Text style={styles.connectionValue}>{connection?.ipAddress ?? "-"}</Text>
        </View>
        <TouchableOpacity onPress={refreshConnection} style={styles.reloadButton}>
          <Text style={styles.reloadText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusText}>{status}</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.key} style={styles.card} onPress={() => setStatus(`${item.title} dipilih`)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  connectionBar: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  connectionLabel: {
    color: "#475569",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  connectionValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  reloadButton: {
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  reloadText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  statusText: {
    marginHorizontal: 20,
    marginTop: 10,
    color: "#475569",
    fontSize: 13,
  },
  grid: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  cardSubtitle: {
    marginTop: 8,
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
});
