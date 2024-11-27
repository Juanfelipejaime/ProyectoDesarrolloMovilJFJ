import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DataProvider } from '@/context/dataContext/DataContext';

export default function _layout() {
    return (
        <DataProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#FFD700", // Dorado para íconos activos
                    tabBarInactiveTintColor: "#9888C1", // Púrpura suave para íconos inactivos
                    tabBarStyle: {
                        backgroundColor: "#372C49", // Fondo de la barra inferior
                        borderTopWidth: 0, // Eliminar borde superior
                        height: 60, // Ajustar altura
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "bold",
                    },
                    headerShown: false, // Ocultar encabezado en todas las pantallas
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Inicio",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Scanner"
                    options={{
                        title: "Escáner",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="camera" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="comments" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Perfil",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="user" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </DataProvider>
    );
}
