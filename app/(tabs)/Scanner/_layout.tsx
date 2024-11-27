import { Link, Stack } from "expo-router";
import { Button } from "react-native";

export default function RootLayout() {

  return (
    <Stack
    >
      <Stack.Screen name="index"
        options={{
          title: "GameApp",

        }}
      />
      {}
      
    </Stack>
  );
}