import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "GameApp",
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerTitle,
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#372C49', // Color de fondo que combina con el degradado
    },
    headerTitle: {
        color: '#FFD700', // Color dorado para el título
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
});
