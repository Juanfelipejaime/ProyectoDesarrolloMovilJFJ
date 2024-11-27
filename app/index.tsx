import { Link } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
    return (

        <LinearGradient
            colors={["#372C49", "#5E4688"]}
            style={styles.container}
        >
            <Text style={styles.titulo}>GameApp</Text>

            <View style={{ height: 30 }} />


            <Link href={"/singup"} asChild>
                <Pressable style={styles.boton}>
                    <Text style={styles.botonTexto}>Registrate</Text>
                </Pressable>
            </Link>

            <View style={{ height: 20 }} />

            <Link href={"/singin"} asChild>
                <Pressable style={styles.boton}>
                    <Text style={styles.botonTexto}>Ingresa</Text>
                </Pressable>
            </Link>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titulo: {
        padding: 10,
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    boton: {
        backgroundColor: "#9888C1",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    botonTexto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
