import { Colors } from "@/constants/Colors";
import AuthContextProvider from "@/context/authcontext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <AuthContextProvider>
        <StatusBar style="dark" backgroundColor={Colors.light.background} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTintColor: Colors.light.text,
            headerTitleStyle: {
              fontWeight: "600",
            },
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AuthContextProvider>
    </SafeAreaView>
  );
}
