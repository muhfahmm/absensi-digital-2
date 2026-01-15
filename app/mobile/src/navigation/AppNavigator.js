import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { GlassTheme } from '../constants/theme';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User Home Screen</Text>
        </View>
    )
}

function AdminHomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Admin Dashboard Mobile</Text>
        </View>
    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer theme={GlassTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="UserHome" component={HomeScreen} />
                <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
