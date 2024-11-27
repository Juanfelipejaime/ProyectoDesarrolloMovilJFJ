import { CameraView } from "expo-camera";
import { router, Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "./overlay";
import { useEffect, useRef } from "react";

export default function Camara() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  //premiso para usar notificaciones
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log("Estado del permiso:", status);
    if (status !== "granted") {
      alert("Permiso de notificaciones denegado.");
      return false;
    }
    return true;
  };
  
  // permiso para la camara
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    requestPermissions();

    return () => {
      subscription.remove();
    };
  }, []);

  //notificacion de inicio de sesion
  const scheduleNotification = async () => {
    try {
      console.log("Programando notificación...");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Ingreso en PC",
          body: "Haz iniciado sesion correctamente",
        },
        trigger: null, //notificacion instantanea
      });
      console.log("Notificacion");
    } catch (error) {
      console.error("Error", error);
    }
  };
  

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
            // Logica al escanear el qr

              const hasPermission = await requestPermissions();
              if (hasPermission) {
                await scheduleNotification(); // la notificacion


                console.log("escaneado") // escaneo el codigo
                router.replace('/(tabs)/Scanner'); // regresar
              }
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
