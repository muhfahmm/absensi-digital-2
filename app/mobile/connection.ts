import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ConnectionRecord {
  ipAddress: string;
  timestamp: string;
}

export async function recordConnection(): Promise<ConnectionRecord> {
  const ipAddress = await getLocalIpAddress();
  const timestamp = new Date().toISOString();
  const record: ConnectionRecord = { ipAddress, timestamp };

  try {
    await saveConnection(record);
  } catch {
    // Simpan lokal sebagai fallback jika tidak mendukung penyimpanan.
  }

  return record;
}

async function getLocalIpAddress(): Promise<string> {
  try {
    const ipAddress = await Network.getIpAddressAsync();
    return ipAddress ?? "Tidak tersedia";
  } catch {
    return "Gagal memuat IP";
  }
}

async function saveConnection(record: ConnectionRecord): Promise<void> {
  await AsyncStorage.setItem("absensi-connection", JSON.stringify(record));
}
