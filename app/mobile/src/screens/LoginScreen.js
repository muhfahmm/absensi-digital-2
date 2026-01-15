import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import GlassView from '../components/GlassView';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Dummy Logic
        if (username === 'admin') navigation.replace('AdminHome');
        else navigation.replace('UserHome');
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <GlassView style={styles.loginCard}>
                    <Text style={styles.title}>Absensi Digital</Text>
                    <Text style={styles.subtitle}>Sign In to continue</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </GlassView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
    loginCard: { width: '100%' },
    title: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#e0e0e0', textAlign: 'center', marginBottom: 30 },
    inputContainer: { marginBottom: 15 },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 15,
        color: 'white',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)'
    },
    button: {
        backgroundColor: '#4F46E5', // Indigo
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
