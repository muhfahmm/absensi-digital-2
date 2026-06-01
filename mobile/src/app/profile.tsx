import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-light">
      <View className="p-6">
        <Text className="text-3xl font-bold text-dark mb-8">
          Profil Saya
        </Text>

        {/* Profile Card */}
        <View className="bg-white rounded-lg p-6 shadow-md mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">👤</Text>
            </View>
            <Text className="text-2xl font-bold text-dark">John Doe</Text>
            <Text className="text-gray-600">john@example.com</Text>
          </View>

          <View className="space-y-4">
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-600 text-sm">ID Karyawan</Text>
              <Text className="text-dark font-semibold">E001</Text>
            </View>
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-600 text-sm">Departemen</Text>
              <Text className="text-dark font-semibold">IT</Text>
            </View>
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-600 text-sm">Posisi</Text>
              <Text className="text-dark font-semibold">Software Engineer</Text>
            </View>
            <View>
              <Text className="text-gray-600 text-sm">Tanggal Bergabung</Text>
              <Text className="text-dark font-semibold">01 Januari 2023</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity className="bg-primary rounded-lg p-4 mb-3">
          <Text className="text-white text-center font-semibold">
            Edit Profil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-warning rounded-lg p-4 mb-3">
          <Text className="text-white text-center font-semibold">
            Ubah Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-danger rounded-lg p-4">
          <Text className="text-white text-center font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
