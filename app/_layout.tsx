import { AuthProvider } from "@/context/authContext/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {

  // auth provider es provedor va antes y despues de todo osea todo dentro de el
  return (
    
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="singin" options={{ title: 'Registrate' }} />
        <Stack.Screen name="singup" options={{ title: 'Ingresa' }} />
        {/* Cuando el usuario se loggea */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>

  );
}