import { View, Text, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Link, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Scaner() {
    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);

    return (
        <LinearGradient colors={['#372C49', '#5E4688']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <Stack.Screen options={{ title: 'Overview', headerShown: false }} />
                <Text style={styles.title}>Iniciar sesion en PC</Text>

                <View style={styles.buttonsContainer}>
                    <Link href={'/(tabs)/Scanner/camara/camara'} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Scan Code</Text>
                        </Pressable>
                    </Link>
                    <Pressable onPress={requestPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Request Permissions</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 80,
    },
    title: {
        color: '#FFD700',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    buttonsContainer: {
        width: '80%',
        gap: 20,
    },
    button: {
        backgroundColor: '#9888C1',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#9888C1',
        opacity: 0.5,
    },
});