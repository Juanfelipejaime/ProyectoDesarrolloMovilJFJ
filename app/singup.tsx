import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { Link } from 'expo-router';
import { AuthContext } from '@/context/authContext/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup() {
    const { signUp } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    return (
        <LinearGradient
            colors={['#372C49', '#5E4688']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Regístrate</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Ingresa tu correo"
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    placeholder="Ingresa tu nombre de usuario"
                    placeholderTextColor="#ccc"
                />

                <Link href="/singin" asChild>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => signUp(email, password, username)}
                    >
                        <Text style={styles.buttonText}>Regístrate</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        color: '#000',
    },
    button: {
        backgroundColor: '#9888C1',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
