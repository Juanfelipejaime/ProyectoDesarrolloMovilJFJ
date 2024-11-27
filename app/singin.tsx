import { Link, router } from "expo-router";
import { Image } from 'expo-image';
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "@/context/authContext/AuthContext";
import { TextInput } from "react-native-paper";
import CustomModal from "@/components/CustomModal";
import { ModalProps } from "@/interfaces/interfaces";

export default function Signin() {

    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);
    const [modal, setModal] = useState({ visible: false } as ModalProps);

    //espera para validar usuario
    const handleLogin = async () => {
        setModal({
            visible: true,
            type: 'loading',
            title: 'Validando usuario',
            textBody: 'Espera un momento...'
        });
        const response = await signIn(email, password);
        if (response) {
            setModal({ visible: false });
            router.replace('/(tabs)/home');
        } else {
            setModal({
                visible: true,
                type: 'error',
                title: 'Hubo un error ingresando',
                textBody: 'Vuelve a intentarlo...'
            });
            console.log("Hubo un error ingresando");
        }
    };

    return (
        <LinearGradient
            colors={['#372C49', '#5E4688']}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: insets.bottom,
                        paddingHorizontal: 30,
                    }}
                >


                    <Text style ={styles.titulo} > Ingresa </Text>

                    <TextInput
                        onChangeText={text => setEmail(text)}
                        value={email}
                        style={styles.input}
                        placeholder="Ingresa tu correo electrónico..."
                        label={"Correo electrónico"}
                    />

                    <TextInput
                        onChangeText={text => setPassword(text)}
                        value={password}
                        style={styles.input}
                        placeholder="Ingresa tu contraseña..."
                        label={"Contraseña"}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <CustomModal {...modal} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        margin: 10,
        backgroundColor: 'white',
        width: "100%",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#9888C1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titulo: {
        padding: 10,
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
});
