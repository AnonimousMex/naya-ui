import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import { SnackbarProvider } from "@/context";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "@/config/reactQuery";
import "react-native-reanimated";
import "../global.css";
import { QueryClientProvider } from "@tanstack/react-query";
// 🛑 IMPORTANTE: Importamos Platform para no romper iOS con cosas de Android
import { Platform } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-ExtraLight": require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    "Urbanist-Light": require("../assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    Urbanist: require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // 🛑 AQUÍ ESTÁ LA MAGIA: Forzamos el estilo oscuro CADA VEZ que el layout gana foco
  useFocusEffect(
    useCallback(() => {
      const setupBars = async () => {
        // Tu código de NavigationBar (solo aplica para Android)
        if (Platform.OS === "android") {
          await NavigationBar.setButtonStyleAsync("dark");
          // Forzamos también que la barra de navegación de abajo sea transparente/consistente si lo necesitas
          await NavigationBar.setBackgroundColorAsync("transparent");
        }
      };

      setupBars();

      return () => {};
    }, []),
  );

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        {/* 🛑 Aún necesitamos este componente aquí para el renderizado inicial */}
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent={true}
        />

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(mainPages)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(therapistPages)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(parentsPages)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(memociones)" options={{ headerShown: false }} />
          <Stack.Screen name="(emorganiza)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(y_ese_ruido)/y-ese-ruido-main"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(detectiveEmociones)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(test)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
