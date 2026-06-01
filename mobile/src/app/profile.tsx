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
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3B82F6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileField: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 16,
    marginBottom: 16,
  },
  profileFieldLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3B82F6',
  },
  buttonWarning: {
    backgroundColor: '#F59E0B',
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profil Saya</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@example.com</Text>
          </View>

          <View>
            <View style={styles.profileField}>
              <Text style={styles.fieldLabel}>ID Karyawan</Text>
              <Text style={styles.fieldValue}>E001</Text>
            </View>
            <View style={styles.profileField}>
              <Text style={styles.fieldLabel}>Departemen</Text>
              <Text style={styles.fieldValue}>IT</Text>
            </View>
            <View style={styles.profileField}>
              <Text style={styles.fieldLabel}>Posisi</Text>
              <Text style={styles.fieldValue}>Software Engineer</Text>
            </View>
            <View style={[styles.profileField, styles.profileFieldLast]}>
              <Text style={styles.fieldLabel}>Tanggal Bergabung</Text>
              <Text style={styles.fieldValue}>01 Januari 2023</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Edit Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonWarning]}>
            <Text style={styles.buttonText}>Ubah Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonDanger]}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
