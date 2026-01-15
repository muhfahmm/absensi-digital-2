import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const GlassTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4F46E5',
        background: '#F3F4F6',
        card: 'rgba(255, 255, 255, 0.8)',
        text: '#1F2937',
        border: 'rgba(255, 255, 255, 0.5)',
        notification: '#FF3B30',
    },
};

export const GlassDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#6366F1',
        background: '#0F172A',
        card: 'rgba(30, 41, 59, 0.7)',
        text: '#F3F4F6',
        border: 'rgba(255, 255, 255, 0.1)',
        notification: '#FF453A',
    },
};
