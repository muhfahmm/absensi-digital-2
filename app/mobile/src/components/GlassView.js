import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function GlassView({ style, intensity = 50, children }) {
    return (
        <View style={[styles.container, style]}>
            <BlurView intensity={intensity} style={StyleSheet.absoluteFill} tint="default" />
            <View style={[styles.content]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    content: {
        padding: 20,
    }
});
