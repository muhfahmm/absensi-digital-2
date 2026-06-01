import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-light">
      <View className="p-6">
        <Text className="text-4xl font-bold text-dark mb-2">
          Absensi Digital
        </Text>
        <Text className="text-lg text-gray-600 mb-8">
          Aplikasi Mobile - Sistem Absensi
        </Text>

        <View className="gap-4">
          {/* Card Absen */}
          <TouchableOpacity className="bg-white rounded-lg p-6 shadow-md">
            <Link href="/attendance">
              <Text className="text-2xl font-semibold text-primary mb-2">
                ✓ Absen Sekarang
              </Text>
              <Text className="text-gray-600">
                Tap untuk melakukan absensi
              </Text>
            </Link>
          </TouchableOpacity>

          {/* Card Riwayat */}
          <TouchableOpacity className="bg-white rounded-lg p-6 shadow-md">
            <Link href="/history">
              <Text className="text-2xl font-semibold text-secondary mb-2">
                📋 Riwayat Absensi
              </Text>
              <Text className="text-gray-600">
                Lihat riwayat kehadiran Anda
              </Text>
            </Link>
          </TouchableOpacity>

          {/* Card Profil */}
          <TouchableOpacity className="bg-white rounded-lg p-6 shadow-md">
            <Link href="/profile">
              <Text className="text-2xl font-semibold text-warning mb-2">
                👤 Profil
              </Text>
              <Text className="text-gray-600">
                Kelola data profil Anda
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
